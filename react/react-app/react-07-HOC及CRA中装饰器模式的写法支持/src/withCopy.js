import React, { Component } from 'react'

const withCopy = (YourComponent) => {
   return class withCopy extends Component {
      render() {
         return (
            <div>
               <YourComponent {...this.props} />
               &copy;2019 &emsp;大作家
            </div>
         )
      }
   }
}

export default withCopy
