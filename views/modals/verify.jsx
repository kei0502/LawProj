import React from 'react';
import {Modal} from 'antd';
import {claimTypes, guaranteeStyles} from '../util';
const ModalVerify = React.createClass({
    render(){
        let claim = this.props.claim;
        return (<Modal visible={this.props.visible} title="债权审核" onOk={this.props.close} onCancel={this.props.close}>
            <table border="0" style={{width:"100%",textAlign:"left",verticalAlign:"top"}}>
                <tbody>
                <tr>
                    <th width="20%">申报债权类型</th>
                    <td width="30%">{claim ? claimTypes[claim.claim_type - 1] : ""}</td>
                    <th width="20%">评估债权类型</th>
                    <td width="30%">{claim && claim.verifyClaim_type ? claimTypes[claim.verifyClaim_type - 1] : ""}</td>
                </tr>
                <tr>
                    <th>申报金额</th>
                    <td>{claim ? claim.total : ""}</td>
                    <th>评估金额</th>
                    <td>{claim ? claim.verifyTotal : ""}</td>
                </tr>
                <tr>
                    <th>申报担保情况</th>
                    <td>{claim ? (claim.guarantee ? guaranteedStyles[claim.guarantee.style - 1] : "无担保") : ""}</td>
                    <th>评估担保情况</th>
                    <td>{claim ? (claim.verifyGuarantee ? guaranteeStyles[claim.verifyGuarantee - 1] : "无担保") : ""}</td>
                </tr>
                <tr>
                    <th>申报裁决情况</th>
                    <td>{claim ? (claim.judge ? "有" : "无") : ""}</td>
                    <th>评估裁决情况</th>
                    <td>{claim ? (claim.verifyJudge ? "有" : "无") : ""}</td>
                </tr>
                <tr>
                    <th>法院审核意见</th>
                    <td colSpan="3">{claim && claim.verify_court ? claim.verify_court.text : ""}</td>
                </tr>
                <tr>
                    <th>财务审核意见</th>
                    <td colSpan="3">{claim && claim.verify_company ? claim.verify_company.text : ""}</td>
                </tr>
                <tr>
                    <th>会计师审核意见</th>
                    <td colSpan="3">{claim && claim.verify_accountant ? claim.verify_accountant.text : ""}</td>
                </tr>
                <tr>
                    <th>最终审核意见</th>
                    <td colSpan="3">{claim && claim.verify_liquidation ? claim.verify_liquidation.text : ""}</td>
                </tr>
                </tbody>
            </table>
        </Modal>);
    }
});
export default ModalVerify;
