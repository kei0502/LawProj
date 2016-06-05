import React from 'react';
import {Row, Col, Table, Card, Select, message} from 'antd';
import $ from 'jquery';
import Header from '../../layouts/header';
import Sider from '../../siders/creditor';
import SearchInput from '../../layouts/SearchInput';
import FormResponse from '../../forms/response';
import {responseStyles} from '../../util';
const Option = Select.Option;
const View = React.createClass({
    getInitialState(){
        return {dispatches: this.props.dispatches};
    }, handleStyleChange(value){
        this.setState({style: value});
    }, handleSearch(value){
        this.setState({search: value})
    }, handleResponseSubmit(id) {
        return cb=> (e=> {
            e.preventDefault();
            const response = cb();
            console.log(response);
            $.ajax('/dispatches/response/' + id, {
                method: 'POST', data: response, success: (dispatch)=> {
                    for (let i = 0; i < this.state.dispatches.length; i++) {
                        if (this.state.dispatches[i]._id === id) {
                            var dispatches = this.state.dispatches.slice(0);
                            dispatches[i] = dispatch;
                            this.setState({dispatches: dispatches});
                            break;
                        }
                    }
                }, error: (xhr)=> {
                    if (xhr.status) {
                        message.error(xhr.responseJSON.error);
                    }
                }
            });
        });
    }, render(){
        const dispatches = this.state.dispatches.filter(dispatch=> (!this.state.search || dispatch.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0) && this.state.style === undefined || (this.state.style === 0 && !dispatch.response) || (dispatch.response && this.state.style === dispatch.response.style));
        const columns = [{
            title: "文件",
            key: 'name',
            width: '30%',
            render: (text, record)=>(<a href={record.file} target="_blank">{record.name}</a>)
        }, {
            title: "日期",
            key: "date",
            width: '30%',
            dataIndex: "date",
            sorter: (a, b)=> {
                if (a.date === b.date) {
                    return 0;
                } else {
                    return a.date < b.date ? -1 : 1
                }
            }
        }, {
            title: "反馈",
            key: "response",
            width: "40%",
            dataIndex: "response",
            render: (response, record)=>(
                <FormResponse response={response} handleSubmit={this.handleResponseSubmit(record._id)}/>),
            sorter: (a, b)=> {
                if (!a.response) {
                    return b.response ? -1 : 0;
                } else if (!b.response) {
                    return 1;
                } else {
                    return a.response.style - b.response.style;
                }
            }
        }];
        return (<div>
            <Header user={this.props.user}/>
            <Row>
                <Col span={4}><Sider companies={this.props.companies}/></Col>
                <Col span={18} offset={1}><Card title="报告发文">
                    <Row>
                        <Col offset={7} span={4} style={{textAlign:'right'}}>状态筛选：</Col>
                        <Col span={6}>
                            <Select style={{width:'100%'}} value={this.state.style} onChange={this.handleStyleChange}>
                                <Option key="undefined" value={undefined}>&nbsp;</Option>
                                <Option key="0" value={0}>无反馈</Option>
                                {responseStyles.map((style, i)=>(<Option key={(i+1).toString()} value={i+1}>
                                    {style}
                                </Option>))}
                            </Select>
                        </Col>
                        <Col span={6} offset={1}><SearchInput onSearch={this.handleSearch}/></Col>
                    </Row>
                    <Table pagination={{total:dispatches.length,pageSize:20}} columns={columns}
                           dataSource={dispatches.map(dispatch=>({_id:dispatch._id,key:dispatch._id,name:dispatch.name,file:dispatch.file,date:dispatch.date,response:dispatch.response}))}/>
                </Card></Col>
            </Row>
        </div>);
    }
});
export default View;