import React from 'react';
import {Menu, Row, Col, Dropdown, Icon, Button} from 'antd';
import LoginModal from '../modals/login.jsx';
import RegisterModal from '../modals/register.jsx';
import ChangePasswordModal from '../modals/changePassword';
import {getRole} from '../util';
import $ from 'jquery';
const Header = React.createClass({
    getDefaultProps() {
        return {loginVisible: false};
    },
    getInitialState() {
        return {user: this.props.user};
    }, showLoginModal() {
        this.refs.loginModal.show();
    }, showRegisterModal() {
        this.refs.registerModal.show();
    }, loginSuccess(user) {
        this.setState({user: user});
        if (this.props.loginSuccess) {
            this.props.loginSuccess(user);
        }
    }, registerSuccess(user) {
        this.setState({user: user});
        if (this.props.registerSuccess) {
            this.props.registerSuccess(user);
        }
    }, handleClickMenu(e){
        switch (e.key) {
            case '0':
                this.refs.changePasswordModal.show();
                break;
            case '1':
                $.get("/users/logout", ()=> {
                    this.setState({user: undefined});
                    location.href = '/platform';
                });
                break;
        }
    }, render() {
        const infoMenu = (<Menu onClick={this.handleClickMenu}>
            <Menu.Item key="0">修改个人信息</Menu.Item>
            <Menu.Item key="1">退出登录</Menu.Item>
        </Menu>);
        const infoNav = this.state.user ? (<Col span={4} offset={13} style={{textAlign:'right'}}>
            <Dropdown overlay={infoMenu} trigger={['click']}>
                <a style={{lineHeight:'50px'}} className="ant-dropdown-link" href="#">
                    {this.state.user.name + '(' + getRole(this.state.user.role) + ')'}<Icon type="down"/>
                </a>
            </Dropdown>
        </Col>) : (<Col span={4} offset={13} style={{textAlign:'right'}}>
            <Button style={{marginTop:10}} type="ghost" onClick={this.showLoginModal}>登录</Button>
            <Button style={{marginTop:10,marginLeft:10}} type="ghost" onClick={this.showRegisterModal}>注册</Button>
        </Col>);
        return (<Row style={{background:"#333",height:"50px",paddingLeft:"20px"}}>
            <Col span={6}><span style={{fontSize:'20px',lineHeight:'50px'}}>法务平台</span></Col>
            {infoNav}
            <LoginModal ref="loginModal" success={this.loginSuccess} visible={this.props.loginVisible}/>
            <RegisterModal ref="registerModal" success={this.registerSuccess}/>
            <ChangePasswordModal ref="changePasswordModal"/>
        </Row>);
    }
});
export default Header;