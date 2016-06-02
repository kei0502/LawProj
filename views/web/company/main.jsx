/**
 * Created by gyz on 16/5/4.
 */
import React from 'react';
import ReactDOM from 'react-dom';
import View from './view';
function main(data, containerId) {
    var container = document.getElementById(containerId || 'react-content');
    ReactDOM.render(<View {...data}/>, container);
}
main(window.data);
export default main;