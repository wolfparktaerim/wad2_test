describe('Homepage End-to-end Test', () => {

  it('tests if homepage is loaded', browser => {
    browser
      .navigateTo('http://localhost:5173')
      .assert.visible('#app .navbar-expand-sm')
      .assert.visible('#app .navbar-nav')
      .expect.elements('#app .nav-item').count.toEqual(4)
      .assert.visible('#app .container-fluid')
      .assert.visible('#app #sgWeatherNavbar')
      .assert.visible('#app ul.navbar-nav')
      .assert.visible('#app li.nav-item')
      //.assert.visible('#app li>a.nav-link li>a.active')
  });

  it('Click on the Temperature tab and check for presence of temperature info', browser => {
    browser
      .click('#app li.nav-item')

    // pause for 300 ms
    browser.pause(300);

    browser
    .assert.visible('#app .table')

    const element = locateWith(By.tagName('th'))
    browser
    //.element.find()
    // .element.find('#app .table .col-md-6:nth-child(2)')
    //browser.assert.visible('#app .btn .btn-primary')
    .assert.textEquals(element, 'Station');

    browser
    .assert.textEquals({selector: 'th', index: 1}, 'Temperature');

  });

  after(browser => browser.end());
});