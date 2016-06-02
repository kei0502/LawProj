import React from 'react';
import {Form, Input, Col, Button} from 'antd';
const createForm = Form.create;
const FormItem = Form.Item;
let RegisterForm = React.createClass({
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
    }, getValidateCode(e){
        e.preventDefault();
        alert("验证码已发送至手机,请查收");
    }, render() {
        const {getFieldProps} = this.props.form;
        const usernameProps = getFieldProps('username', {
            rules: [{
                required: true,
                whitespace: true,
                length: 11,
                pattern: /^1[0-9]{10}$/,
                message: '必须是真实的手机号'
            }]
        });
        const nameProps = getFieldProps('name', {rules: [{required: true, whitespace: true, message: '请输入真实姓名'}]});
        const validateProps = getFieldProps('validate');
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
            <FormItem label="用户名：" hasFeedback labelCol={{span: 6}}>
                <Col span={8}>
                    <FormItem>
                        <Input {...usernameProps} placeholder="请输入手机号"/>
                    </FormItem>
                </Col>
                <Col span={5} offset={1}>
                    <Button onClick={this.getValidateCode}>获取验证码</Button>
                </Col>
            </FormItem>
            <FormItem {...formItemLayout} label="手机验证码：" hasFeedback>
                <Input {...validateProps} placeholder="请查看手机验证码"/>
            </FormItem>
            <FormItem {...formItemLayout} label="真实姓名：" hasFeedback>
                <Input {...nameProps} placeholder="请输入真实姓名"/>
            </FormItem>
            <FormItem {...formItemLayout} label="密码：" hasFeedback>
                <Input {...passwordProps} type="password" placeholder="请输入密码" autoComplete="off"/>
            </FormItem>
            <FormItem {...formItemLayout} label="密码确认：" hasFeedback>
                <Input {...repeatProps} type="password" placeholder="请再次输入密码" autoComplete="off"/>
            </FormItem>
        </Form>);
    }
});

RegisterForm = createForm()(RegisterForm);
export default RegisterForm;