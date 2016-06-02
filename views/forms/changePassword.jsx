import React from 'react';
import {Form, Input} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
let ChangePasswordForm = React.createClass({
    checkPass(rule, value, callback){
        const {validateFields}=this.props.form;
        if (value) {
            validateFields(['repeat'], {force: true});
        }
        callback();
    }, checkPass2(rule, value, callback){
        const {getFieldValue}=this.props.form;
        if (value && value !== getFieldValue('password')) {
            callback('密码不一致');
        } else {
            callback();
        }
    }, render() {
        const {getFieldProps} = this.props.form;
        const oldPasswordProps = getFieldProps('oldPassword', {
            rules: [{required: true, whitespace: true, min: 6, message: '密码至少为6个字符'}]
        });
        const passwordProps = getFieldProps('password', {
            rules: [{
                required: true,
                whitespace: true,
                min: 6,
                message: '密码至少为6个字符'
            }, {validator: this.checkPass}]
        });
        const repeatProps = getFieldProps('repeat', {
            rules: [{
                required: true,
                whitespace: true,
                message: '请再次输入密码'
            }, {validator: this.checkPass2}]
        });
        const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 14}};
        return (<Form horizontal form={this.props.form}>
            <FormItem {...formItemLayout} label="原始密码：" hasFeedback>
                <Input {...oldPasswordProps} type="password" placeholder="请输入原始密码" autoComplete="off"/>
            </FormItem>
            <FormItem {...formItemLayout} label="新密码：" hasFeedback>
                <Input {...passwordProps} type="password" placeholder="请输入新密码" autoComplete="off"/>
            </FormItem>
            <FormItem {...formItemLayout} label="密码确认：" hasFeedback>
                <Input {...repeatProps} type="password" placeholder="请再次输入密码" autoComplete="off"/>
            </FormItem>
        </Form>);
    }
});

ChangePasswordForm = createForm()(ChangePasswordForm);
export default ChangePasswordForm;