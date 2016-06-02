import React from 'react';
import {
    Modal,
    Form,
    Input,
    Select,
    Col,
    Button,
    Radio,
    Cascader,
    Upload,
    Icon,
    InputNumber,
    DatePicker,
    Alert
} from 'antd';
import moment from 'moment';
import $ from 'jquery';
import {chinaSelect, claimTypes, interestTypes, attachmentTypes, guaranteeStyles} from '../util';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
function getBlank(initialValue) {
    return {initialValue: initialValue};
}
function getRequiredString(initialValue, message) {
    return {initialValue: initialValue, rules: [{required: true, whitespace: true, message: message}]};
}
function getRequiredNumber(initialValue, message) {
    return {initialValue: initialValue, rules: [{required: true, type: 'number', message: message}]};
}
function getRequiredChoice(initialValue, message) {
    return {initialValue: initialValue, rules: [{required: true, type: 'integer', message: message}]};
}
function getRequiredBoolean(initialValue, message) {
    return {initialValue: initialValue, rules: [{required: true, type: 'boolean', message: message}]};
}
let ModalClaim = React.createClass({
    getInitialState(){
        if (this.props.claim) {
            let claim = this.props.claim;
            return {
                disabled: this.props.disabled,
                fileList: claim.file ? [{uid: -1, name: claim._id + "_file.pdf", status: "done", url: claim.file}] : [],
                judgedFileList: claim.judge ? [{
                    uid: -1,
                    name: claim._id + "_judge.pdf",
                    status: "done",
                    url: claim.judge.file
                }] : [],
                attachmentList: claim.attachments.map((attachment, i)=>({
                    uid: -1 - i,
                    name: attachment.name,
                    status: "done",
                    url: attachment.path
                }))
            };
        } else {
            return {
                disabled: false,
                fileList: [],
                judgedFileList: [],
                attachmentList: []
            };
        }
    }, handleOk(){
        const {getFieldValue, validateFields}=this.props.form;
        if (getFieldValue('judged') && this.state.judgedFileList.length === 0) {
            return;
        }
        validateFields((errors, values)=> {
            if (!errors) {
                var data = {
                    name: values.name,
                    representative: values.representative,
                    phone_representative: values.phoneRepresentative,
                    phone: values.phone,
                    fax: values.fax ? values.fax : undefined,
                    address3: JSON.stringify(values.address3),
                    address: values.address,
                    postcode: values.postcode,
                    reason: values.reason,
                    file: this.state.fileList.length > 0 ? this.state.fileList[0].url : undefined,
                    guarantee: values.guaranteed ? JSON.stringify({
                        name: values.guaranteedName,
                        money: values.guaranteedMoney,
                        style: values.guaranteedStyle
                    }) : undefined,
                    judge: values.judged ? JSON.stringify({
                        money: values.judgedMoney,
                        file: this.state.judgedFileList[0].url
                    }) : undefined,
                    rule: values.rule,
                    claim_type: values.claimType,
                    currency: values.currency,
                    principal: values.principal,
                    interest: values.interestCalculate ? JSON.stringify({
                        calculate: values.interestCalculate,
                        start: values.interestStart
                    }) : undefined,
                    claim_information: values.claimInformation ? values.claimInformation : undefined,
                    attachments: JSON.stringify(this.state.attachmentList.map(file=>({
                        name: file.name,
                        style: file.style,
                        path: file.url
                    }))),
                    display: values.display
                };
                if (this.props.claim) {
                    $.ajax('/claims/' + this.props.claim._id, {
                        method: 'PUT', data: data, success: claim=> {
                            if (this.props.success) {
                                this.props.success(claim);
                            }
                            this.props.close();
                        }, error: xhr=> {
                            if (xhr.status) {
                                this.setState({message: xhr.responseJSON.error});
                            }
                        }
                    });
                } else {
                    $.ajax('/claims?companyId=' + this.props.companyId, {
                        method: 'POST', data: data, success: claim=> {
                            if (this.props.success) {
                                this.props.success(claim);
                            }
                            this.props.close();
                        }, error: xhr=> {
                            if (xhr.status) {
                                this.setState({message: xhr.responseJSON.error});
                            }
                        }
                    });
                }
            }
        });
    }, disabledDate(current) {
        return current && (current.getTime() > Date.now() || moment(this.props.interestEnd).isBefore(current.getTime()));
    }, handleEdit() {
        this.setState({disabled: false});
    }, handleFileChange(info) {
        const {file, fileList}=info;
        if (fileList.length === this.state.fileList.length + 1 && file.response && file.response.url) {
            file.url = file.response.url;
            this.setState({fileList: [file]});
        }
    }, handleFileDelete(file) {
        this.setState({fileList: this.state.fileList.filter(f=>(f.uid !== file.uid))});
    }, handleJudgeFileChange(info) {
        const {file, fileList}=info;
        if (fileList.length === this.state.judgedFileList.length + 1 && file.response && file.response.url) {
            file.url = file.response.url;
            this.setState({judgedFileList: [file]});
        }
    }, handleJudgeFileDelete(file) {
        this.setState({judgedFileList: this.state.judgedFileList.filter(f=>(f.uid !== file.uid))});
    }, handleAttachmentChange(info){
        const {file, fileList}=info;
        const {getFieldValue, resetFields}=this.props.form;
        if (fileList.length === this.state.attachmentList.length + 1 && file.response && file.response.url) {
            file.name = getFieldValue('attachmentName');
            file.style = getFieldValue('attachmentStyle');
            file.url = file.response.url;
            resetFields(['attachmentName', 'attachmentStyle']);
            this.setState({attachmentList: this.state.attachmentList.concat(file)});
        }
    }, handleAttachmentDelete(file) {
        this.setState({attachmentList: this.state.attachmentList.filter(f=>(f.uid !== file.uid))});
    }, handleFilePreview(file){
        window.open(file.url);
    }, checkGuaranteedName(rule, value, callback){
        const {getFieldValue}=this.props.form;
        if (getFieldValue('guaranteed') && !value) callback("请输入担保人名称");
        else callback();
    }, checkGuaranteedMoney(rule, value, callback) {
        const {getFieldValue}=this.props.form;
        if (getFieldValue('guaranteed') && value === undefined) callback('请输入担保金额');
        else callback();
    }, checkGuaranteedStyle(rule, value, callback) {
        const {getFieldValue}=this.props.form;
        if (getFieldValue('guaranteed') && !value) callback("请选择担保形式");
        else callback();
    }, checkJudgedMoney(rule, value, callback) {
        const {getFieldValue}=this.props.form;
        if (getFieldValue('judged') && value === undefined) callback('请输入诉讼/保全/执行费');
        else callback();
    }, checkInterestStart(rule, value, callback) {
        const {getFieldValue}=this.props.form;
        if (getFieldValue('interestCalculate') && !value) callback('请输入利息起始日期');
        else callback();
    }, componentWillReceiveProps(props) {
        if (props.claim !== this.props.claim) {
            if (props.claim) {
                let claim = props.claim;
                this.setState({
                    disabled: props.disabled,
                    message: undefined,
                    fileList: claim.file ? [{
                        uid: -1,
                        name: claim._id + "_file.pdf",
                        status: "done",
                        url: claim.file
                    }] : [],
                    judgedFileList: claim.judge ? [{
                        uid: -1,
                        name: claim._id + "_judge.pdf",
                        status: "done",
                        url: claim.judge.file
                    }] : [],
                    attachmentList: claim.attachments.map((attachment, i)=>({
                        uid: -1 - i,
                        name: attachment.name,
                        style: attachment.style,
                        status: "done",
                        url: attachment.path
                    }))
                });
            } else {
                this.setState({
                    disabled: false,
                    message: undefined,
                    fileList: [],
                    judgedFileList: [],
                    attachmentList: []
                });
            }
        }
    }, render(){
        const formItemLayout = {
            labelCol: {span: 6},
            wrapperCol: {span: 16}
        };
        const {getFieldProps, getFieldValue}=this.props.form;
        const claim = this.props.claim, claim2 = this.props.claim2;
        const nameProps = getFieldProps('name', getRequiredString(claim ? claim.name : (claim2 ? claim2.name : undefined), "请输入债权人"));
        const representativeProps = getFieldProps('representative', getRequiredString(claim ? claim.representative : (claim2 ? claim2.representative : undefined), "请输入法定代表人"));
        const phoneRepresentativeProps = getFieldProps('phoneRepresentative', getRequiredString(claim ? claim.phone_representative : (claim2 ? claim2.phone_representative : undefined), "请输入法定代表人联系电话"));
        const phoneProps = getFieldProps('phone', getRequiredString(claim ? claim.phone : (claim2 ? claim2.phone : undefined), "请输入联系电话"));
        const faxProps = getFieldProps('fax', getBlank(claim ? claim.fax : (claim2 ? claim2.fax : undefined)));
        const address3Props = getFieldProps('address3', {
            initialValue: claim ? claim.address3 : (claim2 ? claim2.address3 : undefined),
            rules: [{required: true, type: 'array', message: "请选择地址"}]
        });
        const addressProps = getFieldProps('address', getRequiredString(claim ? claim.address : (claim2 ? claim2.address : undefined), "请输入详细地址"));
        const postcodeProps = getFieldProps('postcode', getRequiredString(claim ? claim.postcode : (claim2 ? claim2.postcode : undefined), "请输入邮编"));
        const reasonProps = getFieldProps('reason', getRequiredString(claim ? claim.reason : undefined, "请输入债权形成原因"));
        const guaranteedProps = getFieldProps('guaranteed', getRequiredBoolean(claim ? !!claim.guarantee : undefined, "请选择是否担保"));
        const guaranteedNameProps = getFieldProps('guaranteedName', {
            initialValue: claim && claim.guarantee ? claim.guarantee.name : undefined,
            rules: [{validator: this.checkGuaranteedName}]
        });
        const guaranteedMoneyProps = getFieldProps('guaranteedMoney', {
            initialValue: claim && claim.guarantee ? claim.guarantee.money : undefined,
            rules: [{validator: this.checkGuaranteedMoney}]
        });
        const guaranteedStyleProps = getFieldProps('guaranteedStyle', {
            initialValue: claim && claim.guarantee ? claim.guarantee.style : undefined,
            rules: [{validator: this.checkGuaranteedStyle}]
        });
        const judgedProps = getFieldProps('judged', getRequiredBoolean(claim ? !!claim.judge : undefined, "请选择是否裁决"));
        const judgedMoneyProps = getFieldProps('judgedMoney', {
            initialValue: claim && claim.judge ? claim.judge.money : undefined,
            rules: [{validator: this.checkJudgedMoney}]
        });
        const ruleProps = getFieldProps('rule', getRequiredBoolean(claim ? claim.rule : undefined, "请选择是否申请执行或裁定"));
        const claimTypeProps = getFieldProps('claimType', getRequiredChoice(claim ? claim.claim_type : undefined, "请选择债权类型"));
        const currencyProps = getFieldProps('currency', {
            initialValue: claim ? claim.currency : undefined,
            rules: [{required: true, type: 'enum', enum: this.props.currencies.map(currency=>(currency._id))}]
        });
        const principalProps = getFieldProps('principal', getRequiredNumber(claim ? claim.principal : undefined, "请输入本金"));
        const interestCalculateProps = getFieldProps('interestCalculate', getRequiredChoice(claim ? (claim.interest ? claim.interest.calculate : 0) : undefined, "请选择利息计算方式"));
        const interestStartProps = getFieldProps('interestStart', {
            initialValue: claim && claim.interest ? claim.interest.start : undefined,
            rules: [{validator: this.checkInterestStart}]
        });
        const claimInformationProps = getFieldProps('claimInformation', getBlank(claim ? claim.claim_information : undefined));
        const displayProps = getFieldProps('display', getRequiredString(claim ? claim.display : undefined, "请输入显示名称"));
        var form = (<Form horizontal form={this.props.form}>
            <FormItem {...formItemLayout} label="债权人：" required>
                <Input {...nameProps} disabled={this.props.claim2||this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="法定代表人：" required>
                <Input {...representativeProps} disabled={this.props.claim2||this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="法定代表联系电话：" required>
                <Input {...phoneRepresentativeProps} disabled={this.props.claim2||this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="联系电话：" required>
                <Input {...phoneProps} disabled={this.props.claim2||this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="传真：">
                <Input {...faxProps} disabled={this.props.claim2||this.state.disabled}/>
            </FormItem>
            <FormItem labelCol={formItemLayout.labelCol} label="地址：" required>
                <Col span={7}><FormItem>
                    <Cascader {...address3Props} options={chinaSelect}
                                                 disabled={this.props.claim2||this.state.disabled}/>
                </FormItem></Col>
                <Col span={8} offset={1}><FormItem>
                    <Input {...addressProps} disabled={this.props.claim2||this.state.disabled}/>
                </FormItem></Col>
            </FormItem>
            <FormItem {...formItemLayout} label="邮编：" required>
                <Input {...postcodeProps} disabled={this.props.claim2||this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="债权形成原因：" required>
                <Input type="textarea" {...reasonProps} disabled={this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="《债权申报书》：">
                <Upload action={'/claims/upload?companyId='+this.props.companyId} accept=".pdf"
                        fileList={this.state.fileList} onChange={this.handleFileChange}
                        onRemove={this.handleFileDelete} onPreview={this.handleFilePreview}>
                    <Button type="ghost" disabled={this.state.disabled}>
                        <Icon type="upload"/>点击上传
                    </Button>
                </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="债权担保：" required>
                <RadioGroup {...guaranteedProps} disabled={this.state.disabled}>
                    <Radio key="false" value={false}>无</Radio>
                    <Radio key="true" value={true}>有</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="担保人名称：" style={getFieldValue('guaranteed')?{}:{display:"none"}}
                                          required>
                <Input {...guaranteedNameProps} disabled={this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="担保金额：" style={getFieldValue('guaranteed')?{}:{display:"none"}}
                                          required>
                <InputNumber min={0} step={0.01} {...guaranteedMoneyProps} disabled={this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="担保形式：" style={getFieldValue('guaranteed')?{}:{display:"none"}}
                                          required>
                <RadioGroup {...guaranteedStyleProps} disabled={this.state.disabled}>
                    {guaranteeStyles.map((style, i)=>(<Radio key={"guaranteeStyle_"+(i+1)} value={i+1}>
                        {style}
                    </Radio>))}
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="判决、裁定或仲裁：" required>
                <RadioGroup {...judgedProps} disabled={this.state.disabled}>
                    <Radio key="false" value={false}>无</Radio>
                    <Radio key="true" value={true}>有</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="诉讼/保全/执行费：" style={getFieldValue('judged')?{}:{display:"none"}}
                                          required>
                <InputNumber min={0} step={0.01} {...judgedMoneyProps} disabled={this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="裁决凭证：" style={getFieldValue('judged')?{}:{display:"none"}}
                                          validateStatus={this.state.judgedFileList.length>0?"success":"error"}
                                          help={this.state.judgedFileList.length>0?undefined:"请上传裁决凭证"} required>
                <Upload action={'/claims/upload?companyId='+this.props.companyId} accept=".pdf"
                        fileList={this.state.judgedFileList} onChange={this.handleJudgeFileChange}
                        onRemove={this.handleJudgeFileDelete} onPreview={this.handleFilePreview}>
                    <Button type="ghost" disabled={this.state.disabled}>
                        <Icon type="upload"/>点击上传
                    </Button>
                </Upload>
            </FormItem>
            <FormItem {...formItemLayout} label="申请执行及裁定：" required>
                <RadioGroup {...ruleProps} disabled={this.state.disabled}>
                    <Radio key="false" value={false}>无</Radio>
                    <Radio key="true" value={true}>有</Radio>
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="债权类型：" required>
                <RadioGroup {...claimTypeProps} disabled={this.state.disabled}>
                    {claimTypes.map((type, i)=>(<Radio key={"claim_"+(i+1)} value={i+1}>{type}</Radio>))}
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="币种：" required>
                <Select {...currencyProps} disabled={this.state.disabled}>
                    {this.props.currencies.map(currency=>(<Option key={currency._id} value={currency._id}>
                        {currency.name + " " + currency.code + (currency.exchange && currency.exchange.length > 0 ? ' -- ' + currency.exchange[0].rate : "")}
                    </Option>))}
                </Select>
            </FormItem>
            <FormItem {...formItemLayout} label="本金：" required>
                <InputNumber step={0.01} min={0} {...principalProps} disabled={this.state.disabled}
                             style={{width:'100%'}}/>
            </FormItem>
            <FormItem {...formItemLayout} label="利息计算方式：" required>
                <RadioGroup {...interestCalculateProps} disabled={this.state.disabled}>
                    {interestTypes.map((interest, i)=>(<Radio key={"interest_"+i} value={i}>{interest}</Radio>))}
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="计息开始日期：" required
                                          style={getFieldValue('interestCalculate')?{}:{display:"none"}}>
                <DatePicker {...interestStartProps} disabledDate={this.disabledDate}
                                                    disabled={this.state.disabled} style={{width:'100%'}}/>
            </FormItem>
            <FormItem {...formItemLayout} label="计息结束日期："
                                          style={getFieldValue('interestCalculate')?{}:{display:"none"}}>
                <DatePicker value={this.props.interestEnd} disabled={true} style={{width:'100%'}}/>
            </FormItem>
            <FormItem {...formItemLayout} label="利息："
                                          style={getFieldValue('interestCalculate')?{}:{display:"none"}}>
                <InputNumber step={0.01} disabled={true} style={{width:'100%'}}
                             value={Number(getFieldValue('principal'))*Number(getFieldValue('interestCalculate'))/100}/>
            </FormItem>
            <FormItem {...formItemLayout} label="总额：">
                <InputNumber step={0.01} disabled={true} style={{width:'100%'}}
                             value={Number(getFieldValue('principal'))*(1+Number(getFieldValue('interestCalculate'))/100)}/>
            </FormItem>
            <FormItem {...formItemLayout} label="其他：">
                <Input type="textarea" {...claimInformationProps} disabled={this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="显示名称：">
                <Input {...displayProps} disabled={this.state.disabled}/>
            </FormItem>
            <FormItem {...formItemLayout} label="附件名称：" style={this.state.disabled?{display:"none"}:{}}>
                <Input {...getFieldProps('attachmentName', {})}/>
            </FormItem>
            <FormItem {...formItemLayout} label="附件类型：" style={this.state.disabled?{display:"none"}:{}}>
                <RadioGroup {...getFieldProps('attachmentStyle', {})}>
                    {attachmentTypes.map((attachment, i)=>(<Radio key={"attachment_"+(i+1)} value={i+1}>
                        {attachment}
                    </Radio>))}
                </RadioGroup>
            </FormItem>
            <FormItem {...formItemLayout} label="附件上传：">
                <Upload action={'/claims/upload?companyId='+this.props.companyId} accept=".pdf" name="file"
                        fileList={this.state.attachmentList} onChange={this.handleAttachmentChange}
                        onRemove={this.handleAttachmentDelete} onPreview={this.handleFilePreview}>
                    <Button type="ghost"
                            disabled={this.state.disabled||!getFieldValue('attachmentName')||!getFieldValue('attachmentStyle')}>
                        <Icon type="upload"/>点击上传
                    </Button>
                </Upload>
            </FormItem>
        </Form>);
        const alert = this.state.message ? (<Alert message={this.state.message} type="error"/>) : undefined;
        if (this.state.disabled) {
            var footer = [];
            if (this.props.claim.state <= 2) {
                footer.push(<Button key="edit" size="large" type="ghost" onClick={this.handleEdit}>修改</Button>);
            }
            footer.push(<Button key="close" size="large" type="primary" onClick={this.props.close}>关闭</Button>);
            return (<Modal visible={this.props.visible} title="债权申请" onOk={this.handleOk} onCancel={this.props.close}
                           footer={footer}>
                {alert}
                {form}
            </Modal>);
        } else {
            return (<Modal visible={this.props.visible} title="债权申请" onOk={this.handleOk} onCancel={this.props.close}>
                {alert}
                {form}
            </Modal>);
        }
    }
});
ModalClaim = Form.create()(ModalClaim);
export default ModalClaim;