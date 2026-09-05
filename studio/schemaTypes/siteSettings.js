import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Internal Title',
      type: 'string',
      readOnly: true,
      initialValue: 'Site Settings',
      description: 'Internal label only — not shown on the website.',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title (SEO)',
      type: 'string',
    }),
    defineField({
      name: 'siteDescription',
      title: 'Site Description (SEO)',
      type: 'text',
    }),
    defineField({
      name: 'defaultSeoImage',
      title: 'Default SEO / Social Share Image',
      type: 'image',
    }),
  ],
  preview: {
    select: {title: 'title'},
  },
})
