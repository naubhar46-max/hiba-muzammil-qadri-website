import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'playlist',
  title: 'Playlist',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Playlist Name',
      type: 'string',
      description: 'What this playlist is called — e.g. "Soulful Duas & Nasheeds".',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Short Subtitle (optional)',
      type: 'string',
      description: 'A few words shown under the name, e.g. "Healing Prayers".',
    }),
    defineField({
      name: 'platform',
      title: 'Where is this playlist?',
      type: 'string',
      options: {
        list: [
          {title: 'YouTube', value: 'youtube'},
          {title: 'Spotify', value: 'spotify'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'playlistId',
      title: 'Playlist Link',
      type: 'url',
      description: 'Paste the full playlist link from YouTube or Spotify here.',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverColor',
      title: 'Cover Colour',
      type: 'string',
      description: 'A simple background colour shown on the playlist card (used until real cover art is added).',
      options: {
        list: [
          {title: 'Emerald Green', value: 'emerald'},
          {title: 'Burgundy Red', value: 'burgundy'},
          {title: 'Gold', value: 'gold'},
          {title: 'Deep Plum', value: 'plum'},
          {title: 'Peacock Blue', value: 'peacock'},
        ],
      },
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
    {title: 'Display Order', name: 'orderAsc', by: [{field: 'order', direction: 'asc'}]},
  ],
  preview: {
    select: {title: 'title', subtitle: 'subtitle'},
  },
})
