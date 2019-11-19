import React, { Component, createRef } from 'react';

import { Card, Button, Form, Icon, Input, DatePicker, Spin, Message } from 'antd'

import { getOneArticle, updateArticle } from '../../https'

import E from 'wangeditor'

import './index.less'
import moment from 'moment';

@Form.create()

class ArticleEdit extends Component {

   constructor() {
      super()
      this.editorRef = createRef()
      this.state = {
         isLoading: false
      }
   }

   handleSubmit = (e) => {
      e.preventDefault();

      this.props.form.validateFields((err, values) => {
         if (!err) {
            //console.log('Received values of form: ', values);
            //console.log(values.createTime.valueOf())

            const data = Object.assign({}, values, { createTime: values.createTime.valueOf() })
            //console.log(data)
            this.setState({
               isLoading: true
            })
            updateArticle(this.props.match.params.id, data)
               .then(res => {

                  Message.success(res.msg)

                  this.props.history.push('/admin/article')
               })
               .catch(err => {
                  console.log(err)
               })
               .finally(() => {
                  // this.setState({
                  //    isLoading: false
                  // })
               })
         }
      })
   }

   onChangePicker = (date, dateString) => {
      console.log(date, dateString);
   }

   initEditor = () => {
      this.editor = new E(this.editorRef.current)

      this.editor.customConfig.onchange = (html) => {
         // html 即变化之后的内容

         this.props.form.setFieldsValue({
            content: html
         })
      }

      this.editor.create()
   }

   componentDidMount() {
      this.initEditor()
      this.setState({
         isLoading: true
      })
      getOneArticle(this.props.match.params.id)
         .then(res => {
            const { id, ...data } = res
            data.createTime = moment(data.createTime)
            this.props.form.setFieldsValue(data)
            this.editor.txt.html(data.content)
            // this.props.form.setFieldsValue({
            //    title: res.title,
            //    author: res.author,
            //    readNumber: res.readNumber,
            //    createTime: moment(res.createTime),
            //    content: res.content
            // })
         })
         .finally(() => {
            this.setState({
               isLoading: false
            })
         })
   }

   render() {
      const { getFieldDecorator } = this.props.form
      return (
         <Spin tip="拼命加载中..." spinning={this.state.isLoading}>
            <Card
               title={this.props.location.state === undefined ? '' : this.props.location.state.title}
               bordered={false}
               extra={<Button onClick={this.props.history.goBack}>取消</Button>}>
               <Form
                  onSubmit={this.handleSubmit}
                  labelCol={{
                     span: 4
                  }}
                  wrapperCol={{
                     span: 16
                  }}
               >
                  <Form.Item label="标题">
                     {getFieldDecorator('title', {
                        rules: [
                           // {
                           //    validator: (rule, value, callback) => {
                           //       console.log({ rule, value, callback })
                           //    }
                           // }
                           {
                              required: true,
                              message: '必填选项'
                           },
                        ],
                        initialValue: '初始值'
                     })(
                        <Input
                           prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                           placeholder="标题" />,
                     )
                     }
                  </Form.Item>
                  <Form.Item label="作者">
                     {getFieldDecorator('author', {
                        rules: [{
                           required: true,
                           message: '必填选项'
                        }],
                     })(
                        <Input placeholder="admin" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />,
                     )}
                  </Form.Item>
                  <Form.Item label="阅读量">
                     {getFieldDecorator('readNumber', {
                        rules: [{
                           required: true,
                           message: '必填选项'
                        }],
                     })(
                        <Input placeholder="0" prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />} />,
                     )}
                  </Form.Item>
                  <Form.Item label="发布时间">
                     {getFieldDecorator('createTime', {
                        rules: [{
                           required: true,
                           message: '必填选项'
                        }],
                     })(
                        <DatePicker onChange={this.onChangePicker} />,
                     )}
                  </Form.Item>
                  <Form.Item label="文章内容">
                     {getFieldDecorator('content', {
                        rules: [{
                           required: true,
                           message: '内容是必须的'
                        }],
                     })(
                        <div className="editor" ref={this.editorRef}></div>,
                     )}
                  </Form.Item>
                  <Form.Item wrapperCol={{ offset: 4 }}>
                     <Button type="primary" htmlType="submit">
                        保存修改
                  </Button>
                  </Form.Item>

               </Form>
            </Card>
         </Spin>
      );
   }
}

export default ArticleEdit;