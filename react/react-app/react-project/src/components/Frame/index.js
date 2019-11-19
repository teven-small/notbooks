import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import {
   Layout,
   Menu,
   Breadcrumb,
   Icon,
   Dropdown,
   Avatar,
   Badge
} from 'antd';
import logo from './logo.png'
import './frame.less'

import { getNoticeListData } from '../../actions/noticeCenter'
import { logout } from '../../actions/userLogin'

const { Header, Content, Footer, Sider } = Layout;

const mapState = state => {
   return {
      noticeCenterCount: state.noticeCenter.list.filter(item => item.hasRead === false).length,
      avatar: state.userLogin.avatar,
      name: state.userLogin.name
   }
}

@connect(mapState, { getNoticeListData, logout })
@withRouter

class Frame extends Component {
   componentDidMount() {
      this.props.getNoticeListData()
   }
   menuClick = ({ key }) => {
      this.props.history.push(key)
   }

   onDropdownClick = ({ key }) => {
      if (key === '/logout')
         this.props.logout()

      else if (key === '/admin/personSetting') {
         this.props.history.push(key)
      }
      else {
         this.props.history.push(key)
      }
   }

   renderDropdown = () => {
      return (
         <Menu onClick={this.onDropdownClick}>
            <Menu.Item key="/admin/noticeCenter">
               <Badge dot={Boolean(this.props.noticeCenterCount)}>通知中心</Badge>
            </Menu.Item>
            <Menu.Item key="/admin/personSetting">
               <Badge >个人设置</Badge>
            </Menu.Item>
            <Menu.Item key="/logout">
               <Badge >退出登录</Badge>
            </Menu.Item>
            <Menu.Divider />
         </Menu>
      )
   }

   render() {
      const selectKeyArr = this.props.location.pathname.split('/')
      selectKeyArr.length = 3
      return (
         <Layout className="setion">
            <Header className="header header-nav">
               <div className="logo-div lt">
                  <img src={logo} alt="logo" />
               </div>
               <Dropdown overlay={this.renderDropdown()} >
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                     <Avatar src={this.props.avatar} />
                     <span
                        style={{ fontSize: '12px' }}
                     >欢迎您&nbsp;| &nbsp;{this.props.name}</span>
                     <Badge count={this.props.noticeCenterCount} offset={[-10, -10]}>
                        <Icon type="down" />
                     </Badge>
                  </div>
               </Dropdown>
               {/* <Menu
                  className="lt"
                  theme="dark"
                  mode="horizontal"
                  defaultSelectedKeys={['2']}
                  style={{ lineHeight: '64px' }}>
                  <Menu.Item key="1">nav 1</Menu.Item>
                  <Menu.Item key="2">nav 2</Menu.Item>
                  <Menu.Item key="3">nav 3</Menu.Item>
               </Menu> */}
            </Header>
            <Content style={{ padding: '0 50px' }}>
               <Breadcrumb style={{ margin: '16px 0' }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
               </Breadcrumb>
               <Layout style={{ paddingTop: '24px', background: '#fff', marginTop: '24px' }}>
                  <Sider width={200} style={{ background: '#fff' }}>
                     <Menu selectedKeys={[selectKeyArr.join('/')]} onClick={this.menuClick}>
                        {
                           this.props.menus.map(item => {
                              return (
                                 <Menu.Item key={item.pathname}>
                                    <Icon type={item.icon} />
                                    {item.title}
                                 </Menu.Item>
                              )
                           })
                        }
                     </Menu>
                  </Sider>
                  <Content style={{ padding: '0 24px', minHeight: 280 }}>
                     {this.props.children}
                  </Content>
               </Layout>
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
         </Layout>
      )
   }
}
export default Frame