import React, { Component, createRef } from 'react'
import PropTypes from 'prop-types'

export default class TodoInput extends Component {
   static propTypes = {
      btnText: PropTypes.string.isRequired
   }
   static defaultProps = {
      btnText: '添加TOADD'
   }
   constructor() {
      super()
      this.state = {
         inputVal: ''
      }
      this.inputDom = createRef()
   }
   handleChange = (e) => {
      this.setState({
         inputVal: e.currentTarget.value
      })
   }
   handleAdd = () => {
      if (this.state.inputVal.trim() === '') {
         return
      }
      this.props.addToDo(this.state.inputVal)
      this.setState({
         inputVal: ''
      }, () => {
         this.inputDom.current.focus()
      })

   }
   kandleKeyUp = (e) => {
      if (e.keyCode === 13) {
         this.handleAdd()
      }
   }
   render() {
      return (
         <div>
            <input type="text"
               value={this.state.inputVal}
               onChange={this.handleChange}
               onKeyUp={this.kandleKeyUp} ref={this.inputDom} />
            <button
               onClick={this.handleAdd}
            >{this.props.btnText}</button>
         </div>
      )
   }
}
