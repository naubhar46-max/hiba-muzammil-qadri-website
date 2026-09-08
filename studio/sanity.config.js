import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {structure} from './structure'

export default defineConfig({
  name: 'default',
  title: 'Hiba Muzammil Qadri — Website Content',

  projectId: '7rufe5dw',
  dataset: 'production',

  plugins: [structureTool({structure})],

  schema: {
    types: schemaTypes,
  },
})
