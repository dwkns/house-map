import {defineConfig} from 'sanity'
import {deskTool} from 'sanity/desk'
// import {visionTool} from '@sanity/vision'
import {schemaTypes} from './schemas'
import {googleMapsInput} from '@sanity/google-maps-input'

export default defineConfig({
  name: 'default',
  title: 'find-a-home',

  projectId: '7oex9z8d',
  dataset: 'production',

  plugins: [
    deskTool(),
    // googleMapsInput({
    //   apiKey: 'AIzaSyBFEPMV0tsGi4ZoIEKGDUz8dZyBtvl_Am0',
    //   defaultZoom: 9,
    //   defaultLocation: {
    //     lat: 51.924988636888365,
    //     lng: 0.3517860586509959,
    //   },
    // }),
    // visionTool()
  ],

  schema: {
    types: schemaTypes,
  },
})
