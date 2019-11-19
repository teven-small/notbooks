import React, { Component } from 'react';
import { Button } from "../../views";
class ArticalDetail extends Component {
   render() {
      return (
         <div>
            文章详情{this.props.match.params.id}
            <Button />
         </div>
      );
   }
}

export default ArticalDetail;