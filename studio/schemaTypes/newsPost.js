import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'newsPost',
  title: 'News / Announcement',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Headline',
      type: 'string',
      description: 'e.g. "New Nasheed Releasing This Rajab" or "Hiba Featured on..."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishDate',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Short Summary',
      type: 'text',
      description: 'A couple of sentences — this is what visitors see first.',
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'link',
      title: 'Read More Link (optional)',
      type: 'url',
      description: 'Link to a video, article, or press piece about this news, if there is one.',
    }),
    defineField({
      name: 'published',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {title: 'Date, Newest First', name: 'dateDesc', by: [{field: 'publishDate', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'publishDate', media: 'image'},
  },
})
