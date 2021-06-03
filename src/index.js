import Control from './RichtextControl'
import Preview from './RichtextPreview'

if (typeof window !== 'undefined') {
  window.RichtextControl = Control
  window.RichtextPreview = Preview
}

export { Control as RichtextControl, Preview as RichtextPreview }