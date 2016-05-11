(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    DefaultLayout = require('../layouts/default.jsx'),
    LoginModal = require('../modals/login.jsx'),
    RegisterModal = require('../modals/register.jsx'),
    VisitorNavbar = require('../navbars/visitor.jsx'),
    CreditorNavbar = require('../navbars/creditor.jsx'),
    AdminNavbar = require('../navbars/admin.jsx'),
    CompanyNavbar = require('../navbars/company.jsx'),
    AccountNavbar = require('../navbars/accountant.jsx'),
    VisitorSidebar = require('../sidebars/visitor.jsx'),
    CreditorSidebar = require('../sidebars/creditor.jsx'),
    AdminSidebar = require('../sidebars/admin.jsx'),
    CompanySidebar = require('../sidebars/company.jsx'),
    AccountantSidebar = require('../sidebars/accountant.jsx');
var Index = React.createClass({
    displayName: 'Index',

    getDefaultProps: function getDefaultProps() {
        return { user: { role: 0 } };
    }, getInitialState: function getInitialState() {
        return { role: this.props.user.role, name: this.props.user.name };
    }, render: function render() {
        var navbar, sidebar;
        switch (this.state.role) {
            case 0:
                navbar = React.createElement(VisitorNavbar, { login: this.loginStart, register: this.registerStart });
                sidebar = React.createElement(VisitorSidebar, null);
                break;
            case 1:
                navbar = React.createElement(CreditorNavbar, { name: this.state.name, logout: this.logout });
                sidebar = React.createElement(CreditorSidebar, null);
                break;
            case 2:
                navbar = React.createElement(AdminNavbar, { name: this.state.name, logout: this.logout });
                sidebar = React.createElement(AdminSidebar, null);
                break;
            case 3:
                navbar = React.createElement(CompanyNavbar, { name: this.state.name, logout: this.logout });
                sidebar = React.createElement(CompanySidebar, null);
                break;
            case 4:
                navbar = React.createElement(AccountNavbar, { name: this.state.name, logout: this.logout });
                sidebar = React.createElement(AccountantSidebar, null);
                break;
        }
        return React.createElement(
            DefaultLayout,
            { navbar: navbar, sidebar: sidebar },
            React.createElement(LoginModal, { confirm: this.loginConfirm, ref: 'loginModal' }),
            React.createElement(RegisterModal, { confirm: this.registerConfirm, ref: 'registerModal' })
        );
    }, loginStart: function loginStart(e) {
        e.preventDefault();
        this.refs.loginModal.show();
    }, loginConfirm: function loginConfirm(user) {
        this.setState({ role: user.role, name: user.name });
        if (user.role == 2) {
            location.href = "/company/management";
        }
    }, registerStart: function registerStart(e) {
        e.preventDefault();
        this.refs.registerModal.show();
    }, registerConfirm: function registerConfirm(user) {
        this.setState({ role: user.role, name: user.name });
    }, logout: function logout(e) {
        e.preventDefault();
        $.get("/users/logout", (function () {
            this.setState({ role: 0, name: undefined });
        }).bind(this));
    }
});
module.exports = Index;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../layouts/default.jsx":3,"../modals/login.jsx":5,"../modals/register.jsx":6,"../navbars/accountant.jsx":7,"../navbars/admin.jsx":8,"../navbars/company.jsx":9,"../navbars/creditor.jsx":10,"../navbars/visitor.jsx":11,"../sidebars/accountant.jsx":12,"../sidebars/admin.jsx":13,"../sidebars/company.jsx":14,"../sidebars/creditor.jsx":15,"../sidebars/visitor.jsx":16}],2:[function(require,module,exports){
(function (global){
/**
 * Created by gyz on 16/5/4.
 */
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null),
    Index = require('./index.jsx');
module.exports = function (data, containerId) {
  var container = document.getElementById(containerId || 'container');
  ReactDOM.render(React.createElement(Index, data), container);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./index.jsx":1}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultModal = require('./default.jsx'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    bcrypt = (typeof window !== "undefined" ? window['dcodeIO']['bcrypt'] : typeof global !== "undefined" ? global['dcodeIO']['bcrypt'] : null);
var LoginModal = React.createClass({
    displayName: 'LoginModal',

    getInitialState: function getInitialState() {
        return { username: '', password: '', message: '' };
    }, render: function render() {
        return React.createElement(
            DefaultModal,
            { name: 'login', title: '登录', ref: 'modal', confirm: this.confirm },
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'usernameInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '用户名'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'usernameInput',
                            placeholder: '请输入用户名', value: this.state.username, onChange: this.onUsernameChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'passwordInput',
                            className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '密码'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'passwordInput',
                            placeholder: '请输入密码', value: this.state.password, onChange: this.onPasswordChange })
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
        e.preventDefault();
        var username = this.state.username,
            password = this.state.password;
        if (username.length < 6) {
            this.setState({ message: "用户名长度至少6位" });
        } else if (password.length < 6) {
            this.setState({ message: "密码长度至少6位" });
        } else {
            $.ajax('/users/login?username=' + encodeURIComponent(username), {
                success: (function (data) {
                    var salt1 = data.salt1,
                        salt2 = data.salt2;
                    bcrypt.hash(password, salt1, (function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            bcrypt.hash(hash, salt2, (function (err, hash) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    $.ajax('/users/login', {
                                        method: 'POST',
                                        data: { username: username, salt1: salt1, salt2: salt2, hash: hash },
                                        success: (function (data) {
                                            if (this.props.confirm) {
                                                this.props.confirm(data);
                                            }
                                            this.hide();
                                            this.setState({ username: "", password: "", message: "" });
                                        }).bind(this),
                                        error: (function (xhr) {
                                            if (xhr.statusCode) {
                                                this.setState({ message: xhr.responseJSON.error });
                                            }
                                        }).bind(this)
                                    });
                                }
                            }).bind(this));
                        }
                    }).bind(this));
                }).bind(this), error: (function (xhr) {
                    if (xhr.statusCode) {
                        this.setState({ message: xhr.responseJSON.error });
                    }
                }).bind(this)
            });
        }
    }, onUsernameChange: function onUsernameChange(e) {
        this.setState({ username: e.target.value });
    }, onPasswordChange: function onPasswordChange(e) {
        this.setState({ password: e.target.value });
    }
});
module.exports = LoginModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./default.jsx":4}],6:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    DefaultModal = require('./default.jsx'),
    bcrypt = (typeof window !== "undefined" ? window['dcodeIO']['bcrypt'] : typeof global !== "undefined" ? global['dcodeIO']['bcrypt'] : null);
