import React, { Component } from 'react';
import {
   Button,
   Spin,
   Pagination,
   Badge
} from 'antd'


class App extends Component {

   onShowSizeChange = (current, pageSize) => {
      console.log(current, pageSize)
   }

   render() {
      return (
         <div>
            <Button loading type="primary">测试</Button>
            <Spin>
               <div>想看什么视频可以许愿,虽然不一定会如意有钱可以给UP爱心投喂,</div>
            </Spin>
            <Pagination showSizeChanger
               onShowSizeChange={this.onShowSizeChange}
               defaultCurrent={3}
               total={500}
            />
            <Badge count={100} overflowCount={99} showZero>
               <span>数量</span>
            </Badge>
         </div>
      );
   }
}

export default App;