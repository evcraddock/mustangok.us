import { MarkdownToHtmlPipe } from './markdown-to-html.pipe';

describe('markdowntohtmlPipe', () => {
  let pipe: MarkdownToHtmlPipe;

  beforeEach(() => {
    pipe = new MarkdownToHtmlPipe();
  });

  it('markdown header should be transformed to html h1 tag', () => {
    const value = '# Title';
    const expectedhtml = '<h1 id="title">Title</h1>';

    expect(pipe.transform(value)).toBe(expectedhtml);
  });

  it('markdown link should be transformed to html a tag', () => {
    const value = '[I am an inline-style link](https://www.google.com)';
    const expectedhtml = '<p><a href="https://www.google.com">I am an inline-style link</a></p>';

    expect(pipe.transform(value)).toBe(expectedhtml);
  });

});
