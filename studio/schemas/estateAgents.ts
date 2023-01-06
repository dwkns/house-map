import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'estateAgents',
  title: 'Estate Agents',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'office',
      title: 'Office',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'Estate Agent URL',
      type: 'string',
    }),
    defineField({
      name: 'contactName',
      title: 'Contact',
      type: 'string',
    }),

    defineField({
      name: 'contactNumber',
      title: 'Contact Number',
      type: 'string',
    }),

    defineField({
      name: 'description',
      title: 'Description/Notes',
      type: 'text',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      office: 'office',
    },
    prepare(selection) {
      const {title, office} = selection
      return {
        title: title,
        subtitle: office, // YYYY-MM-DD --> YYYY
      }
    },
  },
})
