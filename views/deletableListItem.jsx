var React = require('react');
var DeletableListItem = React.createClass({
    getDefaultProps: function () {
        return {target: '_blank', deletable: true};
    }, render: function () {
        var text = this.props.href ? (
            <a href={this.props.href}
               target={this.props.target}>{this.props.content}</a>) : this.props.content, remove = this.props.deletable ? (
            <a href="#" onClick={this.props.remove}>移除</a>) : "";
        return (<li>{text}{remove}</li>)
    }
});
module.exports = DeletableListItem;