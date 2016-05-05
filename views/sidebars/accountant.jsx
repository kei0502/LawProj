var React = require('react');
var AccountantSidebar = React.createClass({
    getDefaultProps: function () {
        return {selected: 1};
    },
    render: function () {
        return (<ul className="nav nav-sidebar">
            <li className={this.props.selected===1?"active":""}><a href="#">债权申请审核</a></li>
        </ul>);
    }
});
module.exports = AccountantSidebar;
