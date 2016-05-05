var React = require('react');
var CompanyNavbar = React.createClass({
    render: function () {
        return (<ul className="nav navbar-nav navbar-right">
            <li><a className="username" href="#">{this.props.name}</a></li>
        </ul>);
    }
});
module.exports = CompanyNavbar;