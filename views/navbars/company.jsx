var React = require('react');
var CompanyNavbar = React.createClass({
    getInitialState: function () {
        return {expanded: false};
    }, render: function () {
        return (<ul className="nav navbar-nav navbar-right">
            <li className={this.state.expanded?"dropdown open":"dropdown"}>
                <a className="dropdown-toggle" role="button" aria-haspopup="true"
                   aria-expanded={this.state.expanded} href="#" onClick={this.expand}><span
                    className="glyphicon glyphicon-user"/> {this.props.name}</a>
                <ul className="dropdown-menu">
                    <li><a href="#" onClick={this.props.logout}><span className="glyphicon glyphicon-log-out"/> 退出</a>
                    </li>
                </ul>
            </li>
        </ul>);
    }, expand: function (e) {
        e.preventDefault();
        this.setState({expanded: !this.state.expanded});
    }
});
module.exports = CompanyNavbar;