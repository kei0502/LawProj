import React from 'react';
const Footer = React.createClass({
    render(){
        return (<div
            style={{textAlign:"center",lineHeight:"32px",fontSize:12, backgroundColor:"rgb(64,64,64)", color:"white",padding:"12px 0",width:"100%",position:"fixed", bottom: 0}}>
            <p>版权所有 XXXXXXXXX法务平台</p><p>京ICP备XXXXXXXX号</p>
        </div>);
    }
});
export default Footer;