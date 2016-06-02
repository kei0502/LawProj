import React from 'react';
import {Row, Col, Table, Card} from 'antd';
import Header from '../../layouts/header';
import Sider from '../../siders/creditor';
import SearchInput from '../../layouts/SearchInput';
import Footer from '../../layouts/footer';
import {caseTypes} from '../../util';
const View = React.createClass({
    getInitialState(){
        return {search: ""};
    }, handleSearch(text){
        this.setState({search: text});
    }, render(){
        const companies = this.state.search ? this.props.companies.filter(company=>(company.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0)) : this.props.companies;
        const columns = [{
            title: "公司名称",
            key: "name",
            dataIndex: "name",
            width: "50%",
            render: (text, record)=>(<a href={"/creditor/claim?companyId="+record._id}>{text}</a>)
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
            <Header user={this.props.user}/>
            <Row>
                <Col span={4}><Sider companies={this.props.companies} current="creditor/company"/></Col>
                <Col span={18} offset={1}>
                    <Card title="挂牌案件">
                        <Row><Col span={6} offset={18} style={{marginTop:10,marginBottom: 10}}>
                            <SearchInput onSearch={this.handleSearch}/>
                        </Col></Row>
                        <Table pagination={{total:companies.length,pageSize:20}} columns={columns}
                               dataSource={companies.map(company=>({_id:company._id,name:company.name,type:company.case_type,create:company.create,key:company._id}))}/>
                    </Card>
                </Col>
            </Row>
            <Footer/>
        </div>);
    }
});
export default View;