import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'musicPlatformLink',
  title: 'Music Platform Link',
  type: 'document',
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Custom Icon (optional)',
      type: 'image',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
    }),
    defineField({
      name: 'active',
      title: 'Active (visible on site)',
      type: 'boolean',
      initialValue: true,
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
    select: {title: 'platform', subtitle: 'url'},
  },
})
