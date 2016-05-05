var React = require('react');
var VisitorSidebar = React.createClass({
    getDefaultProps: function () {
        return {selected: 0};
    },
    render: function () {
        return (<ul className="nav nav-sidebar">
            <li className={this.props.selected===0?"active":""}><a href="/">首页</a></li>
        </ul>);
    }
});
module.exports = VisitorSidebar;
