import React, { Component } from 'react';
const noop = () => { }
class TodoItem extends Component {
   //老版本的一个坑：constructor通过props初始化一个state，在props修改之后，state不会再次更新
   // constructor(props) {
   //    super()
   //    this.state = {
   //       isCompletedText: props.completed ? "完成" : "未完成"
   //    }
   // }

   //那么就需要借助于componentWillReceiveProps来做一次修正
   // UNSAFE_componentWillReceiveProps(nextProps) {
   //    this.setState({
   //       isCompletedText: nextProps.completed ? "完成" : "未完成"
   //    })
   // }

   constructor() {
      super()
      this.state = {
         isCompletedText: ''
      }
   }

   static getDerivedStateFromProps(props) {
      return {
         isCompletedText: props.completed ? "完成" : "未完成"
      }
   }

   changeBox = () => {
      const {
         onChangeIsCompleted = noop,
         id
      } = this.props
      onChangeIsCompleted && onChangeIsCompleted(id)
   }

   shouldComponentUpdate(nextProps, nextState) {
      return nextProps.completed !== this.props.completed
   }

   render() {
      // console.log(`Render ${this.props.title} TodoItem`)
      const { completed, title } = this.props
      return (
         <li>
            <input
               type="checkbox"
               checked={completed}
               onChange={this.changeBox} />
            {/* <span>{title}&nbsp;&nbsp;{completed ? "完成" : "未完成"}</span> */}
            <span>{title}&nbsp;&nbsp;{this.state.isCompletedText}</span>
         </li>
      );
   }
}

export default TodoItem;