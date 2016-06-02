import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Head from '../../layouts/head';
import Scripts from '../../layouts/scripts';
import View from './view';
var Container = React.createClass({
    render() {
        var data = this.props.data, contentHtml = ReactDOMServer.renderToString(
            <View {...data}/>), initScript = 'var data = ' + JSON.stringify(data).replace(/script/g, 'scr"+"ipt') + ';';
        return (<html lang="zh-CN">
        <Head title={this.props.title} filename="creditor/claim"/>
        <body>
        <div id="react-content" dangerouslySetInnerHTML={{__html: contentHtml}}/>
        <script dangerouslySetInnerHTML={{__html: initScript}}/>
        <Scripts filename="creditor/claim"/>
        </body>
        </html>);
    }
});
module.exports = Container;