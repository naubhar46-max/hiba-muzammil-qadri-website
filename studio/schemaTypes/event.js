import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Name',
      type: 'string',
      description: 'e.g. "Ramadan Live Transmission" or "Naat Competition — Karachi".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'eventDate',
      title: 'Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City / venue, if there is one. Leave blank for online-only events.',
    }),
    defineField({
      name: 'description',
      title: 'What is this event?',
      type: 'text',
    }),
    defineField({
      name: 'image',
      title: 'Event Photo / Poster',
      type: 'image',
      options: {hotspot: true},
    }),
    defineField({
      name: 'link',
      title: 'More Info Link (optional)',
      type: 'url',
      description: 'A YouTube video, article, or ticket link about this event, if there is one.',
    }),
    defineField({
      name: 'upcoming',
      title: 'Is this event upcoming?',
      type: 'boolean',
      description: 'Turn this off once the event has happened.',
      initialValue: true,
    }),
    defineField({
      name: 'published',
      title: 'Show on Website',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  orderings: [
    {title: 'Date, Newest First', name: 'dateDesc', by: [{field: 'eventDate', direction: 'desc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'eventDate', media: 'image'},
  },
})
