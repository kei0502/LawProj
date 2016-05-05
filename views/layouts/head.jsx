var React = require('react');
var Head = React.createClass({
    render: function () {
        return (<head>
            <title>{this.props.title ? this.props.title + " | 法务原型" : "法务原型"}</title>
            <link rel="stylesheet" href="css/bootstrap.min.css"/>
            <link rel="stylesheet" href="css/bootstrap-datetimepicker.min.css"/>
            <link rel="stylesheet" href="css/dataTables.bootstrap.min.css"/>
            <link rel="stylesheet" href="css/style.css"/>
            <meta charSet="utf-8"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </head>);
    }
});
module.exports = Head;