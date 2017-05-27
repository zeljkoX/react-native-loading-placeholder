/* @flow */
/* eslint-disable import/no-commonjs */

module.exports = {
  get PlaceholderContainer() {
    return require('./PlaceholderContainer').default;
  },
  get Placeholder() {
    return require('./Placeholder').default;
  }
};
