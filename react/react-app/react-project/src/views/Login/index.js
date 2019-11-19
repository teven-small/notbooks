import React, { Component } from 'react';
import { Card, Button, Form, Icon, Input, Checkbox } from 'antd'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/userLogin'
import './login.less'

const wrapperCol = {
   xs: {
      span: 20,
      offset: 2
   },
   md: {
      span: 12,
      offset: 6
   }
}
const mapState = state => {
   return {
      isLogin: state.userLogin.isLogin,
      isLogining: state.userLogin.isLogining,
   }
}

@connect(mapState, { login })
@Form.create()

class Login extends Component {
   handleSubmit = (e) => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
         if (!err) {
            this.props.login(values)
         }
      })
   }
   render() {
      const { getFieldDecorator } = this.props.form
      return (
         this.props.isLogin ? <Redirect to="/admin" /> :
            < Card title="用户登录" className="login-wraper" >
               <Form onSubmit={this.handleSubmit} className="login-form">
                  <Form.Item wrapperCol={wrapperCol}>
                     {getFieldDecorator('username', {
                        rules: [{ required: true, message: '请输入用户名！' }],
                     })(
                        <Input
                           prefix={
                              <Icon type="user"
                                 style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="用户名"
                           disabled={this.props.isLogining}
                        />,
                     )}
                  </Form.Item>
                  <Form.Item wrapperCol={wrapperCol}>
                     {getFieldDecorator('password', {
                        rules: [{ required: true, message: '请输入密码！' }],
                     })(
                        <Input
                           prefix={
                              <Icon type="lock"
                                 style={{ color: 'rgba(0,0,0,.25)' }} />}
                           type="password"
                           placeholder="密码"
                           disabled={this.props.isLogining}
                        />,
                     )}
                  </Form.Item>
                  <Form.Item wrapperCol={wrapperCol}>
                     {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                     })(<Checkbox disabled={this.props.isLogining}>记住我</Checkbox>)}

                     <Button
                        type="primary"
                        htmlType="submit"
                        loading={this.props.isLogining}
                        className="login-form-button">登录</Button>
                  </Form.Item>
               </Form>
            </Card >
      )
   }
}

export default Login;