import {defineField, defineType} from 'sanity'

import {CustomStringInput} from '../components/custom-string-input'

export default defineType({
  name: 'houses',
  title: 'Houses',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'rightMoveUrl',
      title: 'Rightmove URL',
      type: 'url',
      // inputComponent: ImageFromUrl,
    }),
    defineField({
      name: 'estateAgentUrl',
      title: 'Estate Agent URL',
      type: 'url',
      // inputComponent: ImageFromUrl,
    }),
    defineField({
      title: 'Launch Scheduled At',
      name: 'launchAt',
      type: 'datetime',
      options: {
        dateFormat: 'YYYY-MM-DD',
        timeFormat: 'HH:mm',
        timeStep: 15,
      },
    }),
    defineField({
      title: 'Price in £',
      name: 'price',
      type: 'string',
    }),

    defineField({
      name: 'imageAsUrl',
      title: 'Image URL',
      type: 'string',
      components: {
        input: CustomStringInput,
      },
    }),

    defineField({
      title: 'House Location',
      name: 'location',
      type: 'string',
    }),

    defineField({
      title: 'Estate Agent',
      name: 'estateAgent',
      type: 'reference',
      to: [{type: 'estateAgents'}],
    }),

    defineField({
      name: 'hasBeenVisited',
      title: 'Visited?',
      type: 'boolean',
    }),
    defineField({
      name: 'show',
      title: 'Show in front-end?',
      type: 'boolean',
    }),

    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
    }),
  ],
  initialValue: {
    hasBeenVisited: false,
    show: true,
  },
  preview: {
    select: {
      title: 'name',
      media: 'image',
    },
  },
})
