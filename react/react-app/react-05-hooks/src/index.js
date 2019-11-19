// React Hooks 是react 16.8，在不是class下的时候更改state以及其他特性
import React, { useState, useEffect } from 'react'
import { render } from 'react-dom'

const App = () => {
   //useState是一个方法，这个方法的参数就是初始值，结果是一个数组，数组的第一个是state，第二个是setState
   //结构出来的数组中的两个值
   const [count, setCount] = useState(0)

   //useEffect回调函数，每次的挂载或更新都会执行
   useEffect(() => {
      document.title = '当前数量为：' + count
   })

   return (
      <div>
         <p>当前的数量为{count}</p>
         {/* setCount()用useEffect生成的第二个参数 */}
         <button onClick={() => { setCount(count - 1) }}>-</button>
         {/* count用useEffect生成的第一个参数 */}
         <span>{count}</span>
         <button onClick={() => { setCount(count + 1) }}>+</button>
      </div>
   )
}

render(
   <App />,
   document.getElementById("root")
)