var React = require('react');
var CreditorSidebar = React.createClass({
    getDefaultProps: function () {
        return {selected: 0};
    },
    render: function () {
        return (<ul className="nav nav-sidebar">
            <li className={this.props.selected===0?"active":""}><a href="/">首页</a></li>
            <li className={this.props.selected===1?"active":""}><a href="/claims/add">添加债权申请表</a></li>
            <li className={this.props.selected===2?"active":""}><a href="/claims/list">查看债权申请表</a></li>
        </ul>);
    }
});
module.exports = CreditorSidebar;
