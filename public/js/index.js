webpackJsonp([6],{0:function(e,t,l){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}function a(e,t){var l=document.getElementById(t||"react-content");i["default"].render(r["default"].createElement(o["default"],e),l)}Object.defineProperty(t,"__esModule",{value:!0});var n=l(1),r=s(n),u=l(3),i=s(u),c=l(305),o=s(c);a(window.data),t["default"]=a,e.exports=t["default"]},80:function(e,t,l){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=(l(25),l(24)),n=s(a),r=(l(20),l(15)),u=s(r),i=(l(17),l(16)),c=s(i),o=(l(31),l(30)),d=s(o),f=(l(35),l(8)),g=s(f),h=(l(37),l(36)),p=s(h),m=l(1),y=s(m),E=l(60),S=s(E),M=l(61),w=s(M),k=l(59),v=s(k),_=l(18),x=l(34),b=s(x),C=y["default"].createClass({displayName:"Header",getDefaultProps:function(){return{loginVisible:!1}},getInitialState:function(){return{user:this.props.user}},showLoginModal:function(){this.refs.loginModal.show()},showRegisterModal:function(){this.refs.registerModal.show()},loginSuccess:function(e){this.setState({user:e}),this.props.loginSuccess&&this.props.loginSuccess(e)},registerSuccess:function(e){this.setState({user:e}),this.props.registerSuccess&&this.props.registerSuccess(e)},handleClickMenu:function(e){var t=this;switch(e.key){case"0":this.refs.changePasswordModal.show();break;case"1":b["default"].get("/users/logout",function(){t.setState({user:void 0}),location.href="/platform"})}},render:function(){var e=y["default"].createElement(p["default"],{onClick:this.handleClickMenu},y["default"].createElement(p["default"].Item,{key:"0"},"\u4fee\u6539\u4e2a\u4eba\u4fe1\u606f"),y["default"].createElement(p["default"].Item,{key:"1"},"\u9000\u51fa\u767b\u5f55")),t=this.state.user?y["default"].createElement(c["default"],{span:4,offset:13,style:{textAlign:"right"}},y["default"].createElement(d["default"],{overlay:e,trigger:["click"]},y["default"].createElement("a",{style:{lineHeight:"50px"},className:"ant-dropdown-link",href:"#"},this.state.user.name+"("+(0,_.getRole)(this.state.user.role)+")",y["default"].createElement(g["default"],{type:"down"})))):y["default"].createElement(c["default"],{span:4,offset:13,style:{textAlign:"right"}},y["default"].createElement(u["default"],{style:{marginTop:10},type:"ghost",onClick:this.showLoginModal},"\u767b\u5f55"),y["default"].createElement(u["default"],{style:{marginTop:10,marginLeft:10},type:"ghost",onClick:this.showRegisterModal},"\u6ce8\u518c"));return y["default"].createElement(n["default"],{style:{background:"#333",height:"50px",paddingLeft:"20px"}},y["default"].createElement(c["default"],{span:6},y["default"].createElement("span",{style:{fontSize:"20px",lineHeight:"50px"}},"\u6cd5\u52a1\u5e73\u53f0")),t,y["default"].createElement(S["default"],{ref:"loginModal",success:this.loginSuccess,visible:this.props.loginVisible}),y["default"].createElement(w["default"],{ref:"registerModal",success:this.registerSuccess}),y["default"].createElement(v["default"],{ref:"changePasswordModal"}))}});t["default"]=C,e.exports=t["default"]},305:function(e,t,l){"use strict";function s(e){return e&&e.__esModule?e:{"default":e}}Object.defineProperty(t,"__esModule",{value:!0});var a=l(1),n=s(a),r=l(80),u=s(r),i=l(58),c=s(i),o=n["default"].createClass({displayName:"View",loginSuccess:function(e){1===e.role&&(location.href="/creditor/company")},registerSuccess:function(){location.href="/creditor/company"},render:function(){return n["default"].createElement("div",null,n["default"].createElement(u["default"],{loginSuccess:this.loginSuccess,registerSuccess:this.registerSuccess,loginVisible:!0}),n["default"].createElement("h1",{style:{textAlign:"center",lineHeight:10,fontSize:"4em",color:"#ccc"}},"\u6cd5\u52a1\u5e73\u53f0"),n["default"].createElement(c["default"],null))}});t["default"]=o,e.exports=t["default"]}});