import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'
import { authenticatedOrPublished } from '@/access/authenticatedOrPublished'
import { slugField } from '@/fields/slug'

export const Demos: CollectionConfig<'commercials'> = {
  slug: 'demos',
  labels: {
    singular: 'Demo',
    plural: 'Demos',
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  defaultPopulate: {
    title: true,
    slug: true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      localized: true,
    },
    {
      name: 'description',
      type: 'richText',
      required: true,
      localized: true,
    },
    {
      name: 'director',
      type: 'text',
      required: false,
    },
    {
      name: 'vimeoUrl',
      type: 'text',
      required: true,
    },
    {
      name: 'youtubeUrl',
      type: 'text',
      required: false,
    },
    {
      name: 'thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'releaseDate',
      type: 'date',
      required: true,
    },
    {
      name: 'client',
      type: 'text',
    },
    ...slugField(),
  ],
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
