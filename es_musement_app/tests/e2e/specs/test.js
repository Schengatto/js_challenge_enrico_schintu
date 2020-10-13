// For authoring Nightwatch tests, see
// https://nightwatchjs.org/guide

module.exports = {
  "Test Footer": browser => {
    browser
      .init()
      .waitForElementVisible("header")
      .assert.elementPresent(".footer-extra")
      .end();
  },

  "Test Dashboard": browser => {
    browser
      .openHomepage()
      .waitForElementVisible("header")
      .assert.elementPresent("#user_menu_wrapper")
      .assert.elementPresent("#mini_bag_wrapper")
      .assert.elementPresent("#mini_wishlist_wrapper")
      .end();
  }
};
