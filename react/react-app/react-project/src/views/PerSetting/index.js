import React, { Component } from 'react';
import axios from 'axios'
import { Card, Upload, Spin } from 'antd'


import './person.less'

class PerSetting extends Component {
   state = {
      isUploading: false,
      avatarUrl: ''
   }
   uploadImageAvatar = ({ file }) => {
      console.log(file)
      this.setState({
         isUploading: true
      })
   }
   render() {
      return (
         <Card
            title="个人设置"
            bordered={false}>
            <Upload
               className="upload-box"
               customRequest={this.uploadImageAvatar}>
               <Spin spinning={this.state.isUploading}>
                  {
                     this.state.isUploading
                        ?
                        <img src={this.state.avatarUrl} />
                        :
                        <span>点击上传</span>
                  }
               </Spin>
            </Upload>
         </Card>
      );
   }
}

export default PerSetting;