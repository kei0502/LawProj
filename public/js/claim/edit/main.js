(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DeletableListItem = require('../../deletableListItem.jsx'),
    CurrencyOption = require('../../currencyOption.jsx'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    moment = (typeof window !== "undefined" ? window['moment'] : typeof global !== "undefined" ? global['moment'] : null);
var ClaimEditBody = React.createClass({
    displayName: 'ClaimEditBody',

    getInitialState: function getInitialState() {
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
    }, render: function render() {
        var agentList = this.state.agents.map((function (agent, i) {
            return React.createElement(DeletableListItem, { content: agent.name, remove: this.onRemoveAgent.bind(this, i),
                deletable: this.state.editable && agent._id !== this.props.user._id });
        }).bind(this)),
            fileArea = this.props.claim && this.props.claim.file ? React.createElement(
            'span',
            null,
            '已上传',
            React.createElement(
                'a',
                { href: this.props.claim.file, target: '_blank' },
                '《债权申报书》'
            ),
            '替换为:'
        ) : React.createElement(
            'span',
            null,
            '必要时可上传《债权申报书》'
        ),
            currencyOptions = this.props.currencies.map(function (currency) {
            return React.createElement(CurrencyOption, currency);
        }),
            fileList = this.state.attachments.map((function (attachment, i) {
            return React.createElement(DeletableListItem, { content: attachment.name, href: attachment.path,
                remove: this.onRemoveAttachment.bind(this, i), deletable: this.state.editable });
        }).bind(this)).concat(this.state.newAttachments.map((function (attachment, i) {
            return React.createElement(DeletableListItem, { content: attachment.name, href: attachment.path,
                remove: this.onRemoveNewAttachment.bind(this, i),
                deletable: this.state.editable });
        }).bind(this))),
            judgedFileLabel = this.props.claim && this.props.claim.judge ? React.createElement(
            'label',
            { htmlFor: 'judgeFile', className: 'col-sm-2 control-label' },
            React.createElement(
                'a',
                { href: this.props.claim.judge.file, target: '_blank' },
                '凭证'
            ),
            '已上传'
        ) : React.createElement(
            'label',
            { htmlFor: 'judgeFile', className: 'col-sm-2 control-label' },
            '必须上传凭证'
        );
        return React.createElement(
            'div',
            null,
            React.createElement(
                'h1',
                { className: 'page-header' },
                '添加债权申请表'
            ),
            React.createElement(
                'div',
                { className: 'col-sm-12 col-md-12' },
                React.createElement(
                    'form',
                    { className: 'form-horizontal' },
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'creditorInput', className: 'col-sm-3 control-label' },
                            '债权人'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'creditorInput', value: this.state.name,
                                onChange: this.onNameChange, disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'representativeInput', className: 'col-sm-3 control-label' },
                            '法定代表人'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'representativeInput',
                                value: this.state.representative, onChange: this.onRepresentativeChange,
                                disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'representativeMobileInput', className: 'col-sm-3 control-label' },
                            '法定代表人联系电话'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'representativeMobileInput',
                                value: this.state.phone_representative, onChange: this.onPhoneRepresentativeChange,
                                disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'agentInput1', className: 'col-sm-3 control-label' },
                            '代理人'
                        ),
                        React.createElement(
                            'ul',
                            { className: 'col-sm-6 file-list' },
                            agentList
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-md-2', style: this.state.editable ? {} : { display: "none" } },
                            React.createElement(
                                'a',
                                { href: '#', className: 'btn btn-primary', id: 'addAgentButton',
                                    onClick: this.props.registerStart },
                                '注册新代理人'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'agentMobileInput', className: 'col-sm-3 control-label' },
                            '联系电话'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'agentMobileInput', value: this.state.phone,
                                onChange: this.onPhoneChange, disabled: !this.state.editable })
                        ),
                        React.createElement(
                            'label',
                            { htmlFor: 'agentFaxInput', className: 'col-sm-2 control-label' },
                            '传真'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'agentFaxInput', value: this.state.fax,
                                onChange: this.onFaxChange, disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'agentCodeInput', className: 'col-sm-3 control-label' },
                            '邮政编码'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'agentCodeInput', value: this.state.postcode,
                                onChange: this.onPostcodeChange, disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'agentAddressInput', className: 'col-sm-3 control-label' },
                            '地址'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'agentAddressInput',
                                value: this.state.address, onChange: this.onAddressChange,
                                disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'reasonInput', className: 'col-sm-3 control-label' },
                            '债权形成原因'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('textarea', { className: 'form-control', id: 'reasonInput', value: this.state.reason,
                                onChange: this.onReasonChange, disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-sm-8 col-sm-offset-3', id: 'reasonArea' },
                            fileArea,
                            React.createElement('input', { type: 'file', id: 'reasonFile', style: { display: 'inline-block' }, ref: 'file',
                                onChange: this.onFileChange, disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label' },
                            '债权有无担保'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'guaranteeInput', value: '', checked: !this.state.guaranteed,
                                    onChange: this.onGuaranteedChange, disabled: !this.state.editable }),
                                '无'
                            ),
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'guaranteeInput', value: '1', checked: this.state.guaranteed,
                                    onChange: this.onGuaranteedChange, disabled: !this.state.editable }),
                                '有'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'guaranteeArea', className: 'panel panel-default col-sm-10 col-sm-offset-1',
                            style: this.state.guaranteed ? {} : { display: 'none' } },
                        React.createElement(
                            'div',
                            { className: 'panel-body' },
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'guaranteeNameInput', className: 'col-sm-3 control-label' },
                                    '担保人名称'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-8' },
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'guaranteeNameInput',
                                        value: this.state.guaranteedName, onChange: this.onGuaranteedNameChange,
                                        disabled: !this.state.editable })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { htmlFor: 'guaranteeNumberInput', className: 'col-sm-3 control-label' },
                                    '担保人金额'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-8' },
                                    React.createElement('input', { type: 'text', className: 'form-control', id: 'guaranteeNumberInput',
                                        value: this.state.guaranteedMoney, onChange: this.onGuaranteedMoneyChange,
                                        disabled: !this.state.editable })
                                )
                            ),
                            React.createElement(
                                'div',
                                { className: 'form-group' },
                                React.createElement(
                                    'label',
                                    { className: 'col-sm-3 control-label' },
                                    '担保形式'
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'col-sm-8' },
                                    React.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        React.createElement('input', { type: 'radio', name: 'guaranteeTypeInput', value: '1',
                                            checked: this.state.guaranteedStyle === 1,
                                            onChange: this.onGuaranteedStyleChange, disabled: !this.state.editable }),
                                        '保证'
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        React.createElement('input', { type: 'radio', name: 'guaranteeTypeInput', value: '2',
                                            checked: this.state.guaranteedStyle === 2,
                                            onChange: this.onGuaranteedStyleChange, disabled: !this.state.editable }),
                                        '抵押'
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        React.createElement('input', { type: 'radio', name: 'guaranteeTypeInput', value: '3',
                                            checked: this.state.guaranteedStyle === 3,
                                            onChange: this.onGuaranteedStyleChange, disabled: !this.state.editable }),
                                        '质押'
                                    )
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label' },
                            '有无判决、裁定或仲裁裁决'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'judgeInput', value: '', checked: !this.state.judged,
                                    onChange: this.onJudgedChange, disabled: !this.state.editable }),
                                '无'
                            ),
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'judgeInput', value: '1', checked: this.state.judged,
                                    onChange: this.onJudgedChange, disabled: !this.state.editable }),
                                '有'
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label' },
                            '有无申请执行及裁定'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'ruleInput', value: '', checked: !this.state.rule,
                                    onChange: this.onRuleChange, disabled: !this.state.editable }),
                                '无'
                            ),
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'ruleInput', value: '1', checked: this.state.rule,
                                    onChange: this.onRuleChange, disabled: !this.state.editable }),
                                '有'
                            )
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label' },
                            '申报债权金额'
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'claimTypeInput', className: 'col-sm-3 control-label' },
                            '债权类型'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement(
                                'select',
                                { id: 'claimTypeInput', className: 'form-control', value: this.state.claim_type,
                                    onChange: this.onClaimTypeChange, disabled: !this.state.editable },
                                React.createElement(
                                    'option',
                                    { value: '1' },
                                    '类型1'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '2' },
                                    '类型2'
                                ),
                                React.createElement(
                                    'option',
                                    { value: '3' },
                                    '类型3'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'moneyTypeInput', className: 'col-sm-3 control-label' },
                            '币种'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement(
                                'select',
                                { id: 'moneyTypeInput', className: 'form-control',
                                    value: this.state.currencyId,
                                    onChange: this.onCurrencyChange,
                                    disabled: !this.state.editable },
                                currencyOptions
                            )
                        ),
                        React.createElement(
                            'label',
                            { htmlFor: 'moneyTotalInput', className: 'col-sm-2 control-label' },
                            '总金额'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'moneyTotalInput', disabled: 'disabled',
                                value: (Number(this.state.principal) + (this.state.interest ? this.state.interest.amount : 0)).toFixed(2) })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'principalInput', className: 'col-sm-3 control-label' },
                            '本金'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'principalInput', value: this.state.principal,
                                onChange: this.onPrincipalChange, disabled: !this.state.editable }),
                            React.createElement(
                                'label',
                                { className: 'text-danger control-label' },
                                this.state.principalMessage
                            )
                        ),
                        React.createElement(
                            'label',
                            { htmlFor: 'interestShow', className: 'col-sm-2 control-label' },
                            '利息'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'interestShow',
                                value: this.state.interest ? this.state.interest.amount.toFixed(2) : "",
                                disabled: !this.state.editable, onFocus: this.onInterestFocus })
                        )
                    ),
                    React.createElement(
                        'div',
                        { id: 'judgeArea', style: this.state.judged ? {} : { display: 'none' }, className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'principalInput', className: 'col-sm-3 control-label' },
                            '诉讼/保全/执行费：'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'judgeNumberInput',
                                value: this.state.judgedMoney, onChange: this.onJudgedMoneyChange,
                                disabled: !this.state.editable })
                        ),
                        judgedFileLabel,
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { id: 'judgeFile', type: 'file', onChange: this.onJudgedFileChange,
                                disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { htmlFor: 'moreInput', className: 'col-sm-3 control-label' },
                            '其它'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'moreInput',
                                value: this.state.claim_information, onChange: this.onClaimInformationChange,
                                disabled: !this.state.editable })
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { id: 'fileArea', style: this.state.editable ? {} : { display: "none" } },
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'col-sm-3 control-label' },
                                '添加附件'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { htmlFor: 'moreInput', className: 'col-sm-3 control-label' },
                                '上传附件'
                            ),
                            React.createElement('input', { type: 'file', className: 'col-sm-8', id: 'fileInput',
                                onChange: this.onAttachmentFileChange, disabled: !this.state.editable })
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'col-sm-3 control-label' },
                                '附件名'
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-8' },
                                React.createElement('input', { type: 'text', className: 'form-control', id: 'fileNameInput',
                                    value: this.state.attachmentName, onChange: this.onAttachmentNameChange })
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'col-sm-3 control-label' },
                                '附件类型'
                            ),
                            React.createElement(
                                'div',
                                { className: 'col-sm-7' },
                                React.createElement(
                                    'label',
                                    { className: 'radio-inline' },
                                    React.createElement('input', { type: 'radio', name: 'fileTypeInput', value: '1',
                                        checked: this.state.attachmentStyle === 1,
                                        onChange: this.onAttachmentStyleChange }),
                                    '申报书'
                                ),
                                React.createElement(
                                    'label',
                                    { className: 'radio-inline' },
                                    React.createElement('input', { type: 'radio', name: 'fileTypeInput', value: '2',
                                        checked: this.state.attachmentStyle === 2,
                                        onChange: this.onAttachmentStyleChange }),
                                    '证明材料'
                                ),
                                React.createElement(
                                    'label',
                                    { className: 'radio-inline' },
                                    React.createElement('input', { type: 'radio', name: 'fileTypeInput', value: '3',
                                        checked: this.state.attachmentStyle === 3,
                                        onChange: this.onAttachmentStyleChange }),
                                    '其他'
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'label',
                                { className: 'col-sm-offset-3 col-sm-8 control-label', style: { textAlign: 'left' } },
                                '同一类附件请打包上传',
                                React.createElement('br', null),
                                React.createElement(
                                    'span',
                                    { className: 'text-danger' },
                                    this.state.attachmentMessage
                                )
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-1 col-sm-offset-5' },
                                React.createElement(
                                    'a',
                                    { href: '#', className: 'btn btn-primary', id: 'addFileButton', onClick: this.addAttachment },
                                    '添加'
                                )
                            )
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label' },
                            '附件列表'
                        ),
                        React.createElement(
                            'ul',
                            { className: 'col-sm-8 file-list' },
                            fileList
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-3 control-label' },
                            '债券申请表备注名'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-8' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'commentNameInput', value: this.state.display,
                                onChange: this.onDisplayChange, disabled: !this.state.editable })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'label',
                            { className: 'col-sm-offset-3 col-sm-8 control-label text-danger',
                                style: { textAlign: 'left' } },
                            this.state.message
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        React.createElement(
                            'div',
                            { className: 'col-sm-offset-5 col-sm-5' },
                            React.createElement(
                                'button',
                                { type: 'button', id: 'submitButton', className: 'btn btn-primary',
                                    style: this.state.editable ? {} : { display: "none" }, onClick: this.onSubmit },
                                '确定'
                            ),
                            ' ',
                            React.createElement(
                                'a',
                                { href: '#', id: 'editButton', className: 'btn btn-primary',
                                    style: this.state.editable || moment(this.props.expire).isBefore(moment(), 'day') ? { display: "none" } : {},
                                    onClick: this.onEdit },
                                '编辑'
                            ),
                            ' ',
                            React.createElement(
                                'button',
                                { type: 'button', id: 'printButton', className: 'btn btn-primary',
                                    style: this.state.editable ? { display: "none" } : {} },
                                '打印'
                            )
                        )
                    )
                )
            )
        );
    }, onNameChange: function onNameChange(e) {
        this.setState({ name: e.target.value });
    }, onRepresentativeChange: function onRepresentativeChange(e) {
        this.setState({ representative: e.target.value });
    }, onPhoneRepresentativeChange: function onPhoneRepresentativeChange(e) {
        this.setState({ phone_representative: e.target.value });
    }, onRemoveAgent: function onRemoveAgent(index, e) {
        e.preventDefault();
        var initial = this.state.agents;
        if (index === 0) {
            this.setState({ agents: initial.slice(1) });
        } else if (index === initial.length - 1) {
            this.setState({ agents: initial.slice(0, index) });
        } else {
            this.setState({ agents: initial.slice(0, index).concat(initial.slice(index + 1)) });
        }
    }, onPhoneChange: function onPhoneChange(e) {
        this.setState({ phone: e.target.value });
    }, onFaxChange: function onFaxChange(e) {
        this.setState({ fax: e.target.value });
    }, onPostcodeChange: function onPostcodeChange(e) {
        this.setState({ postcode: e.target.value });
    }, onAddressChange: function onAddressChange(e) {
        this.setState({ address: e.target.value });
    }, onReasonChange: function onReasonChange(e) {
        this.setState({ reason: e.target.value });
    }, onFileChange: function onFileChange(e) {
        var file = e.target.files[0];
        this.setState({ file: file });
    }, onGuaranteedChange: function onGuaranteedChange(e) {
        if (e.target.checked) {
            this.setState({ guaranteed: !!e.target.value });
        }
    }, onGuaranteedNameChange: function onGuaranteedNameChange(e) {
        this.setState({ guaranteedName: e.target.value });
    }, onGuaranteedMoneyChange: function onGuaranteedMoneyChange(e) {
        this.setState({ guaranteedMoney: e.target.value });
    }, onGuaranteedStyleChange: function onGuaranteedStyleChange(e) {
        if (e.target.checked) {
            this.setState({ guaranteedStyle: Number(e.target.value) });
        }
    }, onJudgedChange: function onJudgedChange(e) {
        if (e.target.checked) {
            this.setState({ judged: !!e.target.value });
        }
    }, onRuleChange: function onRuleChange(e) {
        if (e.target.checked) {
            this.setState({ rule: !!e.target.value });
        }
    }, onClaimTypeChange: function onClaimTypeChange(e) {
        this.setState({ claim_type: e.target.value });
    }, onCurrencyChange: function onCurrencyChange(e) {
        this.setState({ currencyId: e.target.value });
    }, onPrincipalChange: function onPrincipalChange(e) {
        var value = e.target.value;
        if (!value) {
            this.setState({ principalMessage: "本金不能为空", principal: value });
        } else if (isNaN(Number(value))) {
            this.setState({ principalMessage: "本金应为数字", principal: value });
        } else {
            this.props.onPrincipal(Number(value));
            this.setState({ principalMessage: "", principal: value });
        }
    }, onInterestFocus: function onInterestFocus(e) {
        e.preventDefault();
        var principal = this.state.principal;
        if (!principal) {
            this.setState({ principalMessage: "本金不能为空" });
        } else if (isNaN(Number(principal))) {
            this.setState({ principalMessage: "本金应为数字" });
        } else {
            this.setState({ principalMessage: "" });
            this.props.interestStart(Number(principal));
        }
    }, onInterest: function onInterest(interest) {
        this.setState({ interest: interest });
    }, onJudgedMoneyChange: function onJudgedMoneyChange(e) {
        this.setState({ judgedMoney: e.target.value });
    }, onJudgedFileChange: function onJudgedFileChange(e) {
        var file = e.target.files[0];
        this.setState({ judgedFile: file });
    }, onClaimInformationChange: function onClaimInformationChange(e) {
        this.setState({ claim_information: e.target.value });
    }, onAttachmentFileChange: function onAttachmentFileChange(e) {
        var file = e.target.files[0];
        this.setState({ attachmentFile: file });
    }, onAttachmentNameChange: function onAttachmentNameChange(e) {
        this.setState({ attachmentName: e.target.value });
    }, onAttachmentStyleChange: function onAttachmentStyleChange(e) {
        if (e.target.checked) {
            this.setState({ attachmentStyle: Number(e.target.value) });
        }
    }, addAttachment: function addAttachment(e) {
        e.preventDefault();
        if (this.state.attachmentName.length === 0) {
            this.setState({ attachmentMessage: "附件名称不能为空" });
        } else if (!this.state.attachmentFile) {
            this.setState({ attachmentMessage: "未选择文件" });
        } else {
            var name = this.state.attachmentName,
                file = this.state.attachmentFile;
            if (name.indexOf('.') < 0) {
                var fileName = file.name,
                    index = fileName.lastIndexOf('.');
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
            this.setState({ attachmentName: "", attachmentMessage: "", newAttachments: newAttachments });
        }
    }, onRemoveAttachment: function onRemoveAttachment(index, e) {
        e.preventDefault();
        var initial = this.state.attachments;
        if (initial.length === 1) {
            this.setState({ attachments: [] });
        } else if (index === 0) {
            this.setState({ attachments: initial.slice(1) });
        } else if (index === initial.length - 1) {
            this.setState({ attachments: initial.slice(0, index) });
        } else {
            this.setState({ attachments: initial.slice(0, index).concat(initial.slice(index + 1)) });
        }
    }, onRemoveNewAttachment: function onRemoveNewAttachment(index, e) {
        e.preventDefault();
        var initial = this.state.newAttachments;
        if (initial.length === 1) {
            this.setState({ newAttachments: [] });
        } else if (index === 0) {
            this.setState({ newAttachments: initial.slice(1) });
        } else if (index === initial.length - 1) {
            this.setState({ newAttachments: initial.slice(0, index) });
        } else {
            this.setState({ newAttachments: initial.slice(0, index).concat(initial.slice(index + 1)) });
        }
    }, onDisplayChange: function onDisplayChange(e) {
        this.setState({ display: e.target.value });
    }, registerConfirm: function registerConfirm(user) {
        this.setState({ agents: this.state.agents.concat(user) });
    }, onEdit: function onEdit(e) {
        e.preventDefault();
        this.setState({ editable: true });
    }, onSubmit: function onSubmit(e) {
        if (!this.state.name) {
            this.setState({ message: "债权人名称不能为空" });
        } else if (!this.state.representative) {
            this.setState({ message: "法定代表人不能为空" });
        } else if (!this.state.phone_representative) {
            this.setState({ message: "法定代表人联系电话不能为空" });
        } else if (!this.state.phone) {
            this.setState({ message: "联系电话不能为空" });
        } else if (!this.state.postcode) {
            this.setState({ message: "邮政编码不能为空" });
        } else if (!this.state.address) {
            this.setState({ message: "地址不能为空" });
        } else if (!this.state.reason) {
            this.setState({ message: "原因不能为空" });
        } else if (!this.state.principal) {
            this.setState({ message: "本金不能为空" });
        } else if (isNaN(Number(this.state.principal))) {
            this.setState({ message: "本金应为数字" });
        } else if (!this.state.display) {
            this.setState({ message: "备注名不能为空" });
        } else {
            if (this.state.guaranteed) {
                if (!this.state.guaranteedName) {
                    this.setState({ message: "担保人名称不能为空" });
                    return;
                } else if (!this.state.guaranteedMoney) {
                    this.setState({ message: "担保金额不能为空" });
                    return;
                } else if (isNaN(Number(this.state.guaranteedMoney))) {
                    this.setState({ message: "担保金额应为数字" });
                    return;
                }
            }
            if (this.state.judged) {
                if (isNaN(Number(this.state.judgedMoney))) {
                    this.setState({ message: "诉讼费应为数字" });
                    return;
                }
                if (!(this.props.claim && this.props.claim.judge) && !this.state.judgedFile) {
                    this.setState({ message: "必须上传诉讼费凭证" });
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
                formData.append("judgedMoney", Number(this.state.judgedMoney));
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
                return { name: attachment.name, style: attachment.style };
            })));
            this.state.newAttachments.forEach(function (attachment, i) {
                formData.append("newAttachment" + i, attachment.file);
            });
            formData.append("display", this.state.display);
            if (!this.props.claim) {
                $.ajax("/claims?companyId=" + this.props.companyId, {
                    method: "POST", data: formData, contentType: false, processData: false, success: function success(data) {
                        location.href = "/claim/view/" + data._id;
                    }, error: (function (xhr) {
                        if (xhr.statusCode) {
                            this.setState({ message: xhr.responseJSON.error });
                        }
                    }).bind(this)
                });
            } else {
                $.ajax("/claims/" + this.props.claim._id, {
                    method: "PUT", data: formData, contentType: false, processData: false, success: function success(data) {
                        location.reload();
                    }, error: (function (xhr) {
                        if (xhr.statusCode) {
                            this.setState({ message: xhr.responseJSON.error });
                        }
                    }).bind(this)
                });
            }
        }
    }
});
module.exports = ClaimEditBody;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../currencyOption.jsx":4,"../../deletableListItem.jsx":5}],2:[function(require,module,exports){
(function (global){
/**
 * Created by gyz on 16/5/10.
 */
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    ReactDOM = (typeof window !== "undefined" ? window['ReactDOM'] : typeof global !== "undefined" ? global['ReactDOM'] : null),
    View = require('./view.jsx');
module.exports = function (data, containerId) {
  var container = document.getElementById(containerId || 'container');
  ReactDOM.render(React.createElement(View, data), container);
};

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./view.jsx":3}],3:[function(require,module,exports){
(function (global){
'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultLayout = require('../../layouts/default.jsx'),
    CreditorNavbar = require('../../navbars/creditor.jsx'),
    CreditorSidebar = require('../../sidebars/creditor.jsx'),
    ClaimEditBody = require('./body.jsx'),
    RegisterModal = require('../../modals/register.jsx'),
    InterestModal = require('../../modals/interest.jsx'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var ClaimEditView = React.createClass({
    displayName: 'ClaimEditView',

    getInitialState: function getInitialState() {
        if (this.props.claim) {
            var claim = this.props.claim;
            if (claim.interest) {
                return {
                    principal: claim.principal,
                    start: claim.interest.start,
                    calculate: claim.interest.calculate,
                    amount: claim.interest.amount
                };
            } else {
                return { principal: claim.principal };
            }
        } else {
            return { principal: 0 };
        }
    }, render: function render() {
        var navbar = React.createElement(CreditorNavbar, { name: this.props.user.name, logout: this.logout }),
            sidebar = React.createElement(CreditorSidebar, { selected: this.props.claim ? 2 : 1 }),
            body = React.createElement(ClaimEditBody, _extends({}, this.props, { registerStart: this.registerStart, interestStart: this.interestStart,
            onPrincipal: this.onPrincipal, ref: 'body' }));
        return React.createElement(
            DefaultLayout,
            { navbar: navbar, sidebar: sidebar, main: body },
            React.createElement(RegisterModal, { confirm: this.registerConfirm, ref: 'registerModal' }),
            React.createElement(InterestModal, { principal: this.state.principal, start: this.state.start, amount: this.state.amount,
                end: this.props.settlement, confirm: this.interestConfirm, ref: 'interestModal' })
        );
    }, logout: function logout(e) {
        e.preventDefault();
        $.get("/users/logout", function () {
            location.href = "/";
        });
    }, registerStart: function registerStart(e) {
        e.preventDefault();
        this.refs.registerModal.show();
    }, registerConfirm: function registerConfirm(user) {
        this.refs.body.registerConfirm(user);
    }, onPrincipal: function onPrincipal(principal) {
        this.refs.interestModal.onPrincipal(principal);
    }, interestStart: function interestStart(principal) {
        this.refs.interestModal.show();
    }, interestConfirm: function interestConfirm(interest) {
        this.refs.body.onInterest(interest);
    }
});
module.exports = ClaimEditView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../layouts/default.jsx":6,"../../modals/interest.jsx":8,"../../modals/register.jsx":9,"../../navbars/creditor.jsx":10,"../../sidebars/creditor.jsx":11,"./body.jsx":1}],4:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CurrencyOption = React.createClass({
    displayName: "CurrencyOption",

    render: function render() {
        return React.createElement(
            "option",
            { value: this.props._id },
            this.props.name + " " + this.props.code + (this.props.exchange && this.props.exchange.length > 0 ? " -- " + this.props.exchange[0].rate : "")
        );
    }
});
module.exports = CurrencyOption;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],5:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var DeletableListItem = React.createClass({
    displayName: 'DeletableListItem',

    getDefaultProps: function getDefaultProps() {
        return { target: '_blank', deletable: true };
    }, render: function render() {
        var text = this.props.href ? React.createElement(
            'a',
            { href: this.props.href,
                target: this.props.target },
            this.props.content
        ) : this.props.content,
            remove = this.props.deletable ? React.createElement(
            'a',
            { href: '#', onClick: this.props.remove },
            '移除'
        ) : "";
        return React.createElement(
            'li',
            null,
            text,
            remove
        );
    }
});
module.exports = DeletableListItem;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],6:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var DefaultLayout = React.createClass({
    displayName: "DefaultLayout",

    render: function render() {
        return React.createElement(
            "div",
            null,
            React.createElement(
                "nav",
                { className: "navbar navbar-inverse navbar-fixed-top" },
                React.createElement(
                    "div",
                    { className: "container-fluid" },
                    React.createElement(
                        "div",
                        { className: "navbar-header" },
                        React.createElement(
                            "button",
                            { type: "button", className: "navbar-toggle collapsed", "data-toggle": "collapse",
                                "data-target": "#navbar",
                                "aria-expanded": "false", "aria-controls": "navbar" },
                            React.createElement(
                                "span",
                                { className: "sr-only" },
                                "Toggle navigation"
                            ),
                            React.createElement("span", { className: "icon-bar" }),
                            React.createElement("span", { className: "icon-bar" }),
                            React.createElement("span", { className: "icon-bar" })
                        ),
                        React.createElement(
                            "a",
                            { className: "navbar-brand", href: "/" },
                            "法务原型"
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "navbar-collapse collapse" },
                        this.props.navbar
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "container-fluid" },
                React.createElement(
                    "div",
                    { className: "row" },
                    React.createElement(
                        "div",
                        { className: "col-sm-3 col-md-2 sidebar" },
                        this.props.sidebar
                    )
                )
            ),
            React.createElement(
                "div",
                { className: "col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main" },
                this.props.main
            ),
            this.props.children
        );
    }
});
module.exports = DefaultLayout;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],7:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var DefaultModal = React.createClass({
    displayName: 'DefaultModal',

    show: function show() {
        $(this.refs.root).modal('show');
    }, hide: function hide() {
        $(this.refs.root).modal('hide');
    }, render: function render() {
        return React.createElement(
            'div',
            { className: 'modal fade', id: this.props.name + "Modal", tabIndex: '-1', role: 'dialog',
                'aria-labelledby': this.props.name + "ModalLabel", ref: 'root' },
            React.createElement(
                'div',
                { className: 'modal-dialog', role: 'document' },
                React.createElement(
                    'div',
                    { className: 'modal-content' },
                    React.createElement(
                        'div',
                        { className: 'modal-header' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'close', 'data-dismiss': 'modal', 'aria-label': 'Close' },
                            React.createElement(
                                'span',
                                {
                                    'aria-hidden': 'true' },
                                '×'
                            )
                        ),
                        React.createElement(
                            'h4',
                            { className: 'modal-title', id: this.props.name + "ModalLabel" },
                            this.props.title
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-body' },
                        this.props.children
                    ),
                    React.createElement(
                        'div',
                        { className: 'modal-footer' },
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-primary', onClick: this.props.confirm },
                            '确定'
                        ),
                        React.createElement(
                            'button',
                            { type: 'button', className: 'btn btn-default', 'data-dismiss': 'modal' },
                            '关闭'
                        )
                    )
                )
            )
        );
    }
});
module.exports = DefaultModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],8:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultModal = require('./default.jsx'),
    moment = (typeof window !== "undefined" ? window['moment'] : typeof global !== "undefined" ? global['moment'] : null),
    DateTimeField = (typeof window !== "undefined" ? window['ReactBootstrapDatetimepicker'] : typeof global !== "undefined" ? global['ReactBootstrapDatetimepicker'] : null);
