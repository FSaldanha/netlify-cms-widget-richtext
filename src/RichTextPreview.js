import PropTypes from 'prop-types';
import React from 'react';
import { sanitizeHTML } from './lib'

export default function Preview({ value }) {
  return <div dangerouslySetInnerHTML={{ __html: sanitizeHTML(value) }} />;
}

Preview.propTypes = {
  value: PropTypes.node,
};