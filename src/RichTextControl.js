import PropTypes from 'prop-types';
import React from 'react';
import RichTextEditor from 'react-rte';
import { getTextAlignStyles, getTextAlignBlockMetadata, sanitizeHTML, getTextAlignClassName } from './lib'
import './styles.css';

export default class Control extends React.Component {
  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  toStringOptions = {
    blockStyleFn: getTextAlignStyles, blockRenderers: {
      unstyled: (block) => {
        if (!block.getText().trim().length) {
          return "";
        }
      }
    }
  }

  fromStringOptions = { customBlockFn: getTextAlignBlockMetadata }

  initialValue = this.props.value ? RichTextEditor.createValueFromString(this.props.value, 'html', this.fromStringOptions) : RichTextEditor.createEmptyValue();

  state = {
    editorValue: this.initialValue
  }

  onRichEditorChange = editorValue => {
    this.setState({ editorValue });
    this.props.onChange(editorValue.toString('html', this.toStringOptions));
  }

  onSourceEditorChange = e => {
    const editorValue = RichTextEditor.createValueFromString(e.target.value, 'html', this.fromStringOptions);
    this.onRichEditorChange(editorValue);
  }

  onSourceEditorBlur = e => {
    e.target.value = sanitizeHTML(e.target.value);
  }

  render() {
    const { editorValue } = this.state;

    const { classNameWrapper, forID } = this.props;

    return (
      <div
        id={forID}
        className={`${classNameWrapper} rte-widget`}
      >
        <details open={true}>
          <summary>
            Rich Text
          </summary>
          <RichTextEditor
            value={editorValue}
            onChange={this.onRichEditorChange}
            blockStyleFn={getTextAlignClassName}
          />
        </details>
        <details>
          <summary>
            HTML
          </summary>
          <textarea
            value={editorValue.toString('html', this.toStringOptions)}
            onChange={this.onSourceEditorChange}
            onBlur={this.onSourceEditorBlur}
          />
        </details>
      </div>
    )
  }
}