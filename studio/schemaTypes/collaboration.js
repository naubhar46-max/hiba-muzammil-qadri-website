import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'collaboration',
  title: 'Collaboration',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Collaboration Name',
      type: 'string',
      description: 'e.g. "In His Love — International Collaboration Medley".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'collaborators',
      title: 'Who was this with?',
      type: 'string',
      description: 'Names of the other artist(s) involved.',
    }),
    defineField({
      name: 'description',
      title: 'About this Collaboration',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Photo / Cover Art',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Link',
      type: 'url',
      description: 'Paste the YouTube video link here, if there is one.',
    }),
    defineField({
      name: 'published',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'collaborators', media: 'image'},
  },
})
