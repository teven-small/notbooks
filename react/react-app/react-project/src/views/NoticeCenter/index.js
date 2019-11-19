import React, { Component } from 'react';
import { connect } from 'react-redux'
import {
   Card,
   Button,
   List,
   Avatar,
   Badge,
   Spin
} from 'antd'

import { noticeCenterChangeHasread, allHasreadChange } from '../../actions/noticeCenter'

const mapState = state => {
   const {
      list = [],
      isLoading
   } = state.noticeCenter
   return {
      list,
      isLoading
   }
}

@connect(mapState, { noticeCenterChangeHasread, allHasreadChange })

class NoticeCenter extends Component {
   componentWillReceiveProps(newprops) {
      return newprops.list !== this.props.list
   }
   render() {
      return (
         <Spin spinning={this.props.isLoading}>
            <Card
               title="通知中心"
               bordered={false}
               extra={
                  <Button
                     onClick={this.props.allHasreadChange}
                     disabled={this.props.list.every(item => item.hasRead === true)}
                  >全部标记为已读</Button>}>
               <List
                  itemLayout="horizontal"
                  dataSource={this.props.list}
                  renderItem={item => (
                     <List.Item
                        extra={
                           item.hasRead
                              ?
                              null
                              :
                              < Button onClick={this.props.noticeCenterChangeHasread.bind(this, item.id)}> 标记为已读</Button>
                        }>
                        <List.Item.Meta
                           avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                           title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                           description={item.desc}
                        />
                     </List.Item>
                  )
                  }
               /> ,
            </Card >
         </Spin>
      );
   }
}

export default NoticeCenter;