var RegisterModal = React.createClass({
    displayName: 'RegisterModal',

    getInitialState: function getInitialState() {
        return { username: "", name: "", password: "", repeat: "", message: "", salt: "" };
    },
    render: function render() {
        return React.createElement(
            DefaultModal,
            { name: 'register', title: '注册', ref: 'modal', confirm: this.confirm },
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newusernameInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '用户名'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'newusernameInput', placeholder: '请输入用户名(长度至少6位以上)',
                            value: this.state.username, onChange: this.onUsernameChange,
                            onBlur: this.onUsernameBlur })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newnameInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '真实姓名'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'newnameInput', placeholder: '真实姓名',
                            value: this.state.name, onChange: this.onNameChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newpasswordInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '密码'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'newpasswordInput',
                            placeholder: '请输入密码(长度至少6位以上)',
                            value: this.state.password, onChange: this.onPasswordChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newpassword2Input', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '确认密码'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'newpassword2Input', placeholder: '请再输入一次密码',
                            value: this.state.repeat, onChange: this.onRepeatChange })
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
        e.preventDefault();
        var username = this.state.username,
            name = this.state.name,
            password = this.state.password,
            repeat = this.state.repeat,
            salt = this.state.salt;
        if (username.length < 6) {
            this.setState({ password: "", repeat: "", message: "用户名长度至少6位" });
        } else if (!name) {
            this.setState({ password: "", repeat: "", message: "真实姓名不能为空" });
        } else if (password.length < 6) {
            this.setState({ password: "", repeat: "", message: "密码长度至少6位" });
        } else if (password !== repeat) {
            this.setState({ password: "", repeat: "", message: "密码确认不一致" });
        } else if (!salt) {
            this.setState({ password: "", repeat: "", message: "用户名已存在" });
        } else {
            bcrypt.hash(password, salt, (function (err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    $.ajax("users/register", {
                        method: "POST",
                        data: { username: username, name: name, password: hash, salt1: salt },
                        success: (function (data) {
                            if (this.props.confirm) {
                                this.props.confirm(data);
                            }
                            this.hide();
                            this.setState({ username: "", name: "", password: "", repeat: "", message: "", salt: "" });
                        }).bind(this),
                        error: (function (xhr) {
                            if (xhr.status) {
                                this.setState({ password: "", repeat: "", message: xhr.responseJSON.error });
                            }
                        }).bind(this)
                    });
                }
            }).bind(this));
        }
    }, onUsernameChange: function onUsernameChange(e) {
        var username = e.target.value;
        this.setState({ username: username, message: username.length < 6 ? "用户名长度至少6位" : "" });
    }, onNameChange: function onNameChange(e) {
        this.setState({ name: e.target.value });
    }, onUsernameBlur: function onUsernameBlur(e) {
        var username = e.target.value;
        if (username.length < 6) {
            this.setState({ message: "用户名长度至少6位" });
        } else {
            $.ajax("/users/register?username=" + encodeURIComponent(username), {
                success: (function (data) {
                    this.setState({ salt: data.salt1, message: "" });
                }).bind(this), error: (function (xhr) {
                    if (xhr.status) {
                        this.setState({ message: xhr.responseJSON.error });
                    }
                }).bind(this)
            });
        }
    }, onPasswordChange: function onPasswordChange(e) {
        var password = e.target.value;
        this.setState({
            password: password,
            message: password.length < 6 ? "密码长度至少6位" : password == this.state.repeat ? "" : "密码确认不一致"
        });
    }, onRepeatChange: function onRepeatChange(e) {
        var repeat = e.target.value;
        this.setState({ repeat: repeat, message: this.state.password == repeat ? "" : "密码确认不一致" });
    }
});
module.exports = RegisterModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./default.jsx":4}],7:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AccountantNavbar = React.createClass({
    displayName: "AccountantNavbar",

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
module.exports = AccountantNavbar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
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
},{}],9:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CompanyNavbar = React.createClass({
    displayName: "CompanyNavbar",

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
module.exports = CompanyNavbar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],10:[function(require,module,exports){
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
},{}],11:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var VisitorNavbar = React.createClass({
    displayName: "VisitorNavbar",

    render: function render() {
        return React.createElement(
            "ul",
            { className: "nav navbar-nav navbar-right" },
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "#", "data-toggle": "modal", onClick: this.props.login },
                    React.createElement("span", {
                        className: "glyphicon glyphicon-log-in" }),
                    " 登录"
                )
            ),
            React.createElement(
                "li",
                null,
                React.createElement(
                    "a",
                    { href: "#", "data-toggle": "modal", onClick: this.props.register },
                    React.createElement("span", {
                        className: "glyphicon glyphicon-edit" }),
                    " 注册"
                )
            )
        );
    }
});
module.exports = VisitorNavbar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],12:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var AccountantSidebar = React.createClass({
    displayName: "AccountantSidebar",

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
                    "债权申请审核"
                )
            )
        );
    }
});
module.exports = AccountantSidebar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CompanySidebar = React.createClass({
    displayName: "CompanySidebar",

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
                    "债权申请审核"
                )
            )
        );
    }
});
module.exports = CompanySidebar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],15:[function(require,module,exports){
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
},{}],16:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var VisitorSidebar = React.createClass({
    displayName: "VisitorSidebar",

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
            )
        );
    }
});
module.exports = VisitorSidebar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2])(2)
});