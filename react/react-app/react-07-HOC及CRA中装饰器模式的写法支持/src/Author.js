import React, { Component } from 'react';

import withCopy from './withCopy'

@withCopy

class Author extends Component {
   render() {
      return (
         <div>
            Author {this.props.name}
         </div>
      );
   }
}

export default Author;