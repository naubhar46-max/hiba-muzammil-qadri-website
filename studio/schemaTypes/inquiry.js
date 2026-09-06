import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'inquiry',
  title: 'Contact Inquiry',
  type: 'document',
  // Inquiries are created by the website's contact form (via a server-side
  // endpoint using a write token), not manually in the Studio — but
  // management can open, read and update the status of any inquiry here.
  fields: [
    defineField({
      name: 'category',
      title: 'Inquiry Category',
      type: 'string',
      readOnly: true,
      options: {
        list: [
          {title: 'Nasheed Performance & Event Booking', value: 'booking'},
          {title: 'Islamic Music & Nasheed Collaboration', value: 'collaboration'},
          {title: 'PR, Media & Artist Promotion', value: 'pr'},
          {title: 'Press, Interview & Media Request', value: 'press'},
          {title: 'Video & Creative Collaboration', value: 'video'},
          {title: 'Private Contact & One-to-One Request', value: 'private'},
          {title: 'Music Licensing & Usage', value: 'licensing'},
          {title: 'General Inquiry', value: 'general'},
        ],
      },
    }),
    defineField({name: 'fullName', title: 'Name', type: 'string', readOnly: true}),
    defineField({name: 'email', title: 'Email', type: 'string', readOnly: true}),
    defineField({name: 'whatsapp', title: 'WhatsApp / Phone', type: 'string', readOnly: true}),
    defineField({name: 'country', title: 'Country', type: 'string', readOnly: true}),
    defineField({name: 'city', title: 'City', type: 'string', readOnly: true}),
    defineField({
      name: 'requestedDate',
      title: 'Requested Date',
      type: 'date',
      readOnly: true,
      description: 'Event date, meeting date, or similar — if the inquiry included one.',
    }),
    defineField({
      name: 'details',
      title: 'Full Submission Details',
      type: 'text',
      readOnly: true,
      description: 'Every field the sender filled in, exactly as submitted.',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      initialValue: 'New',
      options: {
        list: ['New', 'Under Review', 'Contacted', 'Approved', 'Declined', 'Completed'],
      },
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submission Date',
      type: 'datetime',
      readOnly: true,
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'submittedDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
  ],
  preview: {
    select: {title: 'fullName', subtitle: 'category', status: 'status'},
    prepare({title, subtitle, status}) {
      return {title: title || '(no name)', subtitle: `${subtitle || ''} · ${status || 'New'}`}
    },
  },
})
