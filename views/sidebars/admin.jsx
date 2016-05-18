var React = require('react');
var AdminSidebar = React.createClass({
    getDefaultProps: function () {
        return {selected: 1};
    },
    render: function () {
        return (<ul className="nav nav-sidebar">
            <li className={this.props.selected===1?"active":""}><a href="/company/management">破产企业管理</a></li>
            <li className={this.props.selected===2?"active":""}><a href="#">债权申请管理</a></li>
        </ul>);
    }
});
module.exports = AdminSidebar;
