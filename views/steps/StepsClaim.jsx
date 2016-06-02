import React from 'react';
import {Steps} from 'antd';
const Step = Steps.Step;
const StepsClaim = React.createClass({
    render(){
        return (<Steps size="small" direction="vertical" current={this.props.state-1}>
            <Step key={1} title="等待审核"></Step>
            <Step key={2} title="代理身份已确认"></Step>
            <Step key={3} title="债权申报已审核"></Step>
        </Steps>);
    }
});
export default StepsClaim;