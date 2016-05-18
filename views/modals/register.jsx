var React = require('react'), $ = require('jquery'), DefaultModal = require('./default.jsx'), bcrypt = require('bcrypt');
var RegisterModal = React.createClass({
    getInitialState: function () {
        return {username: "", name: "", password: "", repeat: "", message: "", salt: ""}
    },
    render: function () {
        return (<DefaultModal name="register" title="注册" ref="modal" confirm={this.confirm}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="newusernameInput" className="col-sm-2 col-sm-offset-1 control-label">用户名</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="newusernameInput" placeholder="请输入用户名(长度至少6位以上)"
                               value={this.state.username} onChange={this.onUsernameChange}
                               onBlur={this.onUsernameBlur}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="newnameInput" className="col-sm-2 col-sm-offset-1 control-label">真实姓名</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="newnameInput" placeholder="真实姓名"
                               value={this.state.name} onChange={this.onNameChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="newpasswordInput" className="col-sm-2 col-sm-offset-1 control-label">密码</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" id="newpasswordInput"
                               placeholder="请输入密码(长度至少6位以上)"
                               value={this.state.password} onChange={this.onPasswordChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="newpassword2Input" className="col-sm-2 col-sm-offset-1 control-label">确认密码</label>
                    <div className="col-sm-7">
                        <input type="password" className="form-control" id="newpassword2Input" placeholder="请再输入一次密码"
                               value={this.state.repeat} onChange={this.onRepeatChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-12 text-center text-danger">{this.state.message}</label>
                </div>
            </form>
        </DefaultModal>);
    }, hide: function () {
        this.refs.modal.hide();
    }, show: function () {
        this.refs.modal.show();
    }, confirm: function (e) {
        e.preventDefault();
        var username = this.state.username, name = this.state.name, password = this.state.password, repeat = this.state.repeat, salt = this.state.salt;
        if (username.length < 6) {
            this.setState({password: "", repeat: "", message: "用户名长度至少6位"});
        } else if (!name) {
            this.setState({password: "", repeat: "", message: "真实姓名不能为空"});
        } else if (password.length < 6) {
            this.setState({password: "", repeat: "", message: "密码长度至少6位"});
        } else if (password !== repeat) {
            this.setState({password: "", repeat: "", message: "密码确认不一致"});
        } else if (!salt) {
            this.setState({password: "", repeat: "", message: "用户名已存在"});
        } else {
            bcrypt.hash(password, salt, function (err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    $.ajax("/users/register", {
                        method: "POST",
                        data: {username: username, name: name, password: hash, salt1: salt},
                        success: function (data) {
                            if (this.props.confirm) {
                                this.props.confirm(data);
                            }
                            this.hide();
                            this.setState({username: "", name: "", password: "", repeat: "", message: "", salt: ""});
                        }.bind(this),
                        error: function (xhr) {
                            if (xhr.status) {
                                this.setState({password: "", repeat: "", message: xhr.responseJSON.error});
                            }
                        }.bind(this)
                    });
                }
            }.bind(this));

        }
    }, onUsernameChange: function (e) {
        var username = e.target.value;
        this.setState({username: username, message: username.length < 6 ? "用户名长度至少6位" : ""});
    }, onNameChange: function (e) {
        this.setState({name: e.target.value});
    }, onUsernameBlur: function (e) {
        var username = e.target.value;
        if (username.length < 6) {
            this.setState({message: "用户名长度至少6位"});
        } else {
            $.ajax("/users/register?username=" + encodeURIComponent(username), {
                success: function (data) {
                    this.setState({salt: data.salt1, message: ""});
                }.bind(this), error: function (xhr) {
                    if (xhr.status) {
                        this.setState({message: xhr.responseJSON.error});
                    }
                }.bind(this)
            });
        }
    }, onPasswordChange: function (e) {
        var password = e.target.value;
        this.setState({
            password: password,
            message: password.length < 6 ? "密码长度至少6位" : (password == this.state.repeat ? "" : "密码确认不一致")
        });
    }, onRepeatChange: function (e) {
        var repeat = e.target.value;
        this.setState({repeat: repeat, message: this.state.password == repeat ? "" : "密码确认不一致"});
    }
});
module.exports = RegisterModal;