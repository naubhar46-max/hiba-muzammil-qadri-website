import {defineField, defineType} from 'sanity'

function isYouTubeUrl(url) {
  if (!url) return true
  return /^https?:\/\/(www\.)?(youtube\.com|youtu\.be)\//.test(url)
}

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required().error('Please give this video a title.'),
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube Link',
      type: 'url',
      description: 'Paste the full YouTube video link. The thumbnail is picked up automatically.',
      validation: (Rule) =>
        Rule.required()
          .error('Please paste a YouTube link.')
          .custom((value) =>
            isYouTubeUrl(value) ? true : 'This does not look like a YouTube link. Please paste the full YouTube video URL.',
          ),
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail (optional)',
      type: 'image',
      description: 'Leave blank to use YouTube’s own thumbnail automatically.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          {title: 'Featured Release', value: 'featuredRelease'},
          {title: 'Playlist Highlight', value: 'playlistHighlight'},
          {title: 'General', value: 'general'},
        ],
      },
    }),
    defineField({
      name: 'relatedMusicItem',
      title: 'Related Song (optional)',
      type: 'reference',
      to: [{type: 'musicItem'}],
    }),
    defineField({
      name: 'featured',
      title: 'Feature this on the homepage?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'published',
      title: 'Show on Website',
      type: 'boolean',
      description: 'Turn this off to hide the video without deleting it.',
      initialValue: true,
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'type', media: 'thumbnail'},
  },
})
