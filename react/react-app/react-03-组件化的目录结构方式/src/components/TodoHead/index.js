import React from 'react'
import PropTypes from 'prop-types'

export default function TodoHead(props) {
   return (
      <div>
         <h1>{props.children}</h1>
         <h3>{props.desc}</h3>
      </div>
   )
}

TodoHead.propTypes = {
   desc: PropTypes.string,
   children: PropTypes.string.isRequired
}