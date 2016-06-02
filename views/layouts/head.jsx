var React = require('react');
var Head = React.createClass({
    render: function () {
        var headerContent = '<title>法务平台</title><link rel="stylesheet" type="text/css" href="/js/common.css"/><link rel="stylesheet" type="text/css" href="/js/' + this.props.filename + ".css\"/><link rel=\"stylesheet\" type=\"text/css\" href=\"/css/style.css\"/><!--[if lt IE 10]<script src=\"https://as.alipayobjects.com/g/component/??console-polyfill/0.2.2/index.js,es5-shim/4.5.7/es5-shim.min.js,es5-shim/4.5.7/es5-sham.min.js,html5shiv/3.7.2/html5shiv.min.js,media-match/2.0.2/media.match.min.js\"></script>[endif]--><meta charSet=\"utf-8\"/><meta httpEquiv=\"X-UA-Compatible\" content=\"IE=edge\"/><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"/>";
        return (<head dangerouslySetInnerHTML={{__html:headerContent}}/>);
    }
});
module.exports = Head;