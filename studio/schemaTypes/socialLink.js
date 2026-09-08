import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'document',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Facebook', value: 'facebook'},
          {title: 'TikTok', value: 'tiktok'},
          {title: 'Threads', value: 'threads'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile Link',
      type: 'url',
      description: 'Paste the full link to the official profile/page.',
      validation: (Rule) => Rule.required().error('Please paste the profile link.'),
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
