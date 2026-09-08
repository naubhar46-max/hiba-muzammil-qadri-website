import {defineField, defineType} from 'sanity'

function isYouTubeUrl(url) {
  if (!url) return true
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)
}

export default defineType({
  name: 'musicItem',
  title: 'Song / Naat / Nasheed',
  type: 'document',
  fieldsets: [
    {
      name: 'advanced',
      title: 'Advanced (usually not needed)',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The name of the song — e.g. "Piyari Maa".',
      validation: (Rule) => Rule.required().error('Please give this song a title.'),
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'string',
      description: 'Which shelf should this appear on?',
      options: {
        list: [
          {title: 'Naat', value: 'naat'},
          {title: 'Kalam', value: 'kalam'},
          {title: 'Hamd', value: 'hamd'},
          {title: 'Patriotic', value: 'patriotic'},
          {title: 'Special', value: 'special'},
          {title: 'Kids', value: 'kids'},
          {title: 'Collaboration', value: 'collaboration'},
          {title: 'Songs from the Heart', value: 'heart'},
        ],
      },
      validation: (Rule) => Rule.required().error('Please pick a category.'),
    }),
    defineField({
      name: 'artwork',
      title: 'Cover Picture',
      type: 'image',
      description: 'Best size: a tall/portrait photo, at least 900×1125 pixels.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Link',
      type: 'url',
      description: 'Paste the full link to the song’s YouTube video.',
      validation: (Rule) =>
        Rule.custom((value) =>
          isYouTubeUrl(value) ? true : 'This does not look like a YouTube link. Please paste the full YouTube video URL.',
        ),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'reference',
      to: [{type: 'language'}],
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      description: 'A sentence or two about this song — shown to visitors.',
    }),
    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
      description: 'Optional — paste the full lyrics here if you’d like them saved.',
    }),
    defineField({
      name: 'featured',
      title: 'Feature this on the homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Turn this off to hide the song without deleting it.',
      initialValue: true,
    }),

    // ---- Advanced ----
    defineField({
      name: 'nativeTitle',
      title: 'Title in Urdu/Arabic Script',
      type: 'string',
      fieldset: 'advanced',
    }),
    defineField({
      name: 'project',
      title: 'Part of an Album?',
      type: 'reference',
      to: [{type: 'project'}],
      fieldset: 'advanced',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
      fieldset: 'advanced',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File (MP3)',
      type: 'file',
      options: {accept: 'audio/*'},
      fieldset: 'advanced',
    }),
    defineField({
      name: 'platformLinks',
      title: 'Streaming Links (Spotify, Apple Music, etc.)',
      type: 'array',
      fieldset: 'advanced',
      of: [
        {
          type: 'object',
          name: 'platformLink',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  {title: 'Spotify', value: 'spotify'},
                  {title: 'Apple Music', value: 'appleMusic'},
                  {title: 'Amazon Music', value: 'amazonMusic'},
                  {title: 'Deezer', value: 'deezer'},
                ],
              },
            }),
            defineField({name: 'url', title: 'Link', type: 'url'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'order',
      title: 'Display Order (Advanced ID)',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank unless you need precise ordering.',
      fieldset: 'advanced',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{field: 'order', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'title', subtitle: 'type', media: 'artwork'},
  },
})
