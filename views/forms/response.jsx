import React from 'react';
import {Form, Input, Radio, Tag, Button} from 'antd';
import {responseStyles, responseColors} from '../util';
const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const FormResponse = React.createClass({
    getInitialState(){
        return {style: 1, text: ""};
    },
    handleStyleChange(e) {
        this.setState({style: e.target.value});
    },
    handleTextChange(e) {
        this.setState({text: e.target.value});
    },
    getResponse(){
        return {style: this.state.style, text: this.state.text};
    },
    render(){
        const formItemLayout = {labelCol: {span: 4}, wrapperCol: {span: 20}};
        if (this.props.response) {
            let responseStyle = this.props.response.style - 1;
            return (<Form horizontal>
                <FormItem {...formItemLayout} label="反馈：" required style={{marginBottom:0}}>
                    <Tag className="ant-form-text" color={responseColors[responseStyle]}>
                        {responseStyles[responseStyle]}
                    </Tag>
                </FormItem>
                <FormItem {...formItemLayout} label="反馈意见：" style={{marginBottom:0}}>
                    <p className="ant-form-text">{this.props.response.text}</p>
                </FormItem>
            </Form>)
        } else {
            return (<Form horizontal onSubmit={this.props.handleSubmit(this.getResponse)}>
                <FormItem {...formItemLayout} label="反馈：" required style={{marginBottom:0}}>
                    <RadioGroup value={this.state.style} onChange={this.handleStyleChange}>
                        <Radio value={1}>知悉</Radio>
                        <Radio value={2}>同意</Radio>
                        <Radio value={3}>反对</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem {...formItemLayout} label="反馈意见：" style={{marginBottom:0}}>
                    <Input type="textarea" value={this.state.text} onChange={this.handleTextChange}/>
                </FormItem>
                <FormItem wrapperCol={{span: 20, offset: 4}} style={{marginBottom:0}}>
                    <Button type="primary" htmlType="submit" size="default">确定</Button>
                </FormItem>
            </Form>);
        }
    }
});
export default FormResponse;