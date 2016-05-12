var React = require('react'), DeletableListItem = require('../../deletableListItem.jsx'), CurrencyOption = require('../../currencyOption.jsx');
var ClaimEditBody = React.createClass({
    getInitialState: function () {
        var claim = this.props.claim;
        return {
            name: claim.name,
            representative: claim.representative,
            phone_representative: claim.phone_representative,
            agents: claim.agents,
            phone: claim.phone,
            fax: claim.fax,
            postcode: claim.postcode,
            address: claim.address,
            reason: claim.reason,
            guaranteed: claim.guarantee ? true : false,
            guaranteedName: claim.guarantee ? claim.guarantee.name : "",
            guaranteedMoney: claim.guarantee ? claim.guarantee.money : "",
            guaranteedStyle: claim.guarantee ? claim.guarantee.style : 1,
            judged: claim.judge ? true : false,
            judgedMoney: claim.judge ? claim.judge.money : "",
            rule: claim.rule,
            claim_type: claim.claim_type,
            currencyId: claim.currency ? claim.currency._id : this.props.currencies[0]._id,
            principal: claim.principal,
            interest: claim.interest,
            claim_information: claim.claim_information,
            attachments: claim.attachments,
            attachmentName: "",
            attachmentStyle: 1,
            display: claim.display,
            state: claim.state
        };
    }, render: function () {
        var agentList = this.state.agents.map(function (agent, i) {
            return (<DeletableListItem content={agent.name} remove={this.onRemoveAgent.bind(this,i)}
                                       deletable={agent._id!=this.props.userid}/>);
        }.bind(this)), fileArea = this.props.claim.file ? (
            <div className="col-sm-8 col-sm-offset-3" id="reasonArea">
                已上传<a href={this.props.claim.file} target="_blank">《债权申报书》</a>
            </div>) : (<div className="col-sm-8 col-sm-offset-3" id="reasonArea">
            必要时可上传《债权申报书》<input type="file" id="reasonFile" style={{display:'inline-block'}} ref="file"
                                onChange={this.onFileChange}/>
        </div>), currencyOptions = this.props.currencies.map(function (currency) {
            return (<CurrencyOption {...currency}/>);
        }), fileList = this.state.attachments.map(function (attachment, i) {
            return (<DeletableListItem content={attachment.name} href={attachment.path}
                                       remove={this.onRemoveAttachment.bind(this,i)}/>);
        }.bind(this));
        return (<div>
            <h1 className="page-header">添加债权申请表</h1>
            <div className="col-sm-12 col-md-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="creditorInput" className="col-sm-3 control-label">债权人</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="creditorInput" value={this.state.name}
                                   onChange={this.onNameChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="representativeInput" className="col-sm-3 control-label">法定代表人</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="representativeInput"
                                   value={this.state.representative} onChange={this.onRepresentativeChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="representativeMobileInput" className="col-sm-3 control-label">法定代表人联系电话</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="representativeMobileInput"
                                   value={this.state.phone_representative} onChange={this.onPhoneRepresentativeChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentInput1" className="col-sm-3 control-label">代理人</label>
                        <ul className="col-sm-6 file-list">{agentList}</ul>
                        <div className="col-md-2">
                            <button className="btn btn-primary" id="addAgentButton" onClick={this.props.registerStart}>
                                注册新代理人
                            </button>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentMobileInput" className="col-sm-3 control-label">联系电话</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="agentMobileInput" value={this.state.phone}
                                   onChange={this.onPhoneChange}/>
                        </div>
                        <label htmlFor="agentFaxInput" className="col-sm-2 control-label">传真</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="agentFaxInput" value={this.state.fax}
                                   onChange={this.onFaxChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentCodeInput" className="col-sm-3 control-label">邮政编码</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="agentCodeInput" value={this.state.postcode}
                                   onChange={this.onPostcodeChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentAddressInput" className="col-sm-3 control-label">地址</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="agentAddressInput"
                                   value={this.state.address} onChange={this.onAddressChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reasonInput" className="col-sm-3 control-label">债权形成原因</label>
                        <div className="col-sm-8">
                            <textarea className="form-control" id="reasonInput" value={this.state.reason}
                                      onChange={this.onReasonChange}/>
                        </div>
                    </div>
                    <div className="form-group">{fileArea}</div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">债权有无担保</label>
                        <div className="col-sm-8">
                            <label className="radio-inline">
                                <input type="radio" name="guaranteeInput" value="" checked={!this.state.guaranteed}
                                       onChange={this.onGuaranteedChange}/>无
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="guaranteeInput" value="1" checked={this.state.guaranteed}
                                       onChange={this.onGuaranteedChange}/>有
                            </label>
                        </div>
                    </div>
                    <div id="guaranteeArea" className="panel panel-default col-sm-10 col-sm-offset-1"
                         style={this.state.guaranteed?{}:{display:'none'}}>
                        <div className="panel-body">
                            <div className="form-group">
                                <label htmlFor="guaranteeNameInput" className="col-sm-3 control-label">担保人名称</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="guaranteeNameInput"
                                           value={this.state.guaranteedName} onChange={this.onGuaranteedNameChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="guaranteeNumberInput" className="col-sm-3 control-label">担保人金额</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="guaranteeNumberInput"
                                           value={this.state.guaranteedMoney} onChange={this.onGuaranteedMoneyChange}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 control-label">担保形式</label>
                                <div className="col-sm-8">
                                    <label className="radio-inline">
                                        <input type="radio" name="guaranteeTypeInput" value="1"
                                               checked={this.state.guaranteedStyle===1}
                                               onChange={this.onGuaranteedStyleChange}/>保证
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="guaranteeTypeInput" value="2"
                                               checked={this.state.guaranteedStyle===2}
                                               onChange={this.onGuaranteedStyleChange}/>抵押
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="guaranteeTypeInput" value="3"
                                               checked={this.state.guaranteedStyle===3}
                                               onChange={this.onGuaranteedStyleChange}/>质押
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">有无判决、裁定或仲裁裁决</label>
                        <div className="col-sm-8">
                            <label className="radio-inline">
                                <input type="radio" name="judgeInput" value="" checked={!this.state.judged}
                                       onChange={this.onJudgedChange}/>无
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="judgeInput" value="1" checked={this.state.judged}
                                       onChange={this.onJudgedChange}/>有
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">有无申请执行及裁定</label>
                        <div className="col-sm-8">
                            <label className="radio-inline">
                                <input type="radio" name="ruleInput" value="" checked={!this.state.rule}
                                       onChange={this.onRuleChange}/>无
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="ruleInput" value="1" checked={this.state.rule}
                                       onChange={this.onRuleChange}/>有
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">申报债权金额</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="moneyTypeInput" className="col-sm-3 control-label">币种</label>
                        <div className="col-sm-3">
                            <select id="moneyTypeInput" className="form-control"
                                    value={this.state.currencyId}
                                    onChange={this.onCurrencyChange}>{currencyOptions}</select>
                        </div>
                        <label htmlFor="moneyTotalInput" className="col-sm-2 control-label">总金额</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="moneyTotalInput" disabled="disabled"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="principalInput" className="col-sm-3 control-label">本金</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="principalInput" value={this.state.principal}
                                   onChange={this.onPrincipalChange}/>
                        </div>
                        <label htmlFor="interestShow" className="col-sm-2 control-label">利息</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="interestShow"/>
                        </div>
                    </div>
                    <div id="judgeArea" style={this.state.judged?{}:{display:'none'}} className="form-group">
                        <label htmlFor="principalInput" className="col-sm-3 control-label">诉讼/保全/执行费：</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="judgeNumberInput"
                                   value={this.state.judgedMoney} onChange={this.onJudgedMoneyChange}/>
                        </div>
                        <label htmlFor="judgeFile"
                               className="col-sm-2 control-label">{this.props.judged ? '凭证已上传' : '必须上传凭证'}</label>
                        <div className="col-sm-3">
                            <input id="judgeFile" type="file" onChange={this.onJudgedFileChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="moreInput" className="col-sm-3 control-label">其它</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="moreInput"
                                   value={this.state.claim_information} onChange={this.onClaimInformationChange}/>
                        </div>
                    </div>
                    <hr/>
                    <div id="fileArea">
                        <div className="form-group">
                            <label className="col-sm-3 control-label">添加附件</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="moreInput" className="col-sm-3 control-label">上传附件</label>
                            <input type="file" className="col-sm-8" id="fileInput"
                                   onchange={this.onAttachmentFileChange}/>

                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">附件名</label>
                            <div className="col-sm-8">
                                <input type="text" className="form-control" id="fileNameInput"
                                       value={this.state.attachmentName} onChange={this.onAttachmentNameChange}/>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">附件类型</label>
                            <div className="col-sm-7">
                                <label className="radio-inline">
                                    <input type="radio" name="fileTypeInput" value="1"
                                           checked={this.state.attachmentStyle===1}
                                           onChange={this.onAttachmentStyleChange}/>申报书
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="fileTypeInput" value="2"
                                           checked={this.state.attachmentStyle===2}
                                           onChange={this.onAttachmentStyleChange}/>证明材料
                                </label>
                                <label className="radio-inline">
                                    <input type="radio" name="fileTypeInput" value="3"
                                           checked={this.state.attachmentStyle===3}
                                           onChange={this.onAttachmentStyleChange}/>其他
                                </label>
                            </div>
                        </div>
                        <div className="form-group">
                            <label className="col-sm-offset-3 col-sm-8 control-label" style={{textAlign: 'left'}}>同一类附件请打包上传</label>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-1 col-sm-offset-5">
                                <button className="btn btn-primary" id="addFileButton" onClick={this.addAttachment}>添加
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">附件列表</label>
                        <ul className="col-sm-8 file-list">
                        </ul>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">债券申请表备注名</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="commentNameInput" value={this.state.display}
                                   onChange={this.onDisplayChange}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-5">
                            <button type="button" id="submitButton" className="btn btn-primary">确定</button>
                            <a href="userFormCreate.html?type=edit" id="editButton" className="btn btn-primary">编辑</a>
                            <button type="button" id="printButton" className="btn btn-primary">打印</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>);
    }, onNameChange: function (e) {
        this.setState({name: e.target.value});
    }, onRepresentativeChange: function (e) {
        this.setState({representative: e.target.value});
    }, onPhoneRepresentativeChange: function (e) {
        this.setState({phone_representative: e.target.value});
    }, onRemoveAgent: function (index) {
        var initial = this.state.agents;
        if (index === 0) {
            this.setState({agents: initial.slice(1)});
        } else if (index === initial.length - 1) {
            this.setState({agents: initial.slice(0, index)});
        } else {
            this.setState({agents: initial.slice(0, index).concat(initial.slice(index + 1))});
        }
    }, onPhoneChange: function (e) {
        this.setState({phone: e.target.value});
    }, onFaxChange: function (e) {
        this.setState({fax: e.target.value});
    }, onPostcodeChange: function (e) {
        this.setState({postcode: e.target.value});
    }, onAddressChange: function (e) {
        this.setState({address: e.target.value});
    }, onReasonChange: function (e) {
        this.setState({reason: e.target.value});
    }, onFileChange: function (e) {
        var file = e.target.files[0];
        this.setState({file: file});
    }, onGuaranteedChange: function (e) {
        if (e.target.checked) {
            this.setState({guaranteed: !!e.target.value});
        }
    }, onGuaranteedNameChange: function (e) {
        this.setState({guaranteedName: e.target.value});
    }, onGuaranteedMoneyChange: function (e) {
        this.setState({guaranteedMoney: e.target.value});
    }, onGuaranteedStyleChange: function (e) {
        if (e.target.checked) {
            this.setState({guaranteedStyle: Number(e.target.value)});
        }
    }, onJudgedChange: function (e) {
        if (e.target.checked) {
            this.setState({judged: !!e.target.value});
        }
    }, onRuleChange: function (e) {
        if (e.target.checked) {
            this.setState({rule: !!e.target.value});
        }
    }, onCurrencyChange: function (e) {
        this.setState({currencyId: e.target.value});
    }, onPrincipalChange: function (e) {
        this.setState({principal: e.target.value});
    }, onJudgedMoneyChange: function (e) {
        this.setState({judgedMoney: e.target.value});
    }, onJudgedFileChange: function (e) {
        var file = e.target.files[0];
        this.setState({judgedFile: file});
    }, onClaimInformationChange: function (e) {
        this.setState({claim_information: e.target.value});
    }, onAttachmentFileChange: function (e) {
        var file = e.target.files[0];
        this.setState({attachmentFile: file});
    }, onAttachmentNameChange: function (e) {
        this.setState({attachmentName: e.target.value});
    }, onAttachmentStyleChange: function (e) {
        if (e.target.checked) {
            this.setState({attachmentStyle: Number(e.target.value)});
        }
    }, addAttachment: function (e) {
        e.preventDefault();

    }, onRemoveAttachment: function (index) {
        var initial = this.state.attachments;
        if (initial.length === 1) {
            this.setState({attachments: []});
        } else if (index === 0) {
            this.setState({attachments: initial.slice(1)});
        } else if (index === initial.length - 1) {
            this.setState({attachments: initial.slice(0, index)});
        } else {
            this.setState({attachments: initial.slice(0, index).concat(initial.slice(index + 1))});
        }
    }, onDisplayChange: function (e) {
        this.setState({display: e.target.value});
    }, registerConfirm: function (user) {
        this.setState({agents: this.state.agents.concat(user)});
    }
});
module.exports = ClaimEditBody;