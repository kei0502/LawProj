var React = require('react');
var ErrorPage = React.createClass({
    render: function () {
        return (<html>
        <body><h1>{this.props.message}</h1><h2>{this.props.error.status}</h2><h3>{this.props.error.stack}</h3></body>
        </html>);
    }
});
module.exports = ErrorPage;