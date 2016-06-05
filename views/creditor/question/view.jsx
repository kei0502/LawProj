import React from 'react';
import {Row, Col, Table, Card, message, Form, Input, Button} from 'antd';
import $ from 'jquery';
import Header from '../../layouts/header';
import Sider from '../../siders/creditor';
const View = React.createClass({
    getInitialState(){
        return {questions: this.props.questions, question: ""};
    }, handleChange(e){
        this.setState({question: e.target.value});
    }, handleSubmit(e){
        e.preventDefault();
        $.ajax('/questions?companyId=' + this.props.companyId, {
            method: 'POST', data: {text: this.state.question}, success: question=> {
                this.setState({questions: this.state.questions.concat(question), question: ""});
            }, error: xhr=> {
                if (xhr.status) {
                    message.error(xhr.responseJSON.error);
                }
            }
        });
    }, render() {
        const columns = [{
            title: "提问时间",
            dataIndex: "ask",
            key: "askTime",
            width: "15%",
            render: ask=>(ask.time),
            sorter: (a, b)=>(a.ask.time === b.ask.time ? 0 : (a.ask.time < b.ask.time ? -1 : 1))
        }, {
            title: "问题",
            dataIndex: "ask",
            key: "askText",
            width: "35%",
            render: ask=>(ask.text)
        }, {
            title: "回答时间",
            dataIndex: "answer",
            key: "answerTime",
            width: "15%",
            render: answer=>(answer ? answer.time : undefined),
            sorter: (a, b)=> {
                if (!a.answer) {
                    return b.answer ? -1 : 0;
                } else if (!b.answer) {
                    return 1;
                } else if (a.answer.time === b.answer.time) {
                    return 0;
                } else {
                    return a.answer.time < b.answer.time ? -1 : 1;
                }
            }
        }, {
            title: "回答",
            dataIndex: "answer",
            key: "answerText",
            width: "35%",
            render: answer=>(answer ? answer.text : undefined)
        }];
        const formItemLayout = {wrapperCol: {span: 24}};
        return (<div>
            <Header user={this.props.user}/>
            <Row>
                <Col span={4}><Sider companies={this.props.companies}/></Col>
                <Col span={18} offset={1}><Card title="债权问答">
                    <Table pagination={{total:this.state.questions.length,pageSize:20}} columns={columns}
                           dataSource={this.state.questions.map(question=>({_id:question._id,key:question._id,ask:question.ask,answer:question.answer}))}/>
                    <Form horizontal>
                        <Form.Item {...formItemLayout}>
                            <Input type="textarea" value={this.state.question} onChange={this.handleChange}
                                   placeholder="请输入您的问题"/>
                        </Form.Item>
                        <Form.Item {...formItemLayout}>
                            <Button type="primary" onClick={this.handleSubmit}
                                    disabled={!this.state.question}>提问</Button>
                        </Form.Item>
                    </Form>
                </Card></Col>
            </Row>
        </div>);
    }
});
export default View;