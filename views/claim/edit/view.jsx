var React = require('react'), DefaultLayout = require('../../layouts/default.jsx'), CreditorNavbar = require('../../navbars/creditor.jsx'), CreditorSidebar = require('../../sidebars/creditor.jsx'), ClaimEditBody = require('./body.jsx'), RegisterModal = require('../../modals/register.jsx'), $ = require('jquery');
var ClaimEditView = React.createClass({
    render: function () {
        var navbar = (<CreditorNavbar name={this.props.user.name} logout={this.logout}/>), sidebar = (
            <CreditorSidebar selected={this.props.claim?2:1}/>), body = (
            <ClaimEditBody {...this.props} registerStart={this.registerStart} ref="body"/>);
        return (<DefaultLayout navbar={navbar} sidebar={sidebar} main={body}>
            <RegisterModal confirm={this.registerConfirm} ref="registerModal"/>
        </DefaultLayout>);
    }, logout: function (e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }, registerStart: function (e) {
        e.preventDefault();
        this.refs.registerModal.show();
    }, registerConfirm: function (user) {
        this.refs.body.registerConfirm(user);
    }
});
module.exports = ClaimEditView;