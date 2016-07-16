import React from 'react';
import MarkdownIt from 'markdown-it';

export default class Markdown extends React.Component {
  constructor(props) {
    super(props);
    this.markdown = MarkdownIt();
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