var InterestModal = React.createClass({
    displayName: 'InterestModal',

    getDefaultProps: function getDefaultProps() {
        return { calculate: "", format: "YYYY-MM-DD", amount: 0 };
    }, getInitialState: function getInitialState() {
        return {
            principal: this.props.principal,
            calculate: this.props.calculate,
            start: this.props.start ? this.props.start : this.props.end,
            amount: this.props.amount
        };
    }, render: function render() {
        return React.createElement(
            DefaultModal,
            { name: 'interest', title: '利息', ref: 'modal', confirm: this.confirm },
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'principalShow', className: 'col-sm-3 control-label' },
                        '本金'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'principalShow', disabled: 'disabled',
                            value: this.state.principal.toFixed(2) })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'calculateInput' },
                        '计算方法'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement(
                            'select',
                            { className: 'form-control', id: 'calculateInput', value: this.state.calculate,
                                onChange: this.onCalculateChange },
                            React.createElement(
                                'option',
                                { value: '' },
                                '无利息'
                            ),
                            React.createElement(
                                'option',
                                { value: '1' },
                                '百元基数计息法'
                            ),
                            React.createElement(
                                'option',
                                { value: '2' },
                                '积数计息法'
                            ),
                            React.createElement(
                                'option',
                                { value: '3' },
                                '利余'
                            ),
                            React.createElement(
                                'option',
                                { value: '4' },
                                '其他'
                            )
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'startDateInput' },
                        '起始日期'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement(DateTimeField, { dateTime: this.props.start ? this.props.start : this.props.end,
                            format: this.props.format, inputFormat: this.props.format, mode: 'date',
                            inputProps: { id: 'startDateInput', className: 'form-control' },
                            onChange: this.onStartChange, maxDate: moment(this.props.end) })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-3 control-label', htmlFor: 'endDateInput' },
                        '截止日期'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { id: 'endDateInput', type: 'text', className: 'form-control', value: this.props.end,
                            disabled: 'disabled' })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'interestInput', className: 'col-sm-3 control-label' },
                        '利息'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'interestInput', disabled: 'disabled',
                            value: this.state.amount.toFixed(2) })
                    )
                )
            )
        );
    }, hide: function hide() {
        this.refs.modal.hide();
    }, show: function show() {
        this.refs.modal.show();
    }, onPrincipal: function onPrincipal(principal) {
        var amount = this.state.calculate ? principal * 0.05 : 0;
        if (this.state.calculate) {
            this.props.confirm({
                calculate: this.state.calculate,
                state: this.props.start,
                amount: amount
            });
        } else {
            this.props.confirm();
        }
        this.setState({ principal: principal, amount: amount });
    }, onCalculateChange: function onCalculateChange(e) {
        var value = e.target.value;
        this.setState({ calculate: value, amount: value ? this.state.principal * 0.05 : 0 });
    }, onStartChange: function onStartChange(e) {
        this.setState({ start: e });
    }, confirm: function confirm(e) {
        e.preventDefault();
        if (this.state.calculate) {
            this.props.confirm({ calculate: this.state.calculate, start: this.props.start, amount: this.state.amount });
        } else {
            this.props.confirm();
        }
        this.hide();
    }
});
module.exports = InterestModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./default.jsx":7}],9:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null),
    DefaultModal = require('./default.jsx'),
    bcrypt = (typeof window !== "undefined" ? window['dcodeIO']['bcrypt'] : typeof global !== "undefined" ? global['dcodeIO']['bcrypt'] : null);
