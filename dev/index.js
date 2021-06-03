import './bootstrap.js'
import CMS, { init } from 'netlify-cms'
import 'netlify-cms/dist/cms.css'
import { RichTextControl, RichTextPreview } from '../src'

const config = {
  backend: {
    name: 'test-repo',
    login: false,
  },
  media_folder: 'assets',
  collections: [{
    name: 'test',
    label: 'Test',
    files: [{
      file: 'test.yml',
      name: 'test',
      label: 'Test',
      fields: [
        { name: 'test_widget', label: 'Rich Text Widget', widget: 'test' },
      ],
    }],
  }],
}

CMS.registerWidget('test', RichTextControl, RichTextPreview)

init({ config })
