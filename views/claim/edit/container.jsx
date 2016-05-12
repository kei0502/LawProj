var React = require('react'), ReactDOMServer = require('react-dom/server');
var Head = require('../../layouts/head'), View = require('./View'), Scripts = require('../../layouts/scripts');
var IndexContainer = React.createClass({
    render: function () {
        var data = this.props.data, contentHtml = ReactDOMServer.renderToString(
            <View {...data}/>), initScript = 'main(' + JSON.stringify(data).replace(/script/g, 'scr"+"ipt') + ');';
        return (<html lang="zh-CN">
        <Head title={this.props.title}/>
        <body>
        <div id="container" dangerouslySetInnerHTML={{__html: contentHtml}}/>
        <Scripts/>
        <script src="/js/claim/edit/main.js"/>
        <script dangerouslySetInnerHTML={{__html: initScript}}/>
        </body>
        </html>);
    }
});
module.exports = IndexContainer;