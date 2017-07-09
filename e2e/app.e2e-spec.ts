import { KidsPrepPage } from './app.po';

describe('kids-prep App', () => {
  let page: KidsPrepPage;

  beforeEach(() => {
    page = new KidsPrepPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
