import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './SiderLayout.css';
import { Layout, Menu, Icon } from 'antd';

const { Header, Sider, Content } = Layout;

export default class SiderLayout extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  render() {
    return ( 
      <Layout>
        <Sider 
          trigger = {null}
          collapsible collapsed = {this.state.collapsed}
        >
          <div className = "logo" />
          <Menu theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>
            <Menu.Item key = "1">
              <Icon type = "home" />
              <span > Home </span> 
            </Menu.Item> 
            <Menu.Item key = "2">
              <Icon type = "area-chart" />
              <span> Analysis </span> 
            </Menu.Item>
            <Menu.Item key = "3">
              <Icon type = "solution" />
              <span> Detection </span> 
            </Menu.Item>
            <Menu.Item key = "4">
              <Icon type = "team" />
              <span> Team </span> 
            </Menu.Item>
          </Menu>
          </Sider> 
          <Layout >
          <Header style = {{background: '#fff', padding: 0}}>
            <Icon 
              className = "trigger"
              type = {this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick = {this.toggle}
             />
          </Header>
          <Content style = {{
            margin: '24px 16px',
            padding: 24,
            background: '#fff',
            minHeight: 280,
          }}
          >
            <h1> Comp9321 Project: xxxxx </h1>
          </Content>
        </Layout>
      </Layout>
    );
  }
}
