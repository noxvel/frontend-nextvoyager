import { FrontendNextvoyagerPage } from './app.po';

describe('frontend-nextvoyager App', function() {
  let page: FrontendNextvoyagerPage;

  beforeEach(() => {
    page = new FrontendNextvoyagerPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
