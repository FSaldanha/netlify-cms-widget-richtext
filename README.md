# netlify-cms-widget-richtext

[Check out a demo!](https://netlify-cms-widget-richtext.netlify.com/demo)

The rich text widget provides a WYSIWYG _(What You See Is What You Get)_ editor based on [react-rte](https://react-rte.org/) and [Draft.js](https://draftjs.org/).

_Please note:_ If you want to use your rich text editor to fill a markdown file contents after its frontmatter, you'll have to name the field `body` so the CMS recognizes it and saves the file accordingly.

## Install

As an npm package:

```shell
npm install --save netlify-cms-widget-richtext
```

```js
import richText from 'netlify-cms-widget-richtext'

CMS.registerWidget('richtext', RichTextControl, RichTextPreview)
```

Via `script` tag:

```html
<script src="https://unpkg.com/netlify-cms-widget-richtext@^0.1.0"></script>

<script>
  CMS.registerWidget('richtext', RichTextControl, RichTextPreview)
</script>
```

## How to use

Add to your Netlify CMS configuration:

```yaml
fields:
  - { name: 'body', label: 'Blog post content', widget: 'richtext' }
```

## Notice

This package is still in beta. Be careful when using it in production.

## To-do list

- [ ] More heading options
- [ ] Improve image selector
- [ ] Include font-size, color and media selectors

## Support

For help with this widget, open an [issue](https://github.com/FSaldaha/netlify-cms-widget-richtext/issues) or ask on the [Netlify CMS channel of the Netlify community forum](https://community.netlify.com/c/netlify-cms).
