var React = require('react'), DataTable = require('react-data-components').DataTable, moment = require('moment');
var CompanyManagementBody = React.createClass({
    getDefaultProps: function () {
        return {states: ["", "申请中"]};
    }, render: function () {
        function renderState(val) {
            return this.props.states[val];
        }

        function renderOption(val, row) {
            if (moment(row.companyExpire).isBefore(moment(), 'day')) {
                return (<a href={"/claim/view/"+row._id} className="label label-primary">查看</a>);
            } else {
                return (<span><a href={"/claim/view/"+row._id} className="label label-primary">查看</a> <a
                    href={"/claim/edit/"+row._id} className="label label-success">编辑</a></span>);
            }
        }

        return (<div><h1 className="page-header">查看债券申请表</h1>
            <div className="row">
                <div className="col-sm-12">
                    <DataTable keys="_id"
                               columns={[{title: '备注名', prop: 'display'}, {title: '公司', prop:'companyName'}, {title: '申请截止日期', prop: 'companyExpire'}, {title: '状态', prop:'state', render:renderState.bind(this)}, {title: '操作', render: renderOption, sortable: false}]}
                               initialData={this.props.claims} initialPageLength={10}
                               initialSortBy={{ prop: '_id', order: 'descending' }} pageLengthOptions={[ 5, 10, 50 ]}/>
                </div>
            </div>
        </div>);
    }
});
module.exports = CompanyManagementBody;
