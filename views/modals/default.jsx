var React = require('react'), $ = require('jquery');
var DefaultModal = React.createClass({
    show: function () {
        $(this.refs.root).modal('show');
    }, hide: function () {
        $(this.refs.root).modal('hide');
    }, render: function () {
        return (<div className="modal fade" id={this.props.name+"Modal"} tabIndex="-1" role="dialog"
                     aria-labelledby={this.props.name+"ModalLabel"} ref="root">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span
                                aria-hidden="true">&times;</span></button>
                            <h4 className="modal-title" id={this.props.name+"ModalLabel"}>{this.props.title}</h4>
                        </div>
                        <div className="modal-body">{this.props.children}</div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={this.props.confirm}>确定</button>
                            <button type="button" className="btn btn-default" data-dismiss="modal">关闭</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});
module.exports = DefaultModal;