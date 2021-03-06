import React from 'react'
import { render } from 'react-dom'
// import classnames from 'classnames'

import './index.css'

import App1 from './app'

//全局扩展 React.Component， 比如，想要把ajax的方法全局挂载组件的this上，如下
//1. 引入所有的ajax请求
// import * as servers from './servers'
//2.在prototype上挂载一个http属性，然后通过this.http.方法名
// React.Component.prototype.http = servers

class App extends React.Component {
    render() {
        // const style = { color: '#F00' }
        return (
            <div>
                {/* <h1 style={style}>元素中的样式</h1>
                <ol>
                    <li>{this.props.desc}</li>
                    <li className="text-red">使用class样式</li>
                    <li className={classnames('a', { 'b': true, 'c': false })}>动态添加不同的classname</li>
                </ol> */}
                <App1 />
            </div>
        )
    }
}

render(
    <App desc="类组件是继承React.Component的" />,
    document.querySelector("#root")
)