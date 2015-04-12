'use strict';
import React from 'react/addons';

export default class Resolver {
  constructor(state) {
    this.routes = state.routes || [];
  }

  resolve() {
    let toResolve = this.routes.filter(route => route.handler.resolve);
    let promises = [];
    let toResolveKeys = [];

    toResolve.forEach(route => {
      toResolveKeys = toResolveKeys.concat(this._getResolveKeys(route));
      promises = promises.concat(this._getResolvePromises(route));
    });

    return Promise.all(promises).then(values => {
      let props = {};
      values.forEach((value, index) => {
        let key = toResolveKeys[index];
        props[key] = value;
      });
      return props;
    }).catch(error => console.log(error));

  }
  _getResolveKeys(route) {
    return Object.keys(route.handler.resolve());
  }
  _getResolvePromises(route) {
    let promises = [];
    let PromisetoResolve = route.handler.resolve();
    for(let key in PromisetoResolve) {
      promises.push(PromisetoResolve[key]());
    }
    return promises;
  }
}
