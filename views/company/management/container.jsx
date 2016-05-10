var React = require('react'), ReactDOMServer = require('react-dom/server');
var Head = require('../../layouts/head'), View = require('./view'), Scripts = require('../../layouts/scripts');
var IndexContainer = React.createClass({
    render: function () {
        var data = this.props.data,initScript = 'main(' + JSON.stringify(data).replace(/script/g, 'scr"+"ipt') + ');';
        return (<html lang="zh-CN">
        <Head title={this.props.title}/>
        <body>
        <div id="container"/>
        <Scripts/>
        <script src="/js/company/management/main.js"/>
        <script dangerouslySetInnerHTML={{__html: initScript}}/>
        </body>
        </html>);
    }
});
module.exports = IndexContainer;