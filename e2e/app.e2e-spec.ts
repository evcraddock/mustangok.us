import { SampleNewsPage } from './app.po';

describe('sample-news App', () => {
  let page: SampleNewsPage;

  beforeEach(() => {
    page = new SampleNewsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
