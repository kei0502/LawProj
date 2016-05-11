(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DataTable = (typeof window !== "undefined" ? window['ReactDataComponents'] : typeof global !== "undefined" ? global['ReactDataComponents'] : null).DataTable;
var CompanyManagementBody = React.createClass({
    displayName: 'CompanyManagementBody',

    getInitialState: function getInitialState() {
        return { companies: this.props.companies, selectState: "0" };
    },
    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                '破产企业管理'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-2' },
                    React.createElement(
                        'button',
                        { className: 'btn btn-primary', 'data-toggle': 'modal', onClick: this.props.addCompany },
                        '新增企业信息'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-sm-10' },
                    React.createElement(
                        'form',
                        { className: 'form-horizontal' },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'col-sm-2 control-label', htmlFor: 'selectState' },
                                '筛选'
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-10' },
                                React.createElement(
                                    'select',
                                    { id: 'selectState', className: 'form-control', value: this.state.selectState,
                                        onChange: this.onSelectStateChange },
                                    React.createElement(
                                        'option',
                                        { value: '0' },
                                        '所有'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '1' },
                                        '债权申请中'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '2' },
                                        '已截止申请,但仍有债权申请未处理完成'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '3' },
                                        '已截止申请,等待安排投票'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '4' },
                                        '已截止投票,等待线下结果'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '5' },
                                        '已完成'
                                    ),
                                    React.createElement(
                                        'option',
                                        { value: '6' },
                                        '已关闭'
                                    )
                                )
                            )
                        )
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(DataTable, { keys: '_id', columns: [{ title: '#', prop: 'cid' }, { title: '公司名称', prop: 'name' }, {
                            title: '会计师', render: function render(val, row) {
                                return row.validator_accountant.map(function (user) {
                                    return user.username;
                                }).join(React.createElement('br', null));
                            }, sortable: false
                        }, { title: '申请截止日期', prop: 'expire' }, { title: '投票日期', prop: 'vote' }, { title: '状态', prop: 'state' }, {
                            title: '操作', render: function render(val, row) {
                                return React.createElement(
                                    'a',
                                    { href: '#', className: 'label label-success' },
                                    '安排投票'
                                );
                            }, sortable: false
                        }], initialData: this.state.companies, initialPageLength: 10,
                        initialSortBy: { prop: '_id', order: 'descending' }, pageLengthOptions: [5, 10, 50] })
                )
            )
        );
    }, onSelectStateChange: function onSelectStateChange(e) {
        this.setState({ selectState: value });
    }, addCompany: function addCompany(company) {
        var companies = this.state.companies.concat(company);
        this.setState({ companies: companies });
    }
});
module.exports = CompanyManagementBody;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],2:[function(require,module,exports){
(function (global){
/**
 * Created by gyz on 16/5/4.
 */
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null),
    View = require('./view.jsx');
module.exports = function (data, containerId) {
  var container = document.getElementById(containerId || 'container');
  ReactDOM.render(React.createElement(View, data), container);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./view.jsx":3}],3:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultLayout = require('../../layouts/default.jsx'),
    AdminNavbar = require('../../navbars/admin.jsx'),
    AdminSidebar = require('../../sidebars/admin.jsx'),
    CompanyManagementBody = require('./body.jsx'),
    AddCompanyModal = require('../../modals/addCompany.jsx'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var CompanyManagementView = React.createClass({
    displayName: 'CompanyManagementView',

    render: function render() {
        var navbar = React.createElement(AdminNavbar, { name: this.props.user.name, logout: this.logout }),
            sidebar = React.createElement(AdminSidebar, null),
            main = React.createElement(CompanyManagementBody, { addCompany: this.addCompanyStart, companies: this.props.companies, ref: 'body' });
        return React.createElement(
            DefaultLayout,
            { navbar: navbar, sidebar: sidebar, main: main },
            React.createElement(AddCompanyModal, { ref: 'addCompanyModal', confirm: this.addCompanyConfirm })
        );
    }, logout: function logout(e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }, addCompanyStart: function addCompanyStart(e) {
        e.preventDefault();
        this.refs.addCompanyModal.show();
    }, addCompanyConfirm: function addCompanyConfirm(company) {
        this.refs.body.addCompany(company);
    }
});
module.exports = CompanyManagementView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../layouts/default.jsx":4,"../../modals/addCompany.jsx":5,"../../navbars/admin.jsx":7,"../../sidebars/admin.jsx":8,"./body.jsx":1}],4:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var DefaultLayout = React.createClass({
    displayName: "DefaultLayout",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "nav",
                { className: "navbar navbar-inverse navbar-fixed-top" },
                React.createElement(
                    "div",
                    { className: "container-fluid" },
                    React.createElement(
                        "div",
                        { className: "navbar-header" },
                        React.createElement(
                            "button",
                            { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse",
                                "data-target": "#navbar",
                                "aria-expanded": "false", "aria-controls": "navbar" },
                            React.createElement(
                                "span",
                                { className: "sr-only" },
                                "Toggle navigation"
                            ),
                            React.createElement("span", { className: "icon-bar" }),
                            React.createElement("span", { className: "icon-bar" }),
                            React.createElement("span", { className: "icon-bar" })
                        ),
                        React.createElement(
                            "a",
                            { className: "navbar-brand", href: "#" },
                            "法务原型"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "navbar-collapse collapse" },
                        this.props.navbar
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-sm-3 col-md-2 sidebar" },
                        this.props.sidebar
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" },
                this.props.main
            ),
            this.props.children
        );
    }
});
module.exports = DefaultLayout;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultModal = require('./default.jsx'),
    DateTimeField = (typeof window !== "undefined" ? window['ReactBootstrapDatetimepicker'] : typeof global !== "undefined" ? global['ReactBootstrapDatetimepicker'] : null),
    moment = (typeof window !== "undefined" ? window['moment'] : typeof global !== "undefined" ? global['moment'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var AddCompanyModal = React.createClass({
    displayName: 'AddCompanyModal',

    getInitialState: function getInitialState() {
        var format = "YYYY-MM-DD",
            current = moment(),
            date = current.format(format);
        return {
            cid: "",
            name: "",
            format: format,
            current: current,
            date: date,
            message: "",
            create: date,
            settlement: date,
            expire: date
        };
    }, render: function render() {
        return React.createElement(
            DefaultModal,
            { name: 'addCompany', title: '新增企业信息', ref: 'modal', confirm: this.confirm },
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 col-sm-offset-1 control-label', htmlFor: 'inputCidAdd' },
                        '公司编号'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { id: 'inputCidAdd', type: 'text', className: 'form-control', placeholder: '公司编号',
                            value: this.state.cid, onChange: this.onCidChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 col-sm-offset-1 control-label', htmlFor: 'inputNameAdd' },
                        '公司名称'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { id: 'inputNameAdd', type: 'text', className: 'form-control', placeholder: '公司名称',
                            value: this.state.name, onChange: this.onNameChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 col-sm-offset-1 control-label', htmlFor: 'inputCreateAdd' },
                        '创建日期'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement(DateTimeField, { dateTime: this.state.date, format: this.state.format,
                            inputFormat: this.state.format, mode: 'date',
                            inputProps: { id: 'inputCreateAdd', className: 'form-control' },
                            onChange: this.onCreateChange, maxDate: this.state.current })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 col-sm-offset-1 control-label', htmlFor: 'inputSettlementAdd' },
                        '结算日期'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement(DateTimeField, { dateTime: this.state.date, format: this.state.format,
                            inputFormat: this.state.format, mode: 'date',
                            inputProps: { id: 'inputSettlementAdd', className: 'form-control' },
                            onChange: this.onSettlementChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-2 col-sm-offset-1 control-label', htmlFor: 'inputExpireAdd' },
                        '申请截止'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement(DateTimeField, { dateTime: this.state.date, format: this.state.format,
                            inputFormat: this.state.format, mode: 'date',
                            inputProps: { id: 'inputExpireAdd', className: 'form-control' },
                            onChange: this.onExpireChange, minDate: this.state.current })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-12 text-center text-danger' },
                        this.state.message
                    )
                )
            )
        );
    }, hide: function hide() {
        this.refs.modal.hide();
    }, show: function show() {
        this.refs.modal.show();
    }, confirm: function confirm(e) {
        if (!this.state.cid) {
            this.setState({ message: "公司编号不能为空" });
        } else if (!this.state.name) {
            this.setState({ message: "公司名称不能为空" });
        } else {
            $.ajax("/companies", {
                method: 'POST',
                data: {
                    cid: this.state.cid,
                    name: this.state.name,
                    create: this.state.create,
                    settlement: this.state.settlement,
                    expire: this.state.expire
                }, success: (function (data) {
                    if (this.props.confirm) {
                        this.props.confirm(data);
                    }
                    this.hide();
                    this.setState({ cid: "", name: "", message: "" });
                }).bind(this), error: (function (xhr) {
                    if (xhr.status) {
                        this.setState({ message: xhr.responseJSON.error });
                    }
                }).bind(this)
            });
        }
    }, onCidChange: function onCidChange(e) {
        this.setState({ cid: e.target.value });
    }, onNameChange: function onNameChange(e) {
        this.setState({ name: e.target.value });
    }, onCreateChange: function onCreateChange(x) {
        this.setState({ create: x });
    }, onSettlementChange: function onSettlementChange(x) {
        this.setState({ settlement: x });
    }, onExpireChange: function onExpireChange(x) {
        this.setState({ expire: x });
    }
});
module.exports = AddCompanyModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./default.jsx":6}],6:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var DefaultModal = React.createClass({
    displayName: 'DefaultModal',

    show: function show() {
        $(this.refs.root).modal('show');
    }, hide: function hide() {
        $(this.refs.root).modal('hide');
    }, render: function render() {
        return React.createElement(
            'div',
            { className: 'modal fade', id: this.props.name + "Modal", tabIndex: '-1', role: 'dialog',
                'aria-labelledby': this.props.name + "ModalLabel", ref: 'root' },
            React.createElement(
                'div',
                { className: 'modal-dialog', role: 'document' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            React.createElement(
                                'span',
                                {
                                    'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title', id: this.props.name + "ModalLabel" },
                            this.props.title
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        this.props.children
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary', onClick: this.props.confirm },
                            '确定'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            '关闭'
                        )
                    )
                )
            )
        );
    }
});
module.exports = DefaultModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AdminNavbar = React.createClass({
    displayName: "AdminNavbar",

    getInitialState: function getInitialState() {
        return { expanded: false };
    }, render: function render() {
        return React.createElement(
            "ul",
            { className: "nav navbar-nav navbar-right" },
            React.createElement(
                "li",
                { className: this.state.expanded ? "dropdown open" : "dropdown" },
                React.createElement(
                    "a",
                    { className: "dropdown-toggle", role: "button", "aria-haspopup": "true",
                        "aria-expanded": this.state.expanded, href: "#", onClick: this.expand },
                    React.createElement("span", {
                        className: "glyphicon glyphicon-user" }),
                    " ",
                    this.props.name
                ),
                React.createElement(
                    "ul",
                    { className: "dropdown-menu" },
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.props.logout },
                            React.createElement("span", { className: "glyphicon glyphicon-log-out" }),
                            " 退出"
                        )
                    )
                )
            )
        );
    }, expand: function expand(e) {
        e.preventDefault();
        this.setState({ expanded: !this.state.expanded });
    }
});
module.exports = AdminNavbar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AdminSidebar = React.createClass({
    displayName: "AdminSidebar",

    getDefaultProps: function getDefaultProps() {
        return { selected: 1 };
    },
    render: function render() {
        return React.createElement(
            "ul",
            { className: "nav nav-sidebar" },
            React.createElement(
                "li",
                { className: this.props.selected === 1 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "#" },
                    "破产企业管理"
                )
            ),
            React.createElement(
                "li",
                { className: this.props.selected === 2 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "#" },
                    "债权申请管理"
                )
            )
        );
    }
});
module.exports = AdminSidebar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2])(2)
});