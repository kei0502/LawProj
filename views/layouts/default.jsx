var React = require('react');
var DefaultLayout = React.createClass({
    render: function () {
        return (<div>
            <nav className="navbar navbar-inverse navbar-fixed-top">
                <div className="container-fluid">
                    <div className="navbar-header">
                        <button type="button" className="navbar-toggle collapsed" data-toggle="collapse"
                                data-target="#navbar"
                                aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                            <span className="icon-bar"/>
                        </button>
                        <a className="navbar-brand" href="#">法务原型</a>
                    </div>
                    <div className="navbar-collapse collapse">{this.props.navbar}</div>
                </div>
            </nav>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-sm-3 col-md-2 sidebar">{this.props.sidebar}</div>
                </div>
            </div>
            <div className="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">{this.props.main}</div>
            {this.props.children}
        </div>);
    }
});
module.exports = DefaultLayout;