import React from 'react';
import {Row, Col, Form, Table} from 'antd';
import Header from '../header';
import Footer from '../../layouts/footer';
import {caseTypes} from '../../util';
import SearchInput from '../../layouts/SearchInput';
const View = React.createClass({
    getInitialState(){
        return {user: this.props.user};
    }, handleSearch(text) {
        this.setState({search: text});
    }, loginSuccess(user){
        this.setState({user: user});
    }, registerSuccess(user) {
        this.setState({user: user});
    }, logout() {
        this.setState({user: undefined});
    }, render() {
        const companies = this.state.search ? this.props.companies.filter(company=>(company.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0)) : this.props.companies;
        const columns = [{
            title: "公司名称",
            key: "name",
            dataIndex: "name",
            width: "50%",
            render: (text, record)=>(this.state.user ? <a href={"/case/"+record._id}>{text}</a> : text)
        }, {
            title: "案件类型",
            key: "type",
            dataIndex: "type",
            width: "25%",
            render: (type)=>(caseTypes[type - 1]),
            sorter: (a, b)=>(a.type - b.type)
        }, {
            title: "受理日期", key: "create", dataIndex: "create", width: "25%", sorter: (a, b)=> {
                if (a.create === b.create) {
                    return 0;
                } else {
                    return a.create < b.create ? -1 : 1
                }
            }
        }];
        return (<div>
            <Header user={this.state.user} current="case" loginSuccess={this.loginSuccess}
                    registerSuccess={this.registerSuccess} logout={this.logout}/>
            <Row style={{marginTop:10,marginBottom:10}}><Col offset={16} span={4}>
                <SearchInput onSearch={this.handleSearch}/>
            </Col></Row>
            <Row><Col span={16} offset={4}>
                <Table pagination={{total:companies.length,pageSize:20}} columns={columns}
                       dataSource={companies.map(company=>({_id:company._id,name:company.name,type:company.case_type,create:company.create,key:company._id}))}/>
            </Col></Row>
            <Footer/>
        </div>);
    }
});
export default View;