var React = require('react'), DefaultLayout = require('../../layouts/default.jsx'), AdminNavbar = require('../../navbars/admin.jsx'), AdminSidebar = require('../../sidebars/admin.jsx'), CompanyManagementBody = require('./body.jsx'), AddCompanyModal = require('../../modals/addCompany.jsx'), $ = require('jquery');
var CompanyManagementView = React.createClass({
    render: function () {
        var navbar = (<AdminNavbar name={this.props.user.name} logout={this.logout}/>), sidebar = (
            <AdminSidebar/>), main = (
            <CompanyManagementBody addCompany={this.addCompanyStart} companies={this.props.companies} ref="body"/>);
        return (<DefaultLayout navbar={navbar} sidebar={sidebar} main={main}>
            <AddCompanyModal ref="addCompanyModal" confirm={this.addCompanyConfirm}/>
        </DefaultLayout>);
    }, logout: function (e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }, addCompanyStart: function (e) {
        e.preventDefault();
        this.refs.addCompanyModal.show();
    }, addCompanyConfirm: function (company) {
        this.refs.body.addCompany(company);
    }
});
module.exports = CompanyManagementView;