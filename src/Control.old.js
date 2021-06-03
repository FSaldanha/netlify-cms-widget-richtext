import PropTypes from 'prop-types';
import React from 'react';
import { EditorState, convertToRaw, ContentState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import { stateFromHTML } from 'draft-js-import-html'
import runSanitize from './lib'
import '../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class Control extends React.Component {
  constructor(props) {
    super(props);
    const html = runSanitize(props.value);
    const editorState = this.html2draft(html);
    this.state = {
      editorState,
    }
    this.visualEditor = React.createRef();
    this.rawEditor = React.createRef();
  }

  static propTypes = {
    onChange: PropTypes.func.isRequired,
    forID: PropTypes.string,
    value: PropTypes.node,
    classNameWrapper: PropTypes.string.isRequired,
  }

  static defaultProps = {
    value: '',
  }

  html2draft = value => {
    /* const contentBlock = htmlToDraft(value);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    } */
    const contentState = stateFromHTML(value);
    if (contentState) {
      return EditorState.createWithContent(contentState);
    } else {
      return EditorState.createEmpty();
    }
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState,
    });
    const html = runSanitize(draftToHtml(convertToRaw(editorState.getCurrentContent())));
    this.props.onChange(html);
  };

  onRawEditorChange = e => this.props.onChange(e.target.value);

  onRawEditorBlur = e => {
    const value = runSanitize(e.target.value);
    const editorState = this.html2draft(value);
    this.setState({
      editorState
    });
    this.props.onChange(value);
  }

  toggleEditor = (e) => {
    if (e.target.value == 0) {
      this.visualEditor.current.style.display = 'block';
      this.rawEditor.current.style.display = 'none';
    }
    if (e.target.value == 1) {
      this.visualEditor.current.style.display = 'none';
      this.rawEditor.current.style.display = 'block';
    }
  };

  render() {
    const { editorState } = this.state;

    const {
      classNameWrapper,
      value
    } = this.props;

    return (
      <div className={classNameWrapper}>
        <select onChange={this.toggleEditor}>
          <option value="0">Rich Text</option>
          <option value="1">HTML</option>
        </select>
        <div ref={this.visualEditor}>
          <Editor
            editorState={editorState}
            onBlur={this.onVisualEditorBlur}
            onEditorStateChange={this.onEditorStateChange}
            toolbar={{ options: ['inline', 'blockType', 'fontSize', 'list', 'textAlign', 'colorPicker', 'link', 'embedded', 'emoji', 'image', 'remove', 'history'] }}
          />
        </div>
        <div style={{ display: 'none' }} ref={this.rawEditor}>
          <textarea
            value={value}
            onChange={this.onRawEditorChange}
            onBlur={this.onRawEditorBlur}
          />
        </div>
      </div>
    );
  }
}