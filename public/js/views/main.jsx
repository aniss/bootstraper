'use strict';

import React from 'react';
import Router from 'react-router';
import userStore from 'js/stores/user';

let {RouteHandler} = Router;

export default class Main extends React.Component {
  static resolve() {
    return {
      messages: function() {
        return userStore.getInitialState();
      }
    }
  }
  render() {
    return (
      <div>
        This is main app.
        <RouteHandler />
      </div>
    );
  }
}
