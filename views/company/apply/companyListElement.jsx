var React = require('react');
var CompanyApplyCompanyListElement = React.createClass({
    render: function () {
        return (
            <li className="col-sm-4 col-md-3"><a href={"/claim/?companyId="+this.props._id}>{this.props.name}</a><span
                className="date">{this.props.expire}</span></li>);
    }
});
module.exports = CompanyApplyCompanyListElement;