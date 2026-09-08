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
      title: 'Artist Page Link',
      type: 'url',
      description: 'Paste the full link to the official artist page on this platform.',
      validation: (Rule) => Rule.required().error('Please paste the artist page link.'),
    }),
    defineField({
      name: 'icon',
      title: 'Custom Icon (optional)',
      type: 'image',
      description: 'Leave blank to use the built-in platform icon.',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first.',
    }),
    defineField({
      name: 'active',
      title: 'Show on Website',
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
