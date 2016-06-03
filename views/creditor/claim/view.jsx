import React from 'react';
import {Row, Col, Table, Button, Form, Select, Menu, Dropdown, Card, Icon} from 'antd';
import Sider from '../../siders/creditor';
import SearchInput from '../../layouts/SearchInput';
import Header from '../../layouts/header';
import Footer from '../../layouts/footer';
import TableCompany from '../../layouts/tableCompany';
import StepsCompany from '../../steps/stepsCompany';
import StepsClaim from '../../steps/stepsClaim';
import ModalClaim from '../../modals/claim';
import ModalVerify from '../../modals/verify';
import {claimTypes, claimStates, getCurrentStep, noop} from '../../util';
const Option = Select.Option;
const MenuItem = Menu.Item;
const View = React.createClass({
    getDefaultProps() {
        return {modalVisible: false};
    }, getInitialState() {
        return {
            claims: this.props.company.claims,
            modalVisible: this.props.modalVisible,
            type: 0,
            state: 0,
            modalDisabled: false,
            verifyVisible: false
        };
    }, handleTypeChange(value){
        this.setState({type: value});
    }, handleStateChange(value){
        this.setState({state: value});
    }, handleSearch(text){
        this.setState({search: text});
    }, showModal(){
        this.setState({modalVisible: true, claim: undefined, modalDisabled: false});
    }, hideModal(){
        this.setState({modalVisible: false});
    }, closeVerify(){
        this.setState({verifyVisible: false});
    }, view(claim){
        return (e)=> {
            e.preventDefault();
            this.setState({modalVisible: true, claim: claim, modalDisabled: true});
        };
    }, edit(claim){
        return (e)=> {
            e.preventDefault();
            this.setState({modalVisible: true, claim: claim, modalDisabled: false});
        }
    }, verify(claim){
        return (e)=> {
            e.preventDefault();
            this.setState({verifyVisible: true, claim: claim});
        }
    }, modalSuccess(claim){
        for (let i = 0; i < this.state.claims.length; i++) {
            if (this.state.claims[i]._id === claim._id) {
                var claims = this.state.claims.slice(0);
                claims[i] = claim;
                this.setState({claims: claims});
                return;
            }
        }
        this.setState({claims: this.state.claims.concat(claim)});
    }, render(){
        const claims = this.state.claims.filter(claim=>((!this.state.type || this.state.type === claim.claim_type) && (!this.state.state || this.state.state === claim.state) && (!this.state.search || claim.display.toLowerCase().indexOf(this.state.search.toLowerCase()) >= 0)));
        const columns = [{
            title: "备注名",
            key: "display",
            dataIndex: "display",
            width: "25%"
        }, {
            title: "债权类型",
            key: "type",
            dataIndex: "claim_type",
            width: "25%",
            render: text=> (claimTypes[text - 1]),
            sorter: (a, b)=>(a.claim_type - b.claim_type)
        }, {
            title: "审核状态",
            key: "state",
            dataIndex: "state",
            width: "25%",
            render: text=>(<StepsClaim state={text}/>),
            sorter: (a, b)=>(a.state - b.state)
        }, {
            title: "操作", key: "operation", width: "25%", render: (text, record)=> {
                switch (record.state) {
                    case 1:
                        return (<span>
                            <a href="/processv1.pdf" target="_blank">下载授权书</a>
                            <span className="ant-divider"/>
                            <a href="#" onClick={this.view(record)}>查看</a>
                            <span className="ant-divider"/>
                            <a href="#" onClick={this.edit(record)}>修改</a>
                            <span className="ant-divider"/>
                            <a href="/processv1.pdf" target="_blank">打印</a>
                        </span>);
                    case 2:
                        return (<span>
                            <a href="#" onClick={this.view(record)}>查看</a>
                            <span className="ant-divider"/>
                            <a href="#" onClick={this.edit(record)}>修改</a>
                            <span className="ant-divider"/>
                            <a href="/processv1.pdf" target="_blank">打印</a>
                        </span>);
                    case 3:
                        var menu = (<Menu>
                            <MenuItem key="company" disabled={!record.verify_company.file}>
                                <a href={record.verify_company.file?record.verify_company.file:"#"}
                                   target="_blank">财务报告</a>
                            </MenuItem>
                            <MenuItem key="accountant" disabled={!record.verify_accountant.file}>
                                <a href={record.verify_accountant.file?record.verify_accountant.file:"#"}
                                   target="_blank">会计报告</a>
                            </MenuItem>
                            <Menu.Divider/>
                            <MenuItem key="liquidation" disabled={!record.verify_liquidation.file}>
                                <a href={record.verify_liquidation.file?record.verify_liquidation.file:"#"}
                                   target="_blank">最终报告</a>
                            </MenuItem>
                        </Menu>);
                        return (<span>
                            <a href="#" onClick={this.view(record)}>查看</a>
                            <span className="ant-divider"/>
                            <a href="/processv1.pdf" target="_blank">打印</a>
                            <span className="ant-divider"/>
                            <a href="#" onClick={this.verify(record)}>查看审核意见</a>
                            <span className="ant-divider"/>
                            <Dropdown overlay={menu}>
                                <a href="#" className="ant-dropdown-link" onClick={noop}>
                                    下载审核报告 <Icon type="down"/>
                                </a>
                            </Dropdown>
                        </span>);
                }
            }
        }];
        return (<div>
            <Header user={this.props.user}/>
            <Row>
                <Col span={4}><Sider companies={this.props.companies}/></Col>
                <Col span={18} offset={1}>
                    <Card title="债权申报">
                        <TableCompany company={this.props.company}>
                            <StepsCompany step={getCurrentStep(this.props.company)} expire={this.props.company.expire}
                                          vote_start={this.props.company.vote_start}
                                          vote_end={this.props.company.vote_end}/>
                            <Row>
                                <Col span={6}><Button onClick={this.showModal} type="primary">新增债权申请</Button></Col>
                                <Col span={5}>
                                    <Select value={this.state.type} onChange={this.handleTypeChange}
                                            style={{width:"100%"}}>
                                        <Option key="0" value={0}>选择债权类型</Option>
                                        {claimTypes.map((type, i)=>(<Option key={(i+1).toString()} value={i+1}>
                                            {type}
                                        </Option>))}
                                    </Select>
                                </Col>
                                <Col span={5} offset={1}>
                                    <Select value={this.state.state} onChange={this.handleStateChange}
                                            style={{width:"100%"}}>
                                        <Option key="0" value={0}>选择审核状态</Option>
                                        {claimStates.map((state, i)=>(<Option key={(i+1).toString()} value={i+1}>
                                            {state}
                                        </Option>))}
                                    </Select>
                                </Col>
                                <Col span={6} offset={1}><SearchInput onSearch={this.handleSearch}/></Col>
                            </Row>
                            <Table pagination={false} columns={columns}
                                   dataSource={claims.map(claim=>({_id: claim._id,
                                                name: claim.name,
                                                key: claim._id,
                                                representative: claim.representative,
                                                phone_representative: claim.phone_representative,
                                                phone: claim.phone,
                                                fax: claim.fax,
                                                address3: claim.address3,
                                                address: claim.address,
                                                postcode: claim.postcode,
                                                reason: claim.reason,
                                                file: claim.file,
                                                guarantee: claim.guarantee,
                                                judge: claim.judge,
                                                rule: claim.rule,
                                                claim_type: claim.claim_type,
                                                currency: claim.currency,
                                                principal: claim.principal,
                                                interest: claim.interest,
                                                claim_information: claim.claim_information,
                                                attachments: claim.attachments,
                                                display: claim.display,
                                                verify_court: claim.verify_court,
                                                verify_company: claim.verify_company,
                                                verify_accountant: claim.verify_accountant,
                                                verify_liquidation: claim.verify_liquidation,
                                                state: claim.state}))}/>
                        </TableCompany>
                        <ModalClaim claim={this.state.claim} disabled={this.state.modalDisabled}
                                    visible={this.state.modalVisible} close={this.hideModal}
                                    claim2={this.state.claims.length>0?this.state.claims[0]:undefined}
                                    interestEnd={this.props.company.create} currencies={this.props.currencies}
                                    companyId={this.props.company._id} success={this.modalSuccess}/>
                        <ModalVerify claim={this.state.claim} visible={this.state.verifyVisible}
                                     close={this.closeVerify}/>
                    </Card>
                </Col>
            </Row>
            <Footer/>
        </div>);
    }
});
export default View;