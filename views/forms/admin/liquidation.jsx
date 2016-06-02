import React from 'react';
import {Form, Input, Button} from 'antd';
const FormItem = Form.Item;

const FormLiquidation = React.createClass({
    render() {
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        return (
            <Form horizontal form={this.props.form}>
                <FormItem
                    {...formItemLayout}
                    label="管理人负责人：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="成员信息：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem
                    {...formItemLayout}
                    label="联系方式：" required>
                    <Input type="text"/>
                </FormItem>
                <FormItem wrapperCol={{ span: 16, offset: 6 }} style={{ marginTop: '24px' }}>
                    <Button type="primary" htmlType="button" onClick={this.props.onSubmit}>确定</Button>
                </FormItem>
            </Form>
        );
    }
});

export default FormLiquidation;
