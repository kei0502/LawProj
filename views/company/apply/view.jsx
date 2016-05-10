var React = require('react'), DefaultLayout = require('../../layouts/default.jsx'), CreditorNavbar = require('../../navbars/creditor.jsx'), CreditorSidebar = require('../../sidebars/creditor.jsx'), CompanyApplyBody = require('./body.jsx'), $ = require('jquery');
var CompanyApplyView = React.createClass({
    render: function () {
        var navbar = (<CreditorNavbar name={this.props.user.username} logout={this.logout}/>), sidebar = (
            <CreditorSidebar selected={1}/>), body = (<CompanyApplyBody companies={this.props.companies}/>);
        return (<DefaultLayout navbar={navbar} sidebar={sidebar} main={body}/>);
    }, logout: function (e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }
});
module.exports = CompanyApplyView;