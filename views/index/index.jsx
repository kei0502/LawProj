var React = require('react'), $ = require('jquery'), DefaultLayout = require('../layouts/default.jsx'), LoginModal = require('../modals/login.jsx'), RegisterModal = require('../modals/register.jsx'), VisitorNavbar = require('../navbars/visitor.jsx'), CreditorNavbar = require('../navbars/creditor.jsx'), AdminNavbar = require('../navbars/admin.jsx'), CompanyNavbar = require('../navbars/company.jsx'), AccountNavbar = require('../navbars/accountant.jsx'), VisitorSidebar = require('../sidebars/visitor.jsx'), CreditorSidebar = require('../sidebars/creditor.jsx'), AdminSidebar = require('../sidebars/admin.jsx'), CompanySidebar = require('../sidebars/company.jsx'), AccountantSidebar = require('../sidebars/accountant.jsx');
var Index = React.createClass({
    getDefaultProps: function () {
        return {user: {role: 0}};
    }, getInitialState: function () {
        return {role: this.props.user.role, name: this.props.user.username}
    }, render: function () {
        var navbar, sidebar;
        switch (this.state.role) {
            case 0:
                navbar = (<VisitorNavbar login={this.loginStart} register={this.registerStart}/>);
                sidebar = (<VisitorSidebar/>);
                break;
            case 1:
                navbar = (<CreditorNavbar name={this.state.name} logout={this.logout}/>);
                sidebar = (<CreditorSidebar/>);
                break;
            case 2:
                navbar = (<AdminNavbar name={this.state.name} logout={this.logout}/>);
                sidebar = (<AdminSidebar/>);
                break;
            case 3:
                navbar = (<CompanyNavbar name={this.state.name} logout={this.logout}/>);
                sidebar = (<CompanySidebar/>);
                break;
            case 4:
                navbar = (<AccountNavbar name={this.state.name} logout={this.logout}/>);
                sidebar = (<AccountantSidebar/>);
                break;
        }
        return (<DefaultLayout navbar={navbar} sidebar={sidebar}>
            <LoginModal confirm={this.loginConfirm} ref="loginModal"/>
            <RegisterModal confirm={this.registerConfirm} ref="registerModal"/>
        </DefaultLayout>);
    }, loginStart: function (e) {
        e.preventDefault();
        this.refs.loginModal.show();
    }, loginConfirm: function (user) {
        this.setState({role: user.role, name: user.username});
        if (user.role == 2) {
            location.href = "/company/management";
        }
    }, registerStart: function (e) {
        e.preventDefault();
        this.refs.registerModal.show();
    }, registerConfirm: function (user) {
        this.setState({role: user.role, name: user.username});
    }, logout: function (e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            this.setState({role: 0, name: undefined});
        }.bind(this));
    }
});
module.exports = Index;