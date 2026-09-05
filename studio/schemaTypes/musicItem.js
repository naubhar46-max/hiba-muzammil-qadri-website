import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'musicItem',
  title: 'Music Item',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'nativeTitle',
      title: 'Native Title',
      type: 'string',
      description: 'Title written in Urdu/Arabic script, if applicable.',
    }),
    defineField({
      name: 'type',
      title: 'Category',
      type: 'string',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'language',
      title: 'Language',
      type: 'reference',
      to: [{type: 'language'}],
    }),
    defineField({
      name: 'project',
      title: 'Project / Album',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'artwork',
      title: 'Cover Artwork',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
    }),
    defineField({
      name: 'audioFile',
      title: 'Audio File (MP3)',
      type: 'file',
      options: {accept: 'audio/*'},
    }),
    defineField({
      name: 'lyrics',
      title: 'Lyrics',
      type: 'text',
    }),
    defineField({
      name: 'platformLinks',
      title: 'Platform Links',
      type: 'array',
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
            defineField({name: 'url', title: 'URL', type: 'url'}),
          ],
        },
      ],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Published (visible on site)',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
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
