import React, { Component } from 'react';
import { render } from 'react-dom'
import classnames from 'classnames'
import styled from 'styled-components'

import './index.css'

const Title = styled.p`color: #F0f`

class Index extends Component {
   render() {
      const style = { color: '#F00' }
      return (
         <div>
            <h1>元素中的样式</h1>
            <ul>
               <li style={style}>使用style内联样式</li>
               <li
                  className="has-text-yellow"
               >使用class的方式，但是class要改为className</li>
               <li
                  className={classnames("a", { "b": true, "d": true })}
               >动态使用添加classNamw就可以使用第三方包classNames</li>
               <li><Title>使用styled-components来添加样式</Title></li>
            </ul>
         </div >
      );
   }
}

export default Index;
render(
   <Index />,
   document.querySelector("#root")
)