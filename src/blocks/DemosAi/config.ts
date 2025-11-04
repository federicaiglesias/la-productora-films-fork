// src/blocks/DemosAi/config.ts
import type { Block } from 'payload'

export const DemosAi: Block = {
  slug: 'DemosAi',
  labels: { singular: 'Demos', plural: 'Demos' },
  fields: [
    {
      name: 'items',
      type: 'array',
      label: 'Demos seleccionadas',
      labels: { singular: 'Demo', plural: 'Demos' },
      minRows: 1,
      fields: [
        {
          name: 'demo',
          type: 'relationship',
          relationTo: 'demos',
          required: true,
        },
      ],
      admin: { initCollapsed: true },
    },
  ],
}
