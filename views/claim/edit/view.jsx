var React = require('react'), DefaultLayout = require('../../layouts/default.jsx'), CreditorNavbar = require('../../navbars/creditor.jsx'), CreditorSidebar = require('../../sidebars/creditor.jsx'), ClaimEditBody = require('./body.jsx'), RegisterModal = require('../../modals/register.jsx'), InterestModal = require('../../modals/interest.jsx'), $ = require('jquery');
var ClaimEditView = React.createClass({
    getInitialState: function () {
        if (this.props.claim) {
            var claim = this.props.claim;
            if (claim.interest) {
                return {
                    principal: claim.principal,
                    start: claim.interest.start,
                    calculate: claim.interest.calculate,
                    amount: claim.interest.amount
                };
            } else {
                return {principal: claim.principal};
            }
        } else {
            return {principal: 0};
        }
    }, render: function () {
        var navbar = (<CreditorNavbar name={this.props.user.name} logout={this.logout}/>), sidebar = (
            <CreditorSidebar selected={this.props.claim?2:1}/>), body = (
            <ClaimEditBody {...this.props} registerStart={this.registerStart} interestStart={this.interestStart}
                                           onPrincipal={this.onPrincipal} ref="body"/>);
        return (<DefaultLayout navbar={navbar} sidebar={sidebar} main={body}>
            <RegisterModal confirm={this.registerConfirm} ref="registerModal"/>
            <InterestModal principal={this.state.principal} start={this.state.start} amount={this.state.amount}
                           end={this.props.settlement} confirm={this.interestConfirm} ref="interestModal"/>
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
    }, onPrincipal: function (principal) {
        this.refs.interestModal.onPrincipal(principal);
    }, interestStart: function (principal) {
        this.refs.interestModal.show();
    }, interestConfirm: function (interest) {
        this.refs.body.onInterest(interest);
    }
});
module.exports = ClaimEditView;