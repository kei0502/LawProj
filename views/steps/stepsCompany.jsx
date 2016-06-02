import React from 'react';
import {Steps} from 'antd';
const Step = Steps.Step;
const StepsCompany = React.createClass({
    render(){
        return (<Steps size="small" current={this.props.step-1}>
            <Step key={1} title="债权申请中"/>
            <Step key={2} title="债权申请截止" description={this.props.expire}/>
            <Step key={3} title="投票中" description={<span>{this.props.vote_start}<br/>{this.props.vote_end}</span>}/>
            <Step key={4} title="现场投票结果统计中"/>
            <Step key={5} title="完成投票"/>
            <Step key={6} title="已关闭"/>
        </Steps>);
    }
});
export default StepsCompany;