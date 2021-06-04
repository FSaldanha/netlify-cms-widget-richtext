import PropTypes from 'prop-types';
import React from 'react';
import { EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { stateToHTML as contentToHTML } from 'draft-js-export-html';
import { stateFromHTML as contentFromHTML } from 'draft-js-import-html';
import { sanitizeHTML } from './lib'
import './styles.css';
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

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

  initialValue = this.props.value ? EditorState.createWithContent(contentFromHTML(this.props.value)) : EditorState.createEmpty();

  state = {
    editorState: this.initialValue,
  }

  onRichEditorChange = editorState => {
    this.setState({ editorState });
    this.props.onChange(contentToHTML(editorState.getCurrentContent()));
  }

  onSourceEditorChange = e => {
    const editorState = EditorState.createWithContent(contentFromHTML(e.target.value));
    this.onRichEditorChange(editorState);
  }

  onSourceEditorBlur = e => {
    e.target.value = sanitizeHTML(e.target.value);
  }

  render() {
    const { editorState } = this.state;

    const { classNameWrapper, value, forID } = this.props;

    return (
      <div
        id={forID}
        className={`${classNameWrapper} rte-widget`}
      >
        <details open={true}>
          <summary>
            Rich Text
          </summary>
          <Editor
            defaultEditorState={editorState}
            editorStyle={{ border: "1px solid #222", height: "200px" }}
            onEditorStateChange={this.onRichEditorChange}
            wrapperClassName="rte-wrapper"
          />
        </details>
        <details>
          <summary>
            HTML
          </summary>
          <textarea
            value={value}
            onChange={this.onSourceEditorChange}
            onBlur={this.onSourceEditorBlur}
          />
        </details>
      </div>
    )
  }
}