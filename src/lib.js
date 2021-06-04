import { stateToHTML } from 'draft-js-export-html';
import { stateFromHTML } from 'draft-js-import-html';

export const toStringOptions = { blockStyleFn: getTextAlignStyles }

export const fromStringOptions = { customBlockFn: getTextAlignBlockMetadata }

export const sanitizeHTML = value => {
  const state = stateFromHTML(value, fromStringOptions);
  return stateToHTML(state, toStringOptions);
}