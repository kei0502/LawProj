var React = require('react');
var Scripts = React.createClass({
    render: function () {
        return (<div>
            <script src="/js/ie10-viewport-bug-workaround.js"/>
            <script src="/js/jquery.js"/>
            <script src="/js/bootstrap.min.js"/>
            <script src="/js/react.js"/>
            <script src="/js/react-dom.min.js"/>
            <script src="/js/bcrypt.min.js"/>
            <script src="/js/moment-with-locales.min.js"/>
            <script src="/js/react-bootstrap-datetimepicker.min.js"/>
            <script src="/js/react-data-components.min.js"/>
        </div>);
    }
});
module.exports = Scripts;