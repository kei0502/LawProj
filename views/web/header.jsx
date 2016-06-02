import React from 'react';
import {Row, Col, Icon, Menu, Button, Dropdown} from 'antd';
import LoginModal from '../modals/login';
import RegisterModal from '../modals/register';
import ChangePasswordModal from '../modals/changePassword';
import {getRole} from '../util';
import $ from 'jquery';
const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Header = React.createClass({
    getInitialState(){
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
    }, handleClickMenu(e) {
        location.href = (e.key === 'index' ? '/' : '/' + e.key);
    }, handleClickUserMenu(e){
        switch (e.key) {
            case '0':
                this.refs.changePasswordModal.show();
                break;
            case '1':
                $.get("/users/logout", ()=> {
                    this.setState({user: undefined});
                    if (this.props.logout) {
                        this.props.logout();
                    }
                });
                break;
        }
    }, getInfoNav(){
        if (!this.state.user) {
            return (<Col span={4} style={{textAlign:'right'}}>
                <Button style={{marginTop:10}} type="ghost" onClick={this.showLoginModal}>登录</Button>
                <Button style={{marginTop:10,marginLeft:10}} type="ghost"
                        onClick={this.showRegisterModal}>注册</Button>
            </Col>);
        } else {
            const infoMenu = (
                <Menu onClick={this.handleClickUserMenu}>
                    <Menu.Item key="0">修改个人信息</Menu.Item>
                    <Menu.Item key="1">退出登录</Menu.Item>
                </Menu>
            );
            var role = getRole(this.state.user.role);
            return (<Col span={4} style={{textAlign:'right'}}>
                <Dropdown overlay={infoMenu} trigger={['click']}>
                    <a style={{lineHeight:'50px'}} className="ant-dropdown-link" href="#">
                        {this.state.user.name + '(' + role + ')'}<Icon type="down"/>
                    </a>
                </Dropdown>
            </Col>);
        }
    }, render(){
        return (<Row style={{marginBottom: 10}}>
            <Col span={12} offset={4}><h1 style={{fontSize:36,lineHeight:"3"}}><Icon type="like"/> 法务平台</h1></Col>
            {this.getInfoNav()}
            <Col span={16} offset={4}>
                <Menu onClick={this.handleClickMenu} selectedKeys={[this.props.current]} mode="horizontal">
                    <MenuItem key="index">首页</MenuItem>
                    <MenuItem key="news">最新资讯</MenuItem>
                    <MenuItem key="case">挂牌案件</MenuItem>
                    <SubMenu title="市场机构">
                        <MenuItem key="admin" style={{paddingLeft:20}}>管理人</MenuItem>
                        <MenuItem key="investment" style={{paddingLeft:20}}>投资机构</MenuItem>
                        <MenuItem key="other" style={{paddingLeft:20}}>其他机构</MenuItem>
                    </SubMenu>
                    <SubMenu title="法律规则">
                        <MenuItem key="law" style={{paddingLeft:20}}>法律</MenuItem>
                        <MenuItem key="interpretation" style={{paddingLeft:20}}>司法解释</MenuItem>
                        <MenuItem key="statute" style={{paddingLeft:20}}>行政法规</MenuItem>
                    </SubMenu>
                    <SubMenu title="服务专区">
                        <MenuItem key="consult" style={{paddingLeft:20}}>投资征询公告</MenuItem>
                        <MenuItem key="auction" style={{paddingLeft:20}}>拍卖公告</MenuItem>
                        <MenuItem key="train" style={{paddingLeft:20}}>培训公告</MenuItem>
                    </SubMenu>
                    <SubMenu title="深度阅读">
                        <MenuItem key="serious" style={{paddingLeft:20}}>重案追踪</MenuItem>
                        <MenuItem key="classic" style={{paddingLeft:20}}>经典案例</MenuItem>
                        <MenuItem key="scholarship" style={{paddingLeft:20}}>学术前沿</MenuItem>
                        <MenuItem key="personal" style={{paddingLeft:20}}>个人破产</MenuItem>
                        <MenuItem key="survey" style={{paddingLeft:20}}>调研报告</MenuItem>
                    </SubMenu>
                    <SubMenu title="债权申报">
                        <MenuItem key="platform" style={{paddingLeft:20}}>申报入口</MenuItem>
                        <MenuItem key="guide" style={{paddingLeft:20}}>申报指南</MenuItem>
                        <MenuItem key="help" style={{paddingLeft:20}}>专业帮助</MenuItem>
                    </SubMenu>
                    <SubMenu title="关于我们">
                        <MenuItem key="notice" style={{paddingLeft:20}}>法律声明</MenuItem>
                        <MenuItem key="intro" style={{paddingLeft:20}}>公司介绍</MenuItem>
                        <MenuItem key="contact" style={{paddingLeft:20}}>联系我们</MenuItem>
                    </SubMenu>
                </Menu>
            </Col>
            <LoginModal ref="loginModal" success={this.loginSuccess}/>
            <RegisterModal ref="registerModal" success={this.registerSuccess}/>
            <ChangePasswordModal ref="changePasswordModal"/>
        </Row>);
    }
});
export default Header;