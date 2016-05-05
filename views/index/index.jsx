var React = require('react'), DefaultLayout = require('../layouts/default.jsx'), LoginModal = require('../modals/login.jsx'), RegisterModal = require('../modals/register.jsx'), VisitorNavbar = require('../navbars/visitor.jsx'), CreditorNavbar = require('../navbars/creditor.jsx');
var Index = React.createClass({
    getDefaultProps: function () {
        return {user: {role: 0}};
    }, getInitialState: function () {
        return {role: this.props.user.role, name: this.props.user.username}
    }, render: function () {
        var navbar;
        switch (this.state.role) {
            case 0:
                navbar = (<VisitorNavbar login={this.loginStart} register={this.registerStart}/>);
                break;
            case 1:
                navbar = (<CreditorNavbar name={this.state.name}/>);
                break;
        }
        return (<DefaultLayout navbar={navbar}>
            <LoginModal confirm={this.loginConfirm} ref="loginModal"/>
            <RegisterModal confirm={this.registerConfirm} ref="registerModal"/>
        </DefaultLayout>);
    }, loginStart: function (e) {
        e.preventDefault();
        this.refs.loginModal.show();
    }, loginConfirm: function (user) {
        this.setState({role: 1, name: user.username});
    }, registerStart: function (e) {
        e.preventDefault();
        this.refs.registerModal.show();
    }, registerConfirm: function (user) {
        this.setState({role: 1, name: user.username});
    }
});
module.exports = Index;