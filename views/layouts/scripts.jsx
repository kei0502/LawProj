var React = require('react');
var Scripts = React.createClass({
    render: function () {
        return (<div>
            <script src="https://code.jquery.com/jquery-1.12.3.min.js"/>
            <script src="/js/bcrypt.min.js"/>
            <script src="https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.13.0/moment.min.js"/>
            <script src="/js/common.js"/>
            <script src={"/js/"+this.props.filename+".js"}/>
        </div>);
    }
});
module.exports = Scripts;