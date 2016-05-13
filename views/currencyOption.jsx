var React = require('react');
var CurrencyOption = React.createClass({
    render: function () {
        return (<option value={this.props._id}>
            {this.props.name + " " + this.props.code + (this.props.exchange && this.props.exchange.length > 0 ? " -- " + this.props.exchange[0].rate : "")}
        </option>);
    }
});
module.exports = CurrencyOption;
