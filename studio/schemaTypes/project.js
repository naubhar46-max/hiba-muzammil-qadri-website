import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Album',
  type: 'document',
  fieldsets: [
    {
      name: 'advanced',
      title: 'Google Search Information (Advanced)',
      options: {collapsible: true, collapsed: true},
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Album Name',
      type: 'string',
      validation: (Rule) => Rule.required().error('Please give this album a name.'),
    }),
    defineField({
      name: 'coverArtwork',
      title: 'Cover Picture',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
    defineField({
      name: 'releaseDate',
      title: 'Release Date',
      type: 'date',
    }),
    defineField({
      name: 'seoTitle',
      title: 'Google Search Title',
      type: 'string',
      description: 'The headline shown in Google search results. Leave blank to use the album name.',
      fieldset: 'advanced',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Google Search Description',
      type: 'text',
      description: 'The short summary shown under the title in Google search results.',
      fieldset: 'advanced',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'releaseDate', media: 'coverArtwork'},
  },
})
