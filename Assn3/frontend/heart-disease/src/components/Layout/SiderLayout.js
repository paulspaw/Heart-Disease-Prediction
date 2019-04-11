import React, { Component } from 'react'
import 'antd/dist/antd.css';
import './SiderLayout.css';
import Home from "./Home"
import Analysis from "./Analysis"
import Detection from "./Detection"
import Team from "./Team"
import { Layout, Menu, Icon } from 'antd';
import { BrowserRouter as Router, Route, Link } from "react-router-dom"

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
      <Router>
        <div>
          <Layout>
            <Sider
              trigger = {null}
              collapsible 
              collapsed = {this.state.collapsed}
            >
              <div className = "logo" />
              <Menu className="menu" theme = "dark" mode = "inline" defaultSelectedKeys = {['1']}>
                <Menu.Item key = "1">
                  <Link to="/">
                    <Icon type = "home" style={{fontSize: "20px"}}/>
                    <span> Home </span> 
                  </Link>
                </Menu.Item> 
                <Menu.Item key = "2">
                  <Link to="/analysis">
                    <Icon type = "area-chart" style={{fontSize: "20px"}}/>
                    <span> Analysis </span> 
                  </Link>
                </Menu.Item>
                <Menu.Item key = "3" >
                  <Link to="/detection">
                    <Icon type = "solution" style={{fontSize: "20px"}}/>
                    <span> Detection </span> 
                  </Link>
                </Menu.Item>
                <Menu.Item key = "4">
                  <Link to="/team">
                    <Icon type = "team" style={{fontSize: "20px"}}/>
                    <span> Team </span> 
                  </Link>
                </Menu.Item>
              </Menu>
              </Sider> 
              <Layout style={{height: "100vh"}}>
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
                <Route exact path="/" component={Home} />
                <Route path="/analysis" component={Analysis} />
                <Route path="/detection" component={Detection} />
                <Route path="/team" component={Team} />
              </Content>
            </Layout>
          </Layout>
        </div>
      </Router>
    );
  }
}
