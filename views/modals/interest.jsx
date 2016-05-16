var React = require('react'), DefaultModal = require('./default.jsx'), moment = require('moment'), DateTimeField = require('react-bootstrap-datetimepicker');
var InterestModal = React.createClass({
    getDefaultProps: function () {
        return {calculate: "", format: "YYYY-MM-DD", amount: 0};
    }, getInitialState: function () {
        return {
            principal: this.props.principal,
            calculate: this.props.calculate,
            start: this.props.start ? this.props.start : this.props.end,
            amount: this.props.amount
        };
    }, render: function () {
        return (<DefaultModal name="interest" title="利息" ref="modal" confirm={this.confirm}>
            <form className="form-horizontal">
                <div className="form-group">
                    <label htmlFor="principalShow" className="col-sm-3 control-label">本金</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="principalShow" disabled="disabled"
                               value={this.state.principal.toFixed(2)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="calculateInput">计算方法</label>
                    <div className="col-sm-7">
                        <select className="form-control" id="calculateInput" value={this.state.calculate}
                                onChange={this.onCalculateChange}>
                            <option value="">无利息</option>
                            <option value="1">百元基数计息法</option>
                            <option value="2">积数计息法</option>
                            <option value="3">利余</option>
                            <option value="4">其他</option>
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="startDateInput">起始日期</label>
                    <div className="col-sm-7">
                        <DateTimeField dateTime={this.props.start?this.props.start:this.props.end}
                                       format={this.props.format} inputFormat={this.props.format} mode="date"
                                       inputProps={{id:'startDateInput',className:'form-control'}}
                                       onChange={this.onStartChange} maxDate={moment(this.props.end)}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="col-sm-3 control-label" htmlFor="endDateInput">截止日期</label>
                    <div className="col-sm-7">
                        <input id="endDateInput" type="text" className="form-control" value={this.props.end}
                               disabled="disabled"/>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="interestInput" className="col-sm-3 control-label">利息</label>
                    <div className="col-sm-7">
                        <input type="text" className="form-control" id="interestInput" disabled="disabled"
                               value={this.state.amount.toFixed(2)}/>
                    </div>
                </div>
            </form>
        </DefaultModal>);
    }, hide: function () {
        this.refs.modal.hide();
    }, show: function () {
        this.refs.modal.show();
    }, onPrincipal(principal){
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
        this.setState({principal: principal, amount: amount});
    }, onCalculateChange: function (e) {
        var value = e.target.value;
        this.setState({calculate: value, amount: value ? this.state.principal * 0.05 : 0});
    }, onStartChange: function (e) {
        this.setState({start: e});
    }, confirm: function (e) {
        e.preventDefault();
        if (this.state.calculate) {
            this.props.confirm({calculate: this.state.calculate, start: this.props.start, amount: this.state.amount});
        } else {
            this.props.confirm();
        }
        this.hide();
    }
});
module.exports = InterestModal;