var React = require('react'), CompanyApplyCompanyList = require('./companyList.jsx');
var CompanyApplyView = React.createClass({
    render: function () {
        return (<div>
            <h1 className="page-header">添加债券申请表</h1>
            <div className="row">
                <div className="col-sm-12">
                    <div className="header">选择债务公司</div>
                </div>
            </div>
            <div className="row">
                <CompanyApplyCompanyList companies={this.props.companies}/>
            </div>
        </div>);
    }
});
module.exports = CompanyApplyView;