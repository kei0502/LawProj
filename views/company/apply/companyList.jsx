var React = require('react'), CompanyApplyCompanyListElement = require('./companyListElement.jsx');
var CompanyApplyCompanyList = React.createClass({
    render: function () {
        var elements = this.props.companies.map(function (companies) {
            return (<CompanyApplyCompanyListElement {...companies}/>);
        });
        return (<ul className="col-sm-12 company-list company-list-create">
            {elements}
        </ul>);
    }
});
module.exports = CompanyApplyCompanyList;