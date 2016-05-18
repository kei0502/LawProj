var React = require('react'), DataTable = require('react-data-components').DataTable;
var CompanyManagementBody = React.createClass({
    getInitialState: function () {
        return {companies: this.props.companies, selectState: "0"};
    },
    render: function () {
        return (<div>
            <h1 className="page-header">破产企业管理</h1>
            <div className="row">
                <div className="col-sm-2">
                    <button className="btn btn-primary" data-toggle="modal" onClick={this.props.addCompany}>新增企业信息
                    </button>
                </div>
                <div className="col-sm-10">
                    <form className="form-horizontal">
                        <div className="form-group">
                            <label className="col-sm-2 control-label" htmlFor="selectState">筛选</label>
                            <div className="col-sm-10">
                                <select id="selectState" className="form-control" value={this.state.selectState}
                                        onChange={this.onSelectStateChange}>
                                    <option value="0">所有</option>
                                    <option value="1">债权申请中</option>
                                    <option value="2">已截止申请,但仍有债权申请未处理完成</option>
                                    <option value="3">已截止申请,等待安排投票</option>
                                    <option value="4">已截止投票,等待线下结果</option>
                                    <option value="5">已完成</option>
                                    <option value="6">已关闭</option>
                                </select>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-12">
                    <DataTable keys="_id" columns={[{title: '#',prop: 'cid'}, {title: '公司名称', prop: 'name'}, {
                    title: '会计师', render: function (val, row) {
                        return row.validator_accountant.map(function (user) {
                            return user.username;
                        }).join(<br/>);
                    }, sortable: false
                }, {title: '申请截止日期', prop: 'expire'}, {title: '投票日期', prop: 'vote'}, {title: '状态', prop: 'state'}, {
                    title: '操作', render: function (val, row) {
                        return (<a href='#' className="label label-success">安排投票</a>);
                    }, sortable: false
                }]} initialData={this.state.companies} initialPageLength={10}
                               initialSortBy={{ prop: '_id', order: 'descending' }} pageLengthOptions={[ 5, 10, 50 ]}/>
                </div>
            </div>
        </div>);
    }, onSelectStateChange: function (e) {
        this.setState({selectState: value});
    }, addCompany: function (company) {
        var companies = [company];
        this.setState({companies: companies.concat(this.state.companies)});
    }
});
module.exports = CompanyManagementBody;