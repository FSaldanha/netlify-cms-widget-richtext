import sanitizeHtml from 'sanitize-html';

export default function runSanitize(value) {
  return sanitizeHtml(value, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
    allowProtocolRelative: false
  });
}