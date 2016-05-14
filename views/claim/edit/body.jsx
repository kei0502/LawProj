var React = require('react'), DeletableListItem = require('../../deletableListItem.jsx'), CurrencyOption = require('../../currencyOption.jsx'), $ = require('jquery');
var ClaimEditBody = React.createClass({
    getInitialState: function () {
        var claim = this.props.claim;
        if (claim) {
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
                currencyId: claim.currency,
                principal: claim.principal,
                interest: claim.interest,
                claim_information: claim.claim_information,
                attachments: claim.attachments,
                attachmentName: "",
                attachmentStyle: 1,
                display: claim.display,
                state: claim.state,
                editable: this.props.editable,
                newAttachments: [],
                attachmentMessage: "",
                principalMessage: "",
                message: ""
            };
        } else {
            return {
                name: "",
                representative: "",
                phone_representative: "",
                agents: [this.props.user],
                phone: "",
                fax: "",
                postcode: "",
                address: "",
                reason: "",
                guaranteed: false,
                guaranteedName: "",
                guaranteedMoney: "",
                guaranteedStyle: 1,
                judged: false,
                judgedMoney: "",
                rule: false,
                claim_type: 1,
                currencyId: this.props.currencies[0]._id,
                principal: "",
                claim_information: "",
                attachments: [],
                attachmentName: "",
                attachmentStyle: 1,
                display: "债权申请表",
                state: 1,
                editable: this.props.editable,
                newAttachments: [],
                attachmentMessage: "",
                principalMessage: "",
                message: ""
            };
        }
    }, render: function () {
        var agentList = this.state.agents.map(function (agent, i) {
            return (<DeletableListItem content={agent.name} remove={this.onRemoveAgent.bind(this,i)}
                                       deletable={this.state.editable&&agent._id!==this.props.user._id}/>);
        }.bind(this)), fileArea = this.props.claim && this.props.claim.file ? (<span>
            已上传<a href={this.props.claim.file} target="_blank">《债权申报书》</a>替换为:
        </span>) : (<span>必要时可上传《债权申报书》</span>), currencyOptions = this.props.currencies.map(function (currency) {
            return (<CurrencyOption {...currency}/>);
        }), fileList = this.state.attachments.map(function (attachment, i) {
            return (<DeletableListItem content={attachment.name} href={attachment.path}
                                       remove={this.onRemoveAttachment.bind(this,i)} deletable={this.state.editable}/>);
        }.bind(this)).concat(this.state.newAttachments.map(function (attachment, i) {
            return (<DeletableListItem content={attachment.name} href={attachment.path}
                                       remove={this.onRemoveNewAttachment.bind(this,i)}
                                       deletable={this.state.editable}/>);
        }.bind(this))), judgedFileLabel = this.props.claim && this.props.claim.judge ? (
            <label htmlFor="judgeFile" className="col-sm-2 control-label">
                <a href={this.props.claim.judge.file} target="_blank">凭证</a>已上传
            </label>) : (<label htmlFor="judgeFile" className="col-sm-2 control-label">必须上传凭证</label>);
        return (<div>
            <h1 className="page-header">添加债权申请表</h1>
            <div className="col-sm-12 col-md-12">
                <form className="form-horizontal">
                    <div className="form-group">
                        <label htmlFor="creditorInput" className="col-sm-3 control-label">债权人</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="creditorInput" value={this.state.name}
                                   onChange={this.onNameChange} disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="representativeInput" className="col-sm-3 control-label">法定代表人</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="representativeInput"
                                   value={this.state.representative} onChange={this.onRepresentativeChange}
                                   disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="representativeMobileInput" className="col-sm-3 control-label">法定代表人联系电话</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="representativeMobileInput"
                                   value={this.state.phone_representative} onChange={this.onPhoneRepresentativeChange}
                                   disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentInput1" className="col-sm-3 control-label">代理人</label>
                        <ul className="col-sm-6 file-list">{agentList}</ul>
                        <div className="col-md-2" style={this.state.editable?{}:{display:"none"}}>
                            <a href="#" className="btn btn-primary" id="addAgentButton"
                               onClick={this.props.registerStart}>
                                注册新代理人
                            </a>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentMobileInput" className="col-sm-3 control-label">联系电话</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="agentMobileInput" value={this.state.phone}
                                   onChange={this.onPhoneChange} disabled={!this.state.editable}/>
                        </div>
                        <label htmlFor="agentFaxInput" className="col-sm-2 control-label">传真</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="agentFaxInput" value={this.state.fax}
                                   onChange={this.onFaxChange} disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentCodeInput" className="col-sm-3 control-label">邮政编码</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="agentCodeInput" value={this.state.postcode}
                                   onChange={this.onPostcodeChange} disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="agentAddressInput" className="col-sm-3 control-label">地址</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="agentAddressInput"
                                   value={this.state.address} onChange={this.onAddressChange}
                                   disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="reasonInput" className="col-sm-3 control-label">债权形成原因</label>
                        <div className="col-sm-8">
                            <textarea className="form-control" id="reasonInput" value={this.state.reason}
                                      onChange={this.onReasonChange} disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-8 col-sm-offset-3" id="reasonArea">
                            {fileArea}
                            <input type="file" id="reasonFile" style={{display:'inline-block'}} ref="file"
                                   onChange={this.onFileChange} disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">债权有无担保</label>
                        <div className="col-sm-8">
                            <label className="radio-inline">
                                <input type="radio" name="guaranteeInput" value="" checked={!this.state.guaranteed}
                                       onChange={this.onGuaranteedChange} disabled={!this.state.editable}/>无
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="guaranteeInput" value="1" checked={this.state.guaranteed}
                                       onChange={this.onGuaranteedChange} disabled={!this.state.editable}/>有
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
                                           value={this.state.guaranteedName} onChange={this.onGuaranteedNameChange}
                                           disabled={!this.state.editable}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label htmlFor="guaranteeNumberInput" className="col-sm-3 control-label">担保人金额</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" id="guaranteeNumberInput"
                                           value={this.state.guaranteedMoney} onChange={this.onGuaranteedMoneyChange}
                                           disabled={!this.state.editable}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label className="col-sm-3 control-label">担保形式</label>
                                <div className="col-sm-8">
                                    <label className="radio-inline">
                                        <input type="radio" name="guaranteeTypeInput" value="1"
                                               checked={this.state.guaranteedStyle===1}
                                               onChange={this.onGuaranteedStyleChange} disabled={!this.state.editable}/>保证
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="guaranteeTypeInput" value="2"
                                               checked={this.state.guaranteedStyle===2}
                                               onChange={this.onGuaranteedStyleChange} disabled={!this.state.editable}/>抵押
                                    </label>
                                    <label className="radio-inline">
                                        <input type="radio" name="guaranteeTypeInput" value="3"
                                               checked={this.state.guaranteedStyle===3}
                                               onChange={this.onGuaranteedStyleChange} disabled={!this.state.editable}/>质押
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
                                       onChange={this.onJudgedChange} disabled={!this.state.editable}/>无
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="judgeInput" value="1" checked={this.state.judged}
                                       onChange={this.onJudgedChange} disabled={!this.state.editable}/>有
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">有无申请执行及裁定</label>
                        <div className="col-sm-8">
                            <label className="radio-inline">
                                <input type="radio" name="ruleInput" value="" checked={!this.state.rule}
                                       onChange={this.onRuleChange} disabled={!this.state.editable}/>无
                            </label>
                            <label className="radio-inline">
                                <input type="radio" name="ruleInput" value="1" checked={this.state.rule}
                                       onChange={this.onRuleChange} disabled={!this.state.editable}/>有
                            </label>
                        </div>
                    </div>
                    <hr/>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">申报债权金额</label>
                    </div>
                    <div className="form-group">
                        <label htmlFor="claimTypeInput" className="col-sm-3 control-label">债权类型</label>
                        <div className="col-sm-9">
                            <select id="claimTypeInput" className="form-control" value={this.state.claim_type}
                                    onChange={this.onClaimTypeChange} disabled={!this.state.editable}>
                                <option value="1">类型1</option>
                                <option value="2">类型2</option>
                                <option value="3">类型3</option>
                            </select>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="moneyTypeInput" className="col-sm-3 control-label">币种</label>
                        <div className="col-sm-3">
                            <select id="moneyTypeInput" className="form-control"
                                    value={this.state.currencyId}
                                    onChange={this.onCurrencyChange}
                                    disabled={!this.state.editable}>{currencyOptions}</select>
                        </div>
                        <label htmlFor="moneyTotalInput" className="col-sm-2 control-label">总金额</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="moneyTotalInput" disabled="disabled"
                                   value={(Number(this.state.principal)+(this.state.interest?this.state.interest.amount:0)).toFixed(2)}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="principalInput" className="col-sm-3 control-label">本金</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="principalInput" value={this.state.principal}
                                   onChange={this.onPrincipalChange} disabled={!this.state.editable}/>
                            <label className="text-danger control-label">{this.state.principalMessage}</label>
                        </div>
                        <label htmlFor="interestShow" className="col-sm-2 control-label">利息</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="interestShow"
                                   value={this.state.interest?this.state.interest.amount.toFixed(2):""}
                                   disabled={!this.state.editable} onFocus={this.onInterestFocus}/>
                        </div>
                    </div>
                    <div id="judgeArea" style={this.state.judged?{}:{display:'none'}} className="form-group">
                        <label htmlFor="principalInput" className="col-sm-3 control-label">诉讼/保全/执行费：</label>
                        <div className="col-sm-3">
                            <input type="text" className="form-control" id="judgeNumberInput"
                                   value={this.state.judgedMoney} onChange={this.onJudgedMoneyChange}
                                   disabled={!this.state.editable}/>
                        </div>
                        {judgedFileLabel}
                        <div className="col-sm-3">
                            <input id="judgeFile" type="file" onChange={this.onJudgedFileChange}
                                   disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="moreInput" className="col-sm-3 control-label">其它</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="moreInput"
                                   value={this.state.claim_information} onChange={this.onClaimInformationChange}
                                   disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <hr/>
                    <div id="fileArea" style={this.state.editable?{}:{display:"none"}}>
                        <div className="form-group">
                            <label className="col-sm-3 control-label">添加附件</label>
                        </div>
                        <div className="form-group">
                            <label htmlFor="moreInput" className="col-sm-3 control-label">上传附件</label>
                            <input type="file" className="col-sm-8" id="fileInput"
                                   onChange={this.onAttachmentFileChange} disabled={!this.state.editable}/>
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
                            <label className="col-sm-offset-3 col-sm-8 control-label" style={{textAlign: 'left'}}>同一类附件请打包上传<br/>
                                <span className="text-danger">{this.state.attachmentMessage}</span>
                            </label>
                        </div>
                        <div className="form-group">
                            <div className="col-sm-1 col-sm-offset-5">
                                <a href="#" className="btn btn-primary" id="addFileButton" onClick={this.addAttachment}>添加
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">附件列表</label>
                        <ul className="col-sm-8 file-list">{fileList}</ul>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-3 control-label">债券申请表备注名</label>
                        <div className="col-sm-8">
                            <input type="text" className="form-control" id="commentNameInput" value={this.state.display}
                                   onChange={this.onDisplayChange} disabled={!this.state.editable}/>
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="col-sm-offset-3 col-sm-8 control-label text-danger"
                               style={{textAlign: 'left'}}>{this.state.message}
                        </label>
                    </div>
                    <div className="form-group">
                        <div className="col-sm-offset-5 col-sm-5">
                            <button type="button" id="submitButton" className="btn btn-primary"
                                    style={this.state.editable?{}:{display:"none"}} onClick={this.onSubmit}>确定
                            </button>
                            <a href="#" id="editButton" className="btn btn-primary"
                               style={this.state.editable?{display:"none"}:{}} onClick={this.onEdit}>编辑</a>
                            <button type="button" id="printButton" className="btn btn-primary"
                                    style={this.state.editable?{display:"none"}:{}}>打印
                            </button>
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
    }, onRemoveAgent: function (index, e) {
        e.preventDefault();
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
    }, onClaimTypeChange: function (e) {
        this.setState({claim_type: e.target.value});
    }, onCurrencyChange: function (e) {
        this.setState({currencyId: e.target.value});
    }, onPrincipalChange: function (e) {
        var value = e.target.value;
        if (!value) {
            this.setState({principalMessage: "本金不能为空", principal: value});
        } else if (isNaN(Number(value))) {
            this.setState({principalMessage: "本金应为数字", principal: value});
        } else {
            this.props.onPrincipal(Number(value));
            this.setState({principalMessage: "", principal: value});
        }
    }, onInterestFocus: function (e) {
        e.preventDefault();
        var principal = this.state.principal;
        if (!principal) {
            this.setState({principalMessage: "本金不能为空"});
        } else if (isNaN(Number(principal))) {
            this.setState({principalMessage: "本金应为数字"});
        } else {
            this.setState({principalMessage: ""});
            this.props.interestStart(Number(principal));
        }
    }, onInterest: function (interest) {
        this.setState({interest: interest});
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
        if (this.state.attachmentName.length === 0) {
            this.setState({attachmentMessage: "附件名称不能为空"});
        } else if (!this.state.attachmentFile) {
            this.setState({attachmentMessage: "未选择文件"});
        } else {
            var name = this.state.attachmentName, file = this.state.attachmentFile;
            if (name.indexOf('.') < 0) {
                var fileName = file.name, index = fileName.lastIndexOf('.');
                if (index >= 0) {
                    name += fileName.substring(index);
                }
            }
            var newAttachments = this.state.newAttachments.concat({
                name: name,
                path: URL.createObjectURL(file),
                file: file,
                style: this.state.attachmentStyle
            });
            this.setState({attachmentName: "", attachmentMessage: "", newAttachments: newAttachments});
        }
    }, onRemoveAttachment: function (index, e) {
        e.preventDefault();
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
    }, onRemoveNewAttachment: function (index, e) {
        e.preventDefault();
        var initial = this.state.newAttachments;
        if (initial.length === 1) {
            this.setState({newAttachments: []});
        } else if (index === 0) {
            this.setState({newAttachments: initial.slice(1)});
        } else if (index === initial.length - 1) {
            this.setState({newAttachments: initial.slice(0, index)});
        } else {
            this.setState({newAttachments: initial.slice(0, index).concat(initial.slice(index + 1))});
        }
    }, onDisplayChange: function (e) {
        this.setState({display: e.target.value});
    }, registerConfirm: function (user) {
        this.setState({agents: this.state.agents.concat(user)});
    }, onEdit: function (e) {
        e.preventDefault();
        this.setState({editable: true});
    }, onSubmit: function (e) {
        if (!this.state.name) {
            this.setState({message: "债权人名称不能为空"});
        } else if (!this.state.representative) {
            this.setState({message: "法定代表人不能为空"});
        } else if (!this.state.phone_representative) {
            this.setState({message: "法定代表人联系电话不能为空"});
        } else if (!this.state.phone) {
            this.setState({message: "联系电话不能为空"});
        } else if (!this.state.postcode) {
            this.setState({message: "邮政编码不能为空"});
        } else if (!this.state.address) {
            this.setState({message: "地址不能为空"});
        } else if (!this.state.reason) {
            this.setState({message: "原因不能为空"});
        } else if (!this.state.principal) {
            this.setState({message: "本金不能为空"});
        } else if (isNaN(Number(this.state.principal))) {
            this.setState({message: "本金应为数字"});
        } else if (!this.state.display) {
            this.setState({message: "备注名不能为空"});
        } else {
            if (this.state.guaranteed) {
                if (!this.state.guaranteedName) {
                    this.setState({message: "担保人名称不能为空"});
                    return;
                } else if (!this.state.guaranteedMoney) {
                    this.setState({message: "担保金额不能为空"});
                    return;
                } else if (isNaN(Number(this.state.guaranteedMoney))) {
                    this.setState({message: "担保金额应为数字"});
                    return;
                }
            }
            if (this.state.judged) {
                if (isNaN(Number(this.state.judgedMoney))) {
                    this.setState({message: "诉讼费应为数字"});
                    return;
                }
                if (!(this.props.claim && this.props.claim.judge) && !this.state.judgedFile) {
                    this.setState({message: "必须上传诉讼费凭证"});
                    return;
                }
            }
            var formData = new FormData();
            formData.append("name", this.state.name);
            formData.append("representative", this.state.representative);
            formData.append("phone_representative", this.state.phone_representative);
            formData.append("agents", JSON.stringify(this.state.agents.map(function (agent) {
                return agent._id;
            })));
            formData.append("phone", this.state.phone);
            formData.append("fax", this.state.fax);
            formData.append("postcode", this.state.postcode);
            formData.append("address", this.state.address);
            formData.append("reason", this.state.reason);
            if (this.state.file) {
                formData.append("file", this.state.file);
            }
            if (this.state.guaranteed) {
                formData.append("guarantee", JSON.stringify({
                    name: this.state.guaranteedName,
                    money: Number(this.state.guaranteedMoney),
                    style: this.state.guaranteedStyle
                }));
            }
            if (this.state.judged) {
                formData.append("judgedMoney", this.state.judgedMoney);
                if (this.state.judgedFile) {
                    formData.append("judgedFile", this.state.judgedFile);
                }
            }
            formData.append("rule", this.state.rule ? "1" : "");
            formData.append("claim_type", this.state.claim_type);
            formData.append("currency", this.state.currencyId);
            formData.append("principal", this.state.principal);
            if (this.state.interest) {
                formData.append("interest", JSON.stringify(this.state.interest));
            }
            formData.append("claim_information", this.state.claim_information);
            formData.append("attachments", JSON.stringify(this.state.attachments));
            formData.append("newAttachments", JSON.stringify(this.state.newAttachments.map(function (attachment) {
                return {name: attachment.name, style: attachment.style};
            })));
            this.state.newAttachments.forEach(function (attachment, i) {
                formData.append("newAttachment" + i, attachment.file);
            });
            formData.append("display", this.state.display);
            if (!this.props.claim) {
                $.ajax("/claims?companyId=" + this.props.companyId, {
                    method: "POST", data: formData, contentType: false, processData: false, success: function (data) {
                        console.log(data);
                        location.href = "/claim/view?claimId=" + data._id;
                    }, error: function (xhr) {
                        if (xhr.statusCode) {
                            this.setState({message: xhr.responseJSON.error});
                        }
                    }.bind(this)
                });
            } else {

            }
        }
    }
});
module.exports = ClaimEditBody;