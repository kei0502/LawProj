var React = require('react'), DefaultLayout = require('../../layouts/default.jsx'), CreditorNavbar = require('../../navbars/creditor.jsx'), CreditorSidebar = require('../../sidebars/creditor.jsx'), ClaimListBody = require('./body.jsx');
var ClaimListView = React.createClass({
    render: function () {
        var navbar = (<CreditorNavbar name={this.props.user.name} logout={this.logout}/>), sidebar = (
            <CreditorSidebar selected={2}/>), body = (<ClaimListBody claims={this.props.claims}/>);
        return (<DefaultLayout navbar={navbar} sidebar={sidebar} main={body}/>);
    }, logout: function (e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }
});
module.exports = ClaimListView;