import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

const Conter = () => {
    console.log(useState())
    // useState是一个方法，这个方法的参数就是默认值，结果是一个数组，
    //数组的第一个是相当于state，第二个相当于setState
    const [count, setCount] = useState(0)


    useEffect(() => {
        console.log("更新了")
        document.title = `当前的hooks为：${count}`
    })


    return (
        <div>
            <p>当前的hooks为：{count}</p>
            <button
                onClick={() => { setCount(count - 1) }}
            >-</button>
            <span>{count}</span>
            <button
                onClick={() => { setCount(count + 1) }}
            >+</button>
        </div>
    )
}

ReactDOM.render(<Conter />, document.getElementById('root'));

