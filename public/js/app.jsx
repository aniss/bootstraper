'use strict';

import React from 'react';
import Router from 'react-router';
import Main from 'js/views/main';
import Message from 'js/views/message';
import Resolver from 'js/resolver';

let { Route } = Router;

let routes = (
  <Route name="main" path="/" test='test' handler={Main}>
    <Route name="message" handler={Message}></Route>
  </Route>
);

Router.run(routes, function(Handler, state) {

  let resolver = new Resolver(state);
  let container = document.getElementById('app');

    resolver.resolve()
    .then(props => {
      React.render(
        <Handler {...props} />,
        container
    ).catch(error => alert(error));
  });
});
