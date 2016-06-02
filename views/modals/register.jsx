import React from 'react';
import {Modal, Alert} from 'antd';
import RegisterForm from '../forms/register.jsx';
import $ from 'jquery';
import bcrypt from 'bcrypt';
const LoginModal = React.createClass({
    getInitialState(){
        return {visible: false};
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
            $.ajax('/users/register?username=' + encodeURIComponent(values.username), {
                success: data=> {
                    var salt1 = data.salt1;
                    bcrypt.hash(values.password, salt1, (err, hash)=> {
                        if (err) {
                            console.log(err);
                            this.setState({confirmLoading: false});
                        } else {
                            $.ajax('/users/register', {
                                method: 'POST',
                                data: {username: values.username, name: values.name, salt1: salt1, password: hash},
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
                }, error: xhr=> {
                    if (xhr.status) {
                        this.setState({confirmLoading: false, message: xhr.responseJSON.error});
                    }
                }
            });
        });
    }, render(){
        var alert = this.state.message ? <Alert message={this.state.message} type="error"/> : undefined;
        return (<Modal title="注册" visible={this.state.visible} onOk={this.handleSubmit}
                       confirmLoading={this.state.confirmLoading} onCancel={this.hide}>
            {alert}
            <RegisterForm ref="form"/>
        </Modal>);
    }
});
export default LoginModal;