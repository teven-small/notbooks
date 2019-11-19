import React, { Component } from 'react';
import { Link } from 'react-router-dom'
class Artical extends Component {
   render() {
      return (
         <div>
            <Link to='/artical/1'>文章一</Link>
            <Link to='/artical/2'>文章二</Link>
            <Link to='/artical/3'>文章三</Link>
         </div>
      );
   }
}

export default Artical;