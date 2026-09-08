import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'galleryItem',
  title: 'Gallery Item',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      description: 'Best size: at least 900px on the shorter side.',
      options: {hotspot: true},
      validation: (Rule) => Rule.required().error('Please choose a photo.'),
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'A short line describing this photo — shown under it.',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      description: 'Optional — a short label like "Performance" or "Behind the Scenes".',
    }),
    defineField({
      name: 'relatedProject',
      title: 'Related Album (optional)',
      type: 'reference',
      to: [{type: 'project'}],
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave blank for default order.',
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
    select: {title: 'caption', subtitle: 'category', media: 'image'},
  },
})
