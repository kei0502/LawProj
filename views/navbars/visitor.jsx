var React = require('react');
var VisitorNavbar = React.createClass({
    render: function () {
        return (<ul className="nav navbar-nav navbar-right">
            <li><a href="#" data-toggle="modal" onClick={this.props.login}>登录</a></li>
            <li><a href="#" data-toggle="modal" onClick={this.props.register}>注册</a></li>
        </ul>);
    }
});
module.exports = VisitorNavbar;