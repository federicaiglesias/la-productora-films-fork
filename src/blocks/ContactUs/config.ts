import type { Block } from 'payload'

export const ContactUs: Block = {
  slug: 'contactUs',

  labels: {
    singular: 'Our Team',
    plural: 'Our Team',
  },

  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Título',
      defaultValue: 'OUR TEAM',
      required: true,
    },
    {
      name: 'sections',
      type: 'array',
      label: 'Secciones',
      labels: {
        singular: 'Sección',
        plural: 'Secciones',
      },
      minRows: 1,
      maxRows: 3,
      fields: [
        {
          name: 'heading',
          type: 'text',
          label: 'Título de la sección',
          required: true,
        },
        {
          name: 'people',
          type: 'array',
          label: 'Personas',
          labels: {
            singular: 'Persona',
            plural: 'Personas',
          },
          fields: [
            {
              name: 'employee',
              type: 'relationship',
              relationTo: 'employees',
              label: 'Empleado (opcional)',
            },
            {
              name: 'name',
              type: 'text',
              label: 'Nombre manual',
            },
            {
              name: 'email',
              type: 'email',
              label: 'Email manual',
            },
          ],
        },
      ],
    },
  ],
}
