import React from 'react'
import { render } from 'react-dom'

// const App = <h1>Welcome React</h1>

// const App = (props) => {
//    return (
//       <div className="app">
//          <h1 className="title">Welcome {props.title}</h1>
//          <p>优秀的{props.title}</p>
//       </div>
//    )
// }

// const App = creatApp({
//    title: 'React 18.6 !'
// })

//jsx原理
const App = (props) => {
   return (
      React.createElement(
         "div",
         {
            className: 'app',
            id: "app"
         },
         React.createElement(
            "h1",
            {
               className: 'title',
               id: "title"
            },
            'jsx原理'
         ),
         React.createElement(
            "p",
            null,
            'jsx原理'
         )
      )
   )
}
// const app = {
//    tag: 'div',
//    attrs: {
//       className: 'app'
//    },
//    children: [
//       {
//          tag:'h1',
//          attrs:{
//             className:'title'
//          },
//          children:['Welcome React 18.6 !']
//       },
//       {
//          tag:'p',
//          attrs: null,
//          children:['优秀的 React 18.6 !']
//       }
//    ]
// }

render(
   <App title="React 18.6 !" />,
   document.getElementById("root")
)