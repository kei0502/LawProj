import React from 'react';
import {Modal, Alert} from 'antd';
import LoginForm from '../forms/login.jsx';
import $ from 'jquery';
import bcrypt from 'bcrypt';
const LoginModal = React.createClass({
    getDefaultProps(){
        return {visible: false};
    }, getInitialState(){
        return {visible: this.props.visible};
    }, hide(){
        this.setState({visible: false});
    }, show(){
        this.setState({visible: true});
    }, handleSubmit() {
        this.refs.form.validateFields((errors, values) => {
            if (!!errors) {
                return;
            }
            this.setState({confirmLoading: true});
            $.ajax('/users/login?username=' + encodeURIComponent(values.username), {
                success: data=> {
                    var salt1 = data.salt1, salt2 = data.salt2;
                    bcrypt.hash(values.password, salt1, (err, hash)=> {
                        if (err) {
                            console.log(err);
                            this.setState({confirmLoading: false});
                        } else {
                            bcrypt.hash(hash, salt2, (err, hash)=> {
                                if (err) {
                                    console.log(err);
                                    this.setState({confirmLoading: false});
                                } else {
                                    $.ajax('/users/login', {
                                        method: 'POST',
                                        data: {username: values.username, salt1: salt1, salt2: salt2, hash: hash},
                                        success: data=> {
                                            if (this.props.success) {
                                                this.props.success(data);
                                            }
                                            this.hide();
                                            this.setState({confirmLoading: false, message: undefined});
                                            this.refs.form.resetFields();
                                        },
                                        error: xhr=> {
                                            if (xhr.status) {
                                                this.setState({confirmLoading: false, message: xhr.responseJSON.error});
                                            }
                                        }
                                    });
                                }
                            });
                        }
                    });
                }, error: xhr=> {
                    if (xhr.status) {
                        this.setState({confirmLoading: false, message: xhr.responseJSON.error});
                    }
                }
            });
        });
    }, render(){
        var alert = this.state.message ? <Alert message={this.state.message} type="error"/> : undefined;
        return (<Modal title="登录" visible={this.state.visible} confirmLoading={this.state.confirmLoading}
                       onOk={this.handleSubmit} onCancel={this.hide}>
            {alert}
            <LoginForm ref="form"/>
        </Modal>);
    }
});
export default LoginModal;