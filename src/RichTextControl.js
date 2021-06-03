import PropTypes from 'prop-types';
import React from 'react';
import runSanitize from './lib'
import RichTextEditor from 'react-rte';
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

  state = {
    editorValue: RichTextEditor.createValueFromString(this.props.value, 'html')
  }

  onEditorChange = editorValue => {
    this.setState({ editorValue });
    this.props.onChange(editorValue.toString('html'));
  }

  onSourceChange = e => {
    const source = e.target.value;
    this.setState({
      editorValue: RichTextEditor.createValueFromString(source, 'html'),
    });
    this.props.onChange(source);
  }

  onSourceBlur = e => {
    const source = runSanitize(e.target.value);
    this.setState({
      editorValue: RichTextEditor.createValueFromString(source, 'html'),
    });
    this.props.onChange(source);
  }

  render() {
    const { editorValue } = this.state;

    const { classNameWrapper } = this.props;

    return (
      <div className={`${classNameWrapper} html-editor-widget`}>
        <RichTextEditor
          value={editorValue}
          onChange={this.onEditorChange}
        />
        <details style={{ marginTop: '15px' }}>
          <summary>
            HTML
          </summary>
          <textarea
            className='html-widget-source-editor'
            value={editorValue.toString('html')}
            onChange={this.onSourceChange}
            onBlur={this.onSourceBlur}
          />
        </details>
      </div>
    )
  }
}