'use strict';

import Reflux from 'reflux';

let userStore = Reflux.createStore({
  init() {
    console.log('init store');
  },
  getInitialState() {
    return Promise.reject({message: 'no users in database.'});
  }
});

export default userStore;
