var React = require('react');
var VisitorNavbar = React.createClass({
    render: function () {
        return (<ul className="nav navbar-nav navbar-right">
            <li><a href="#" data-toggle="modal" onClick={this.props.login}><span
                className="glyphicon glyphicon-log-in"/> 登录</a></li>
            <li><a href="#" data-toggle="modal" onClick={this.props.register}><span
                className="glyphicon glyphicon-edit"/> 注册</a></li>
        </ul>);
    }
});
module.exports = VisitorNavbar;