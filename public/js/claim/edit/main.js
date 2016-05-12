(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.main = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
'use strict';

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DeletableListItem = require('../../deletableListItem.jsx'),
    CurrencyOption = require('../../currencyOption.jsx');
var ClaimEditBody = React.createClass({
    displayName: 'ClaimEditBody',

    getInitialState: function getInitialState() {
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
    }, render: function render() {
        var agentList = this.state.agents.map((function (agent, i) {
            return React.createElement(DeletableListItem, { content: agent.name, remove: this.onRemoveAgent.bind(this, i),
                deletable: agent._id != this.props.userid });
        }).bind(this)),
            fileArea = this.props.claim.file ? React.createElement(
            'div',
            { className: 'col-sm-8 col-sm-offset-3', id: 'reasonArea' },
            '已上传',
            React.createElement(
                'a',
                { href: this.props.claim.file, target: '_blank' },
                '《债权申报书》'
            )
        ) : React.createElement(
            'div',
            { className: 'col-sm-8 col-sm-offset-3', id: 'reasonArea' },
            '必要时可上传《债权申报书》',
            React.createElement('input', { type: 'file', id: 'reasonFile', style: { display: 'inline-block' }, ref: 'file',
                onChange: this.onFileChange })
        ),
            currencyOptions = this.props.currencies.map(function (currency) {
            return React.createElement(CurrencyOption, currency);
        }),
            fileList = this.state.attachments.map((function (attachment, i) {
            return React.createElement(DeletableListItem, { content: attachment.name, href: attachment.path,
                remove: this.onRemoveAttachment.bind(this, i) });
        }).bind(this));
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
                                onChange: this.onNameChange })
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
                                value: this.state.representative, onChange: this.onRepresentativeChange })
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
                                value: this.state.phone_representative, onChange: this.onPhoneRepresentativeChange })
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
                            { className: 'col-md-2' },
                            React.createElement(
                                'button',
                                { className: 'btn btn-primary', id: 'addAgentButton', onClick: this.props.registerStart },
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
                                onChange: this.onPhoneChange })
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
                                onChange: this.onFaxChange })
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
                                onChange: this.onPostcodeChange })
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
                                value: this.state.address, onChange: this.onAddressChange })
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
                                onChange: this.onReasonChange })
                        )
                    ),
                    React.createElement(
                        'div',
                        { className: 'form-group' },
                        fileArea
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
                                    onChange: this.onGuaranteedChange }),
                                '无'
                            ),
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'guaranteeInput', value: '1', checked: this.state.guaranteed,
                                    onChange: this.onGuaranteedChange }),
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
                                        value: this.state.guaranteedName, onChange: this.onGuaranteedNameChange })
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
                                        value: this.state.guaranteedMoney, onChange: this.onGuaranteedMoneyChange })
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
                                            onChange: this.onGuaranteedStyleChange }),
                                        '保证'
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        React.createElement('input', { type: 'radio', name: 'guaranteeTypeInput', value: '2',
                                            checked: this.state.guaranteedStyle === 2,
                                            onChange: this.onGuaranteedStyleChange }),
                                        '抵押'
                                    ),
                                    React.createElement(
                                        'label',
                                        { className: 'radio-inline' },
                                        React.createElement('input', { type: 'radio', name: 'guaranteeTypeInput', value: '3',
                                            checked: this.state.guaranteedStyle === 3,
                                            onChange: this.onGuaranteedStyleChange }),
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
                                    onChange: this.onJudgedChange }),
                                '无'
                            ),
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'judgeInput', value: '1', checked: this.state.judged,
                                    onChange: this.onJudgedChange }),
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
                                    onChange: this.onRuleChange }),
                                '无'
                            ),
                            React.createElement(
                                'label',
                                { className: 'radio-inline' },
                                React.createElement('input', { type: 'radio', name: 'ruleInput', value: '1', checked: this.state.rule,
                                    onChange: this.onRuleChange }),
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
                                    onChange: this.onCurrencyChange },
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
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'moneyTotalInput', disabled: 'disabled' })
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
                                onChange: this.onPrincipalChange })
                        ),
                        React.createElement(
                            'label',
                            { htmlFor: 'interestShow', className: 'col-sm-2 control-label' },
                            '利息'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { type: 'text', className: 'form-control', id: 'interestShow' })
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
                                value: this.state.judgedMoney, onChange: this.onJudgedMoneyChange })
                        ),
                        React.createElement(
                            'label',
                            { htmlFor: 'judgeFile',
                                className: 'col-sm-2 control-label' },
                            this.props.judged ? '凭证已上传' : '必须上传凭证'
                        ),
                        React.createElement(
                            'div',
                            { className: 'col-sm-3' },
                            React.createElement('input', { id: 'judgeFile', type: 'file', onChange: this.onJudgedFileChange })
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
                                value: this.state.claim_information, onChange: this.onClaimInformationChange })
                        )
                    ),
                    React.createElement('hr', null),
                    React.createElement(
                        'div',
                        { id: 'fileArea' },
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
                                onchange: this.onAttachmentFileChange })
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
                                '同一类附件请打包上传'
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'form-group' },
                            React.createElement(
                                'div',
                                { className: 'col-sm-1 col-sm-offset-5' },
                                React.createElement(
                                    'button',
                                    { className: 'btn btn-primary', id: 'addFileButton', onClick: this.addAttachment },
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
                        React.createElement('ul', { className: 'col-sm-8 file-list' })
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
                                onChange: this.onDisplayChange })
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
                                { type: 'button', id: 'submitButton', className: 'btn btn-primary' },
                                '确定'
                            ),
                            React.createElement(
                                'a',
                                { href: 'userFormCreate.html?type=edit', id: 'editButton', className: 'btn btn-primary' },
                                '编辑'
                            ),
                            React.createElement(
                                'button',
                                { type: 'button', id: 'printButton', className: 'btn btn-primary' },
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
    }, onRemoveAgent: function onRemoveAgent(index) {
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
    }, onCurrencyChange: function onCurrencyChange(e) {
        this.setState({ currencyId: e.target.value });
    }, onPrincipalChange: function onPrincipalChange(e) {
        this.setState({ principal: e.target.value });
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
    }, onRemoveAttachment: function onRemoveAttachment(index) {
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
    }, onDisplayChange: function onDisplayChange(e) {
        this.setState({ display: e.target.value });
    }, registerConfirm: function registerConfirm(user) {
        this.setState({ agents: this.state.agents.concat(user) });
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

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null),
    DefaultLayout = require('../../layouts/default.jsx'),
    CreditorNavbar = require('../../navbars/creditor.jsx'),
    CreditorSidebar = require('../../sidebars/creditor.jsx'),
    ClaimEditBody = require('./body.jsx'),
    RegisterModal = require('../../modals/register.jsx'),
    $ = (typeof window !== "undefined" ? window['$'] : typeof global !== "undefined" ? global['$'] : null);
