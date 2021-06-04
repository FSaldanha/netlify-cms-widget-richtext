# netlify-cms-widget-richtext

The rich text widget provides a WYSIWYG _(What You See Is What You Get)_ editor based on [react-draft-wysiwyg](https://jpuri.github.io/react-draft-wysiwyg/) and [Draft.js](https://draftjs.org/).

_Please note:_ If you want to use your rich text editor to fill a markdown file contents after its frontmatter, you'll have to name the field `body` so the CMS recognizes it and saves the file accordingly.

## Install

```js
import richText from 'netlify-cms-widget-richtext'

CMS.registerWidget('richtext', RichTextControl, RichTextPreview)
```

## How to use

Add to your Netlify CMS configuration:

```yaml
fields:
  - { name: 'body', label: 'Blog post content', widget: 'richtext' }
```

## Notice

This package is still in beta. Be careful when using it in production.

## Support

For help with this widget, open an [issue](https://github.com/FSaldaha/netlify-cms-widget-richtext/issues) or ask on the [Netlify CMS channel of the Netlify community forum](https://community.netlify.com/c/netlify-cms).
