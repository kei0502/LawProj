import React from 'react';
import {Col, Form, Cascader, Input, Button, Radio, DatePicker} from 'antd';
const FormItem = Form.Item;
import {chinaSelect} from '../../util';

const FormDebtor = React.createClass({
    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                    {...formItemLayout}
                    label="统一信用代码：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="债务人姓名：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="法定代表人：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="财务负责人：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="住所地址：" required>
                    <Col span={11}>
                        <Cascader options={chinaSelect} placeholder="省市区"/>
                    </Col>
                    <Col span={12} offset={1}>
                        <Input type="text" placeholder="具体地址"/>
                    </Col>
                </FormItem>
                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: '24px' }}>
                    <Button type="primary" htmlType="button" onClick={this.props.onSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
});

export default FormDebtor;