var RegisterModal = React.createClass({
    displayName: 'RegisterModal',

    getInitialState: function getInitialState() {
        return { username: "", name: "", password: "", repeat: "", message: "", salt: "" };
    },
    render: function render() {
        return React.createElement(
            DefaultModal,
            { name: 'register', title: '注册', ref: 'modal', confirm: this.confirm },
            React.createElement(
                'form',
                { className: 'form-horizontal' },
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newusernameInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '用户名'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'newusernameInput', placeholder: '请输入用户名(长度至少6位以上)',
                            value: this.state.username, onChange: this.onUsernameChange,
                            onBlur: this.onUsernameBlur })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newnameInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '真实姓名'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'text', className: 'form-control', id: 'newnameInput', placeholder: '真实姓名',
                            value: this.state.name, onChange: this.onNameChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newpasswordInput', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '密码'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'newpasswordInput',
                            placeholder: '请输入密码(长度至少6位以上)',
                            value: this.state.password, onChange: this.onPasswordChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { htmlFor: 'newpassword2Input', className: 'col-sm-2 col-sm-offset-1 control-label' },
                        '确认密码'
                    ),
                    React.createElement(
                        'div',
                        { className: 'col-sm-7' },
                        React.createElement('input', { type: 'password', className: 'form-control', id: 'newpassword2Input', placeholder: '请再输入一次密码',
                            value: this.state.repeat, onChange: this.onRepeatChange })
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'form-group' },
                    React.createElement(
                        'label',
                        { className: 'col-sm-12 text-center text-danger' },
                        this.state.message
                    )
                )
            )
        );
    }, hide: function hide() {
        this.refs.modal.hide();
    }, show: function show() {
        this.refs.modal.show();
    }, confirm: function confirm(e) {
        e.preventDefault();
        var username = this.state.username,
            name = this.state.name,
            password = this.state.password,
            repeat = this.state.repeat,
            salt = this.state.salt;
        if (username.length < 6) {
            this.setState({ password: "", repeat: "", message: "用户名长度至少6位" });
        } else if (!name) {
            this.setState({ password: "", repeat: "", message: "真实姓名不能为空" });
        } else if (password.length < 6) {
            this.setState({ password: "", repeat: "", message: "密码长度至少6位" });
        } else if (password !== repeat) {
            this.setState({ password: "", repeat: "", message: "密码确认不一致" });
        } else if (!salt) {
            this.setState({ password: "", repeat: "", message: "用户名已存在" });
        } else {
            bcrypt.hash(password, salt, (function (err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    $.ajax("/users/register", {
                        method: "POST",
                        data: { username: username, name: name, password: hash, salt1: salt },
                        success: (function (data) {
                            if (this.props.confirm) {
                                this.props.confirm(data);
                            }
                            this.hide();
                            this.setState({ username: "", name: "", password: "", repeat: "", message: "", salt: "" });
                        }).bind(this),
                        error: (function (xhr) {
                            if (xhr.status) {
                                this.setState({ password: "", repeat: "", message: xhr.responseJSON.error });
                            }
                        }).bind(this)
                    });
                }
            }).bind(this));
        }
    }, onUsernameChange: function onUsernameChange(e) {
        var username = e.target.value;
        this.setState({ username: username, message: username.length < 6 ? "用户名长度至少6位" : "" });
    }, onNameChange: function onNameChange(e) {
        this.setState({ name: e.target.value });
    }, onUsernameBlur: function onUsernameBlur(e) {
        var username = e.target.value;
        if (username.length < 6) {
            this.setState({ message: "用户名长度至少6位" });
        } else {
            $.ajax("/users/register?username=" + encodeURIComponent(username), {
                success: (function (data) {
                    this.setState({ salt: data.salt1, message: "" });
                }).bind(this), error: (function (xhr) {
                    if (xhr.status) {
                        this.setState({ message: xhr.responseJSON.error });
                    }
                }).bind(this)
            });
        }
    }, onPasswordChange: function onPasswordChange(e) {
        var password = e.target.value;
        this.setState({
            password: password,
            message: password.length < 6 ? "密码长度至少6位" : password == this.state.repeat ? "" : "密码确认不一致"
        });
    }, onRepeatChange: function onRepeatChange(e) {
        var repeat = e.target.value;
        this.setState({ repeat: repeat, message: this.state.password == repeat ? "" : "密码确认不一致" });
    }
});
module.exports = RegisterModal;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"./default.jsx":7}],10:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CreditorNavbar = React.createClass({
    displayName: "CreditorNavbar",

    getInitialState: function getInitialState() {
        return { expanded: false };
    }, render: function render() {
        return React.createElement(
            "ul",
            { className: "nav navbar-nav navbar-right" },
            React.createElement(
                "li",
                { className: this.state.expanded ? "dropdown open" : "dropdown" },
                React.createElement(
                    "a",
                    { className: "dropdown-toggle", role: "button", "aria-haspopup": "true",
                        "aria-expanded": this.state.expanded, href: "#", onClick: this.expand },
                    React.createElement("span", {
                        className: "glyphicon glyphicon-user" }),
                    " ",
                    this.props.name
                ),
                React.createElement(
                    "ul",
                    { className: "dropdown-menu" },
                    React.createElement(
                        "li",
                        null,
                        React.createElement(
                            "a",
                            { href: "#", onClick: this.props.logout },
                            React.createElement("span", { className: "glyphicon glyphicon-log-out" }),
                            " 退出"
                        )
                    )
                )
            )
        );
    }, expand: function expand(e) {
        e.preventDefault();
        this.setState({ expanded: !this.state.expanded });
    }
});
module.exports = CreditorNavbar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}],11:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CreditorSidebar = React.createClass({
    displayName: "CreditorSidebar",

    getDefaultProps: function getDefaultProps() {
        return { selected: 0 };
    },
    render: function render() {
        return React.createElement(
            "ul",
            { className: "nav nav-sidebar" },
            React.createElement(
                "li",
                { className: this.props.selected === 0 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "/" },
                    "首页"
                )
            ),
            React.createElement(
                "li",
                { className: this.props.selected === 1 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "/company/apply" },
                    "添加债权申请表"
                )
            ),
            React.createElement(
                "li",
                { className: this.props.selected === 2 ? "active" : "" },
                React.createElement(
                    "a",
                    { href: "/claim/list" },
                    "查看债权申请表"
                )
            )
        );
    }
});
module.exports = CreditorSidebar;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[2])(2)
});