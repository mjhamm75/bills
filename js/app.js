/* global require */

var React = require("react");
var Router = require("react-router");

var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;

var App = require('./components/main.js');
var Bills = require('./components/bills.js');
var Add = require('./components/add.js');

var routes = (
  <Route name="app" path="/" handler={App}>
    <Route name="bills" handler={Bills}/>
    <Route name="add" handler={Add}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('entry'));
});