var ClaimEditView = React.createClass({
    displayName: 'ClaimEditView',

    render: function render() {
        var navbar = React.createElement(CreditorNavbar, { name: this.props.user.name, logout: this.logout }),
            sidebar = React.createElement(CreditorSidebar, { selected: this.props.claim.state ? 2 : 1 }),
            body = React.createElement(ClaimEditBody, { claim: this.props.claim, currencies: this.props.currencies,
            registerStart: this.registerStart, ref: 'body' });
        return React.createElement(
            DefaultLayout,
            { navbar: navbar, sidebar: sidebar, main: body },
            React.createElement(RegisterModal, { confirm: this.registerConfirm, ref: 'registerModal' })
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
    }
});
module.exports = ClaimEditView;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{"../../layouts/default.jsx":6,"../../modals/register.jsx":8,"../../navbars/creditor.jsx":9,"../../sidebars/creditor.jsx":10,"./body.jsx":1}],4:[function(require,module,exports){
(function (global){
"use strict";

var React = (typeof window !== "undefined" ? window['React'] : typeof global !== "undefined" ? global['React'] : null);
var CurrencyOption = React.createClass({
    displayName: "CurrencyOption",

    render: function render() {
        return React.createElement(
            "option",
            { value: this.props._id },
            this.props.name + " " + this.props.code + (this.props.exchange ? " -- " + this.props.exchange.rate : "")
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
                    $.ajax("users/register", {
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
},{"./default.jsx":7}],9:[function(require,module,exports){
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
},{}],10:[function(require,module,exports){
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
                    { href: "/claims/list" },
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