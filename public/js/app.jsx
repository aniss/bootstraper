import React from 'react';
import Router from 'react-router';
import Main from 'views/Main';

let { Route } = Router;

let routes = (
  <Route name="main" path="/" handler={Main}/>
);


Router.run(routes, (Handler) => {
  React.render(<Handler/>, document.getElementById('app'));
});
