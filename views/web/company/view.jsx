import React from 'react';
import {Row, Col, Button} from 'antd';
import TableCompany from '../../layouts/tableCompany';
import StepsCompany from '../../steps/stepsCompany';
import Header from '../header';
import Footer from '../../layouts/footer';
import {getCurrentStep} from '../../util';
const View = React.createClass({
    logout() {
        location.href = "/case";
    }, handleAdd(){
        location.href = "/creditor/claim/add?companyId=" + this.props.company._id;
    }, render(){
        const step = getCurrentStep(this.props.company);
        return (<div>
            <Header user={this.props.user} current="case" logout={this.logout}/>
            <Row><Col span={16} offset={4}><TableCompany company={this.props.company}>
                <StepsCompany step={step} expire={this.props.company.expire} vote_start={this.props.company.vote_start}
                              vote_end={this.props.company.vote_end}/>
                {step === 1 ? <Button type="primary" size="large" onClick={this.handleAdd}>债权申报</Button> : null}
            </TableCompany></Col></Row>
            <Footer/>
        </div>);
    }
});
export default View;