import Control from './RichTextControl'
import Preview from './RichTextPreview'

if (typeof window !== 'undefined') {
  window.RichTextControl = Control
  window.RichTextPreview = Preview
}

export { Control as RichTextControl, Preview as RichTextPreview }