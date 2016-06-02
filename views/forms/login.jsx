import React from 'react';
import {Modal, Form, Input} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;

let LoginForm = React.createClass({
    render() {
        const {getFieldProps} = this.props.form;
        const usernameProps = getFieldProps('username', {
            rules: [{
                required: true,
                whitespace: true,
                min: 6,
                message: '用户名至少为 6 个字符'
            }]
        });
        const passwordProps = getFieldProps('password', {
            rules: [{
                required: true,
                whitespace: true,
                min: 6,
                message: '密码至少为6个字符'
            }]
        });
        const formItemLayout = {labelCol: {span: 6}, wrapperCol: {span: 14}};
        return (<Form horizontal form={this.props.form}>
            <FormItem {...formItemLayout} label="用户名：" hasFeedback>
                <Input {...usernameProps} placeholder="请输入用户名"/>
            </FormItem>
            <FormItem {...formItemLayout} label="密码：" hasFeedback>
                <Input {...passwordProps} type="password" placeholder="请输入密码" autoComplete="off"/>
            </FormItem>
        </Form>);
    }
});

LoginForm = createForm()(LoginForm);
export default LoginForm;