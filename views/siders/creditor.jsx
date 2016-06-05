import React from 'react';
import {Menu, Icon} from 'antd';
const CreditorSider = React.createClass({
    handleClick(e) {
        location.href = (e.key === 'index' ? '/' : '/' + e.key);
    }, render() {
        return (<Menu onClick={this.handleClick} mode="vertical" selectedKeys={[this.props.current]}>
            <Menu.Item key="index"><span><Icon type="home"/><span>首页</span></span></Menu.Item>
            <Menu.Item key="creditor/company"><span><Icon type="bars"/><span>挂牌案件</span></span></Menu.Item>
            {this.props.companies.filter(company=> {
                if (!company.claims || company.claims.length === 0) return false;
                for (let i = 0; i < company.claims.length; i++) {
                    if (company.claims[i].state > 1) {
                        return true;
                    }
                }
                return false;
            }).map(company=>(<Menu.SubMenu title={<span><Icon type="appstore-o"/><span>{company.name}</span></span>}
                                           key={"company_"+company._id}>
                <Menu.Item key={'creditor/claim?companyId='+company._id}>债权申报</Menu.Item>
                <Menu.Item key={'creditor/dispatch?companyId='+company._id}>报告发文</Menu.Item>
                <Menu.Item key={'creditor/release?companyId='+company._id}>信息披露</Menu.Item>
                <Menu.Item key={'creditor/vote?companyId='+company._id} disabled={!company.vote_start}>债权人会议</Menu.Item>
                <Menu.Item key={'creditor/distribution?companyId='+company._id}
                           disabled={!company.vote_start}>分配与清算</Menu.Item>
                <Menu.Item key={'creditor/question?companyId='+company._id}>债权问答</Menu.Item>
            </Menu.SubMenu>))}
        </Menu>);
    }
});
export default CreditorSider;