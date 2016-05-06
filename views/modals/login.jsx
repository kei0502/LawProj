var React = require('react'), DefaultModal = require('./default.jsx'), $ = require('jquery'), bcrypt = require('bcrypt');
var LoginModal = React.createClass({
    getInitialState: function () {
        return {username: '', password: '', message: ''};
    }, render: function () {
        return (<DefaultModal name="login" title="登录" ref="modal" confirm={this.confirm}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="usernameInput" className="col-sm-2 col-sm-offset-1 control-label">用户名</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="usernameInput"
                               placeholder="请输入用户名" value={this.state.username} onChange={this.onUsernameChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="passwordInput"
                           className="col-sm-2 col-sm-offset-1 control-label">密码</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" id="passwordInput"
                               placeholder="请输入密码" value={this.state.password} onChange={this.onPasswordChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-12 text-center text-danger">{this.state.message}</label>
                </div>
            </form>
        </DefaultModal>)
    }, hide: function () {
        this.refs.modal.hide();
    }, show: function () {
        this.refs.modal.show();
    }, confirm: function (e) {
        e.preventDefault();
        var username = this.state.username, password = this.state.password;
        if (username.length < 6) {
            this.setState({message: "用户名长度至少6位"});
        } else if (password.length < 6) {
            this.setState({message: "密码长度至少6位"});
        } else {
            $.ajax('/users/login?username=' + encodeURIComponent(username), {
                success: function (data) {
                    var salt1 = data.salt1, salt2 = data.salt2;
                    bcrypt.hash(password, salt1, function (err, hash) {
                        if (err) {
                            console.log(err);
                        } else {
                            bcrypt.hash(hash, salt2, function (err, hash) {
                                if (err) {
                                    console.log(err);
                                } else {
                                    $.ajax('/users/login', {
                                        method: 'POST',
                                        data: {username: username, salt1: salt1, salt2: salt2, hash: hash},
                                        success: function (data) {
                                            if (this.props.confirm) {
                                                this.props.confirm(data);
                                            }
                                            this.hide();
                                            this.setState({username: "", password: "", message: ""});
                                        }.bind(this),
                                        error: function (xhr) {
                                            if (xhr.statusCode) {
                                                this.setState({message: xhr.responseJSON.error});
                                            }
                                        }.bind(this)
                                    })
                                }
                            }.bind(this));
                        }
                    }.bind(this));
                }.bind(this), error: function (xhr) {
                    if (xhr.statusCode) {
                        this.setState({message: xhr.responseJSON.error});
                    }
                }.bind(this)
            });
        }
    }, onUsernameChange: function (e) {
        this.setState({username: e.target.value});
    }, onPasswordChange: function (e) {
        this.setState({password: e.target.value});
    }
});
module.exports = LoginModal;