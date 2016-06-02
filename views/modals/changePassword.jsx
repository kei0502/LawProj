import React from 'react';
import {Modal, Alert} from 'antd';
import ChangePasswordForm from '../forms/changePassword';
import $ from 'jquery';
import bcrypt from 'bcrypt';
const ChangePasswordModal = React.createClass({
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
            $.ajax('/users/changePassword', {
                success: data=> {
                    var salt1 = data.salt1, salt2 = data.salt2;
                    bcrypt.hash(values.oldPassword, salt1, (err, hash)=> {
                        if (err) {
                            console.log(err);
                            this.setState({confirmLoading: false});
                        } else {
                            bcrypt.hash(hash, salt2, (err, hash1)=> {
                                if (err) {
                                    console.log(err);
                                    this.setState({confirmLoading: false});
                                } else {
                                    bcrypt.hash(values.password, salt1, (err, hash2)=> {
                                        if (err) {
                                            console.log(err);
                                            this.setState({confirmLoading: false});
                                        }
                                        $.ajax('/users/changePassword', {
                                            method: 'POST',
                                            data: {salt1: salt1, salt2: salt2, hash1: hash1, hash2: hash2},
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
                                                    this.setState({
                                                        confirmLoading: false,
                                                        message: xhr.responseJSON.error
                                                    });
                                                }
                                            }
                                        });
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
        return (<Modal title="修改个人信息" visible={this.state.visible} confirmLoading={this.state.confirmLoading}
                       onOk={this.handleSubmit} onCancel={this.hide}>
            {alert}
            <ChangePasswordForm ref="form"/>
        </Modal>);
    }
});
export default ChangePasswordModal;