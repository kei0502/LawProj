(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    CompanyApplyCompanyList = require('./companyList.jsx');
var CompanyApplyView = React.createClass({
    displayName: 'CompanyApplyView',

    render: function render() {
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                '添加债券申请表'
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-sm-12' },
                    React.createElement(
                        'div',
                        { className: 'header' },
                        '选择债务公司'
                    )
                )
            ),
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(CompanyApplyCompanyList, { companies: this.props.companies })
            )
        );
    }
});
module.exports = CompanyApplyView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./companyList.jsx":2}],2:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    CompanyApplyCompanyListElement = require('./companyListElement.jsx');
var CompanyApplyCompanyList = React.createClass({
    displayName: 'CompanyApplyCompanyList',

    render: function render() {
        var elements = this.props.companies.map(function (companies) {
            return React.createElement(CompanyApplyCompanyListElement, companies);
        });
        return React.createElement(
            'ul',
            { className: 'col-sm-12 company-list company-list-create' },
            elements
        );
    }
});
module.exports = CompanyApplyCompanyList;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./companyListElement.jsx":3}],3:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CompanyApplyCompanyListElement = React.createClass({
    displayName: "CompanyApplyCompanyListElement",

    render: function render() {
        return React.createElement(
            "li",
            { className: "col-sm-4 col-md-3" },
            React.createElement(
                "a",
                { href: "/claim/add?companyId=" + this.props._id },
                this.props.name
            ),
            React.createElement(
                "span",
                {
                    className: "date" },
                this.props.expire
            )
        );
    }
});
module.exports = CompanyApplyCompanyListElement;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],4:[function(require,module,exports){
(function (global){
/**
 * Created by gyz on 16/5/10.
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
},{"./view.jsx":5}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultLayout = require('../../layouts/default.jsx'),
    CreditorNavbar = require('../../navbars/creditor.jsx'),
    CreditorSidebar = require('../../sidebars/creditor.jsx'),
    CompanyApplyBody = require('./body.jsx'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var CompanyApplyView = React.createClass({
    displayName: 'CompanyApplyView',

    render: function render() {
        var navbar = React.createElement(CreditorNavbar, { name: this.props.user.name, logout: this.logout }),
            sidebar = React.createElement(CreditorSidebar, { selected: 1 }),
            body = React.createElement(CompanyApplyBody, { companies: this.props.companies });
        return React.createElement(DefaultLayout, { navbar: navbar, sidebar: sidebar, main: body });
    }, logout: function logout(e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }
});
module.exports = CompanyApplyView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../layouts/default.jsx":6,"../../navbars/creditor.jsx":7,"../../sidebars/creditor.jsx":8,"./body.jsx":1}],6:[function(require,module,exports){
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
                            { className: "navbar-brand", href: "/" },
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
},{}],7:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CreditorNavbar = React.createClass({
    displayName: "CreditorNavbar",

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
module.exports = CreditorNavbar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CreditorSidebar = React.createClass({
    displayName: "CreditorSidebar",

    getDefaultProps: function getDefaultProps() {
        return { selected: 0 };
    },
    render: function render() {
        return React.createElement(
            "ul",
            { className: "nav nav-sidebar" },
            React.createElement(
                "li",
                { className: this.props.selected === 0 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "/" },
                    "首页"
                )
            ),
            React.createElement(
                "li",
                { className: this.props.selected === 1 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "/company/apply" },
                    "添加债权申请表"
                )
            ),
            React.createElement(
                "li",
                { className: this.props.selected === 2 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "/claims/list" },
                    "查看债权申请表"
                )
            )
        );
    }
});
module.exports = CreditorSidebar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[4])(4)
});