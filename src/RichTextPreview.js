import PropTypes from 'prop-types';
import React from 'react';
import runSanitize from './lib'

export default function Preview({ value }) {
  return <div dangerouslySetInnerHTML={{ __html: runSanitize(value) }} />;
}

Preview.propTypes = {
  value: PropTypes.node,
};