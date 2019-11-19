        React 笔记
        
1. 组件不需要跟元素时
import React, { Fragment } from 'react'
<Fragment></Fragment>  ||  <> </>

2. 组件导出的两种方式
<1>
import TodoHeader from './TodoHeader'
import TodoInput from './TodoInput'
import TodoList from './TodoList'

export {
    TodoHeader,
    TodoInput,
    TodoList
}
<2>
export { default as TodoHeader} from './TodoHeader'
export { default as TodoInput} from './TodoInput'
export { default as TodoList} from './TodoList'

引用的时候：
import {
    TodoHeader,
    TodoInput,
    TodoList
} from './components'

3. props 类型检测
npm install --save prop-types
import PropTypes from 'prop-types'
组件.propTypes = {
    desc: PropTypes.string.isRequired,
}

4. 组件默认值
<1>.function组件:
TodoHeader.defaultProps = {
    children: "明天呢还事"
}
<2>.类组件
static defaultProps = {
    btnText: "添加"
}

5. 渲染标签的字符串
 <div dangerouslySetInnerHTML={{ __html: this.state.article }} />

6. 循环渲染展开
  {...item}

7. 改变state值
第一种方法
    this.setState({
        isLike: !this.state.isLike
    })

第二种方法
    this.setState((prev) => {
        console.log(prev)
        return {
            isLike: !prev.isLike
        }
    })
注意：this.setState 是延迟执行、是异步处理，return里才是渲染的内容

在原来的数组添加元素，直接用push错误，因为push返回的是数组长度，应该用concat，返回的是数组
例：this.setState({
        todoList: this.state.todoList.push({
	        id: Math.random(),
	        title: todo,
	        isFinish: false
        })
    )
    纠正： push => concat

8. react里面通过ref来获取组件或者dom元素，要使用ref之前必须先调用React.createRef方法来创建一个ref
   在constructor里创建

9.  老版本的坑：constructor里面通过props来初始化一个state，在修改之后，这个state不会再次更新，constructor	    只执行一次
	constructor(props) {
        super()
        this.state = {
            text: props.isFinish ? "完成" : "未完成"
        }
    }
    那么就需要借助于 UNSAFE_componentWillReceiveProps 来修正一次
    解决：
    UNSAFE_componentWillReceiveProps(nextProps) {
        this.setState({
            text: nextProps.isFinish ? "完成" : "未完成"
        })
    }

10. ajax 
	安装 npm install axios
	全局扩展 React.Component， 比如，想要把ajax的方法全局挂载组件的this上，如下
	1. 引入所有的ajax请求
		import * as servers from './servers'
	2. 在prototype上挂载一个http属性，然后通过this.http.方法名
		React.Component.prototype.http = servers

		获取全局api接口
 		componentDidMount() {
     		console.log(this.http.getTodos)
 		}

11. 高级组件
npm install react-app-rewired --save-dev
建议配置
npm install customize-cra --save-dev
防止报错
npm i @babel/plugin-proposal-decorators -D
// module.exports = function override(config, env) {
//     //如果没有使用customize-cra，do stuff with the webpack config...
//     return config;
// }
const { override, addDecoratorsLegacy } = require('customize-cra')

module.exports = override(
    addDecoratorsLegacy()
)

让cra支持@装饰器写法
1. 不管你是要配置什么，我们最好的方式是使用creat-app-rewired这个包来对cra创建的项目进行轻微配置调整
2. 安装好之后，在package.json里的react-script替换成creat-app-rewired
3. 在跟目录下创建一个config-overrides.js
	module.exports = function override(config, env) {
	    //如果没有使用customize-cra，do stuff with the webpack config...
	    return config;
	}
4.当然如果想要配置方便，可以再安装customize-cra，然后把config-overrides.js的内容换成
const { override, addDecoratorsLegacy } = require('customize-cra')
module.exports = override(
    addDecoratorsLegacy()
)

12. 组件的状态 redux
安装redux
	npm i redux -S
安装react-redux
	npm install --save react-redux
1. 创建reducers
2. 合并reducers
3. creatStore
4. Provider store=（store）
5. connect(mapStateToProps，{...actionCreators})(YouComponent)
6. actionCreators
7. 修改reducers


npm i react-app-rewired customize-cra -D
npm i babel-plugin-import -D
npm i less less-loader -D

