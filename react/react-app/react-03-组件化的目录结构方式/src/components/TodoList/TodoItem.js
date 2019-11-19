import React, { Component } from 'react';

class TodoItem extends Component {
   render() {
      return (
         <li>{this.props.title}&nbsp;&nbsp;{this.props.isCompleted ? "已完成" : "未完成"}</li>
      );
   }
}

export default TodoItem;