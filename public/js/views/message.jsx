'use strict';

import React from 'react';

export default class Message extends React.Component {
  static resolve() {
    return {
      users: function() {
        return Promise.resolve('This is for message');
      }
    }
  }
  render() {
    console.log('message', this.props);
    return (
      <div>
        This is message.
      </div>
    );
  }
}
