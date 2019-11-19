import React, { Component } from 'react';

class Loves extends Component {
   constructor() {
      super()
      this.state = {
         isLike: false
      }
   }
   handleLikedClick = () => {
      //要修改数据，就使用setState方法，setState方法可以有两个参数
      //第一个蚕食又有两种情况，第一种是一个对象
      // this.setState({
      //    isLike: !this.state.isLike
      // })

      //第二种情况是一个方法
      this.setState((prevState) => {
         return {
            isLike: !prevState.isLike
         }
      })
   }
   render() {
      return (
         <div onClick={this.handleLikedClick}>
            {this.state.isLike ? "❤️喜欢" : "❤️讨厌"}
         </div>
      )
   }
}

export default Loves;