import React from 'react';
import {Menu, Icon} from 'antd';
const SubMenu = Menu.SubMenu;

const AdminSider = React.createClass({
    getInitialState() {
        return {
            current: 'sub_1'
        };
    }, handleClick(e) {
        console.log('click ', e);
        this.setState({
            current: e.key
        });
    }, render() {
        return (
            <Menu onClick={this.handleClick}
                  defaultOpenKeys={['sub1']}
                  selectedKeys={[this.state.current]}
                  style={{width:'100%'}}
                  mode="inline">
                <SubMenu key="sub1" title="案件立项">
                    <Menu.Item key="sub_1"><a href="case.html">案件管理</a></Menu.Item>
                    <Menu.Item key="sub_2"><a href="right.html">权限管理</a></Menu.Item>
                </SubMenu>
                <Menu.Item key="menu1">案件流程管理</Menu.Item>
            </Menu>
        );
    }
});
export default AdminSider;
