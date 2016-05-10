/**
 * Created by gyz on 16/5/4.
 */
var React = require('react'), ReactDOM = require('react-dom'), View = require('./view.jsx');
module.exports = function (data, containerId) {
    var container = document.getElementById(containerId || 'container');
    ReactDOM.render(<View {...data}/>, container);
};