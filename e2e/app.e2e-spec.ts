import { VacaCountdownTwoPage } from './app.po';

describe('vaca-countdown-two App', () => {
  let page: VacaCountdownTwoPage;

  beforeEach(() => {
    page = new VacaCountdownTwoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
