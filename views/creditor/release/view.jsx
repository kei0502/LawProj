import React from 'react';
import {Row, Col, Table, Card} from 'antd';
import Header from '../../layouts/header';
import Sider from '../../siders/creditor';
import SearchInput from '../../layouts/SearchInput';
const View = React.createClass({
    getInitialState(){
        return {search: ''};
    }, handleSearch(text){
        this.setState({search: text});
    }, render() {
        const releases = this.props.releases.filter(release=>(!this.state.search || release.name.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0));
        const columns = [{
            title: "文件名",
            dataIndex: "name",
            key: "name",
            width: "30%"
        }, {
            title: "披露日期",
            dataIndex: "date",
            key: "date",
            width: "30%",
            sorter: (a, b)=>(a.date === b.date ? 0 : (a.date < b.date ? -1 : 1))
        }, {
            title: "附件列表",
            dataIndex: "files",
            key: "files",
            width: "40%",
            render: files=>(<ul>{files.map((file, i)=>(<li key={i}>
                <a href={file.file} target="_blank">{file.name}</a>
            </li>))}</ul>)
        }];
        return (<div>
            <Header user={this.props.user}/>
            <Row>
                <Col span={4}><Sider companies={this.props.companies}/></Col>
                <Col span={18} offset={1}><Card title="信息披露">
                    <Row><Col span={6} offset={18}><SearchInput onSearch={this.handleSearch}/></Col></Row>
                    <Table pagination={{total:releases.length,pageSize:20}} columns={columns}
                           dataSource={releases.map(release=>({_id:release._id,key:release._id,name:release.name,files:release.files,date:release.date}))}/>
                </Card></Col>
            </Row>
        </div>);
    }
});
export default View;