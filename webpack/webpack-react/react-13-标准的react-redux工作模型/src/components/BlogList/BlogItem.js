import React from 'react'
//展示组件（Dumb/Presentational Components）
export default function BlogItem(props) {
    console.log(1)
    return (
        <li>
            <h3>{props.title}</h3>
            <p>{props.body}</p>
        </li>
    )
}
