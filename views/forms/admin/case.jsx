import React from 'react';
import { Col, Form, Cascader, Input, Button, Radio, DatePicker } from 'antd';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;

let CaseForm = React.createClass({
    submit() {
        console.log(this.refs.caseCode );
        this.props.onSubmit();
    },
    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                    labelCol={{span: 6}}
                    wrapperCol={{span: 8}}
                    label="案件编码：">
                    <Input type="text" disabled ref="caseCode"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="案件类型：" required>
                    <RadioGroup defaultValue="b" ref="caseType">
                        <Radio value="1">破产清算</Radio>
                        <Radio value="2">强制清算</Radio>
                        <Radio value="3">破产重整</Radio>
                        <Radio value="4">自行清算</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="受理日期：" required>
                    <DatePicker style={{width:'36%'}} ref="startDate"/>
                </FormItem>
                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: '24px' }}>
                    <Button type="primary" htmlType="button" onClick={this.submit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
});

export default CaseForm;
