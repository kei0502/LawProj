import React from 'react';
import Header from '../layouts/header';
import Footer from '../layouts/footer';
const View = React.createClass({
    loginSuccess(user){
        if (user.role === 1) {
            location.href = '/creditor/company';
        }
    }, registerSuccess(){
        location.href = '/creditor/company';
    }, render(){
        return (<div>
            <Header loginSuccess={this.loginSuccess} registerSuccess={this.registerSuccess} loginVisible={true}/>
            <h1 style={{textAlign: 'center',lineHeight:10,fontSize:'4em',color:'#ccc'}}>法务平台</h1>
            <Footer/>
        </div>);
    }
});
export default View;