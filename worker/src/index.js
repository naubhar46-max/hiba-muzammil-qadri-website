// Cloudflare Worker: receives Contact form submissions from the website and
// writes them into Sanity as `inquiry` documents, using a secret write
// token that lives ONLY in this Worker's environment (never in the
// frontend, never committed to git).
//
// Flow: Contact Form (index.html) --fetch(POST)--> this Worker --HTTP--> Sanity

const VALID_CATEGORIES = [
  'booking', 'collaboration', 'pr', 'press', 'video', 'private', 'licensing', 'general',
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function corsHeaders(origin, allowedOrigins) {
  const allowOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0]
  return {
    'Access-Control-Allow-Origin': allowOrigin,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Vary': 'Origin',
  }
}

function json(data, status, extraHeaders) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', ...extraHeaders },
  })
}

// Very small fixed-window rate limiter backed by Workers KV.
// Limits each IP to RATE_LIMIT submissions per RATE_WINDOW_SECONDS.
async function isRateLimited(env, ip) {
  const RATE_LIMIT = 5
  const RATE_WINDOW_SECONDS = 60 * 60 // 1 hour
  const key = `rl:${ip}`
  const current = await env.RATE_LIMIT_KV.get(key)
  const count = current ? parseInt(current, 10) : 0
  if (count >= RATE_LIMIT) return true
  await env.RATE_LIMIT_KV.put(key, String(count + 1), { expirationTtl: RATE_WINDOW_SECONDS })
  return false
}

function formatDetails(fields) {
  return Object.entries(fields)
    .filter(([key, value]) => key !== '_hp' && value !== undefined && value !== null && String(value).trim() !== '')
    .map(([key, value]) => `${key}: ${value}`)
    .join('\n')
}

async function createInquiryInSanity(env, payload) {
  const doc = {
    _type: 'inquiry',
    category: payload.category,
    fullName: payload.fullName || '',
    email: payload.email || '',
    whatsapp: payload.whatsapp || '',
    country: payload.country || '',
    city: payload.city || '',
    requestedDate: payload.eventDate || payload.preferredDate || payload.meetingDate || payload.publishDate || undefined,
    details: formatDetails(payload),
    status: 'New',
    submittedAt: new Date().toISOString(),
  }

  const url = `https://${env.SANITY_PROJECT_ID}.api.sanity.io/v2025-08-15/data/mutate/${env.SANITY_DATASET}`
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${env.SANITY_WRITE_TOKEN}`,
    },
    body: JSON.stringify({ mutations: [{ create: doc }] }),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => '')
    throw new Error(`Sanity write failed (${res.status}): ${text.slice(0, 300)}`)
  }
}

export default {
  async fetch(request, env) {
    const allowedOrigins = (env.ALLOWED_ORIGINS || '').split(',').map((s) => s.trim()).filter(Boolean)
    const origin = request.headers.get('Origin') || ''
    const headers = corsHeaders(origin, allowedOrigins)

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers })
    }

    if (request.method !== 'POST') {
      return json({ ok: false, error: 'Method not allowed' }, 405, headers)
    }

    if (!allowedOrigins.includes(origin)) {
      return json({ ok: false, error: 'Origin not allowed' }, 403, headers)
    }

    let payload
    try {
      payload = await request.json()
    } catch {
      return json({ ok: false, error: 'Invalid JSON body' }, 400, headers)
    }

    // Honeypot: real users never fill this hidden field.
    if (payload._hp) {
      // Pretend success so bots don't learn anything, but do not write to Sanity.
      return json({ ok: true }, 200, headers)
    }

    if (!VALID_CATEGORIES.includes(payload.category)) {
      return json({ ok: false, error: 'Invalid category' }, 400, headers)
    }
    if (!payload.fullName || !String(payload.fullName).trim()) {
      return json({ ok: false, error: 'Full name is required' }, 400, headers)
    }
    if (payload.email && !EMAIL_RE.test(payload.email)) {
      return json({ ok: false, error: 'Invalid email address' }, 400, headers)
    }

    const ip = request.headers.get('CF-Connecting-IP') || 'unknown'
    if (env.RATE_LIMIT_KV) {
      const limited = await isRateLimited(env, ip)
      if (limited) {
        return json({ ok: false, error: 'Too many submissions. Please try again later.' }, 429, headers)
      }
    }

    try {
      await createInquiryInSanity(env, payload)
      return json({ ok: true }, 200, headers)
    } catch (err) {
      console.error(err)
      return json({ ok: false, error: 'Could not process inquiry. Please try again later.' }, 502, headers)
    }
  },
}
