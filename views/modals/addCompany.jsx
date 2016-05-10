var React = require('react'), DefaultModal = require('./default.jsx'), DateTimeField = require('react-bootstrap-datetimepicker'), moment = require('moment'), $ = require('jquery');
var AddCompanyModal = React.createClass({
    getInitialState(){
        var format = "YYYY-MM-DD", current = moment(), date = current.format(format);
        return {
            cid: "",
            name: "",
            format: format,
            current: current,
            date: date,
            message: "",
            create: date,
            settlement: date,
            expire: date
        };
    }, render: function () {
        return (<DefaultModal name="addCompany" title="新增企业信息" ref="modal" confirm={this.confirm}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label className="col-sm-2 col-sm-offset-1 control-label" htmlFor="inputCidAdd">公司编号</label>
                    <div className="col-sm-7">
                        <input id="inputCidAdd" type="text" className="form-control" placeholder="公司编号"
                               value={this.state.cid} onChange={this.onCidChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-sm-offset-1 control-label" htmlFor="inputNameAdd">公司名称</label>
                    <div className="col-sm-7">
                        <input id="inputNameAdd" type="text" className="form-control" placeholder="公司名称"
                               value={this.state.name} onChange={this.onNameChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-sm-offset-1 control-label" htmlFor="inputCreateAdd">创建日期</label>
                    <div className="col-sm-7">
                        <DateTimeField dateTime={this.state.date} format={this.state.format}
                                       inputFormat={this.state.format} mode="date"
                                       inputProps={{id:'inputCreateAdd',className:'form-control'}}
                                       onChange={this.onCreateChange} maxDate={this.state.current}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-sm-offset-1 control-label" htmlFor="inputSettlementAdd">结算日期</label>
                    <div className="col-sm-7">
                        <DateTimeField dateTime={this.state.date} format={this.state.format}
                                       inputFormat={this.state.format} mode="date"
                                       inputProps={{id:'inputSettlementAdd',className:'form-control'}}
                                       onChange={this.onSettlementChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-2 col-sm-offset-1 control-label" htmlFor="inputExpireAdd">申请截止</label>
                    <div className="col-sm-7">
                        <DateTimeField dateTime={this.state.date} format={this.state.format}
                                       inputFormat={this.state.format} mode="date"
                                       inputProps={{id:'inputExpireAdd',className:'form-control'}}
                                       onChange={this.onExpireChange} minDate={this.state.current}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-12 text-center text-danger">{this.state.message}</label>
                </div>
            </form>
        </DefaultModal>);
    }, hide: function () {
        this.refs.modal.hide();
    }, show: function () {
        this.refs.modal.show();
    }, confirm: function (e) {
        if (!this.state.cid) {
            this.setState({message: "公司编号不能为空"});
        } else if (!this.state.name) {
            this.setState({message: "公司名称不能为空"});
        } else {
            $.ajax("/companies", {
                method: 'POST',
                data: {
                    cid: this.state.cid,
                    name: this.state.name,
                    create: this.state.create,
                    settlement: this.state.settlement,
                    expire: this.state.expire
                }, success: function (data) {
                    if (this.props.confirm) {
                        this.props.confirm(data);
                    }
                    this.hide();
                    this.setState({cid: "", name: "", message: ""});
                }.bind(this), error: function (xhr) {
                    if (xhr.status) {
                        this.setState({message: xhr.responseJSON.error});
                    }
                }.bind(this)
            });
        }
    }, onCidChange: function (e) {
        this.setState({cid: e.target.value});
    }, onNameChange: function (e) {
        this.setState({name: e.target.value});
    }, onCreateChange: function (x) {
        this.setState({create: x});
    }, onSettlementChange: function (x) {
        this.setState({settlement: x});
    }, onExpireChange: function (x) {
        this.setState({expire: x});
    }
});
module.exports = AddCompanyModal;