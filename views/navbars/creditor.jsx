var React = require('react');
var CreditorNavbar = React.createClass({
    render: function () {
        return (<ul className="nav navbar-nav navbar-right">
            <li><a className="username" href="#">{this.props.name}</a></li>
        </ul>);
    }
});
module.exports = CreditorNavbar;