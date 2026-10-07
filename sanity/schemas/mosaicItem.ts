import { defineType, defineField } from 'sanity'

export const mosaicItem = defineType({
  name: 'mosaicItem',
  title: 'Media Mosaic Item',
  type: 'document',
  description: 'A single photo or YouTube video shown in the media mosaic on the Content page. YouTube videos embed and play in place — visitors never leave the site. The mosaic is hidden entirely when there are no items.',
  fields: [
    defineField({
      name: 'mediaType',
      title: 'Media Type',
      type: 'string',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'YouTube Video', value: 'youtube' },
        ],
      },
      initialValue: 'image',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: { hotspot: true },
      hidden: ({ parent }) => parent?.mediaType !== 'image',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined
          if (parent?.mediaType === 'image' && !value) return 'Image is required when Media Type is Image.'
          return true
        }),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describe the image for screen readers.',
        }),
      ],
    }),
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste a YouTube link, e.g. https://www.youtube.com/watch?v=xxxxxxxxxxx or https://youtu.be/xxxxxxxxxxx',
      hidden: ({ parent }) => parent?.mediaType !== 'youtube',
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const parent = context.parent as { mediaType?: string } | undefined
          if (parent?.mediaType !== 'youtube') return true
          if (!value) return 'YouTube URL is required when Media Type is YouTube Video.'
          const isYouTube = /^https?:\/\/(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)/.test(
            value
          )
          return isYouTube || 'Enter a valid YouTube URL (youtube.com or youtu.be).'
        }),
    }),
    defineField({
      name: 'uploadDate',
      title: 'YouTube Upload Date',
      type: 'datetime',
      description: 'When the video was published on YouTube (shown under the video on youtube.com). Google requires this to index the video. If left empty, the date this item was created is used.',
      hidden: ({ parent }) => parent?.mediaType !== 'youtube',
    }),
    defineField({
      name: 'caption',
      title: 'Caption',
      type: 'string',
      description: 'Optional short caption shown on hover.',
    }),
  ],
  preview: {
    select: {
      title: 'caption',
      mediaType: 'mediaType',
      media: 'image',
    },
    prepare({ title, mediaType, media }) {
      return {
        title: title || (mediaType === 'youtube' ? 'YouTube Video' : 'Image'),
        subtitle: mediaType === 'youtube' ? 'YouTube Video' : 'Image',
        media,
      }
    },
  },
})
