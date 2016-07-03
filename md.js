import React from 'react';
import MarkdownIt from 'markdown-it';
import highlightjs from 'markdown-it-highlightjs';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.markdown = MarkdownIt().use(highlightjs);
  }

  render() {
    return (
      <div
        className="markdown"
        dangerouslySetInnerHTML={{__html: this.markdown.render(this.props.source)}}
      />
    );
  }
}
