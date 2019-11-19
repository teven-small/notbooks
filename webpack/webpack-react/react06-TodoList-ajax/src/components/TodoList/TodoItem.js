import React, { Component } from 'react'
const noop = () => { }
export default class TodoItem extends Component {
    constructor(props) {
        super()
        this.state = {
            text: props.completed ? "完成" : "未完成"
        }
    }
    changeFinish = () => {
        const {
            changeFinish = noop,
            id
        } = this.props

        changeFinish && changeFinish(id)
    }

    // UNSAFE_componentWillReceiveProps(nextProps) {
    //     this.setState({
    //         text: nextProps.completed ? "完成" : "未完成"
    //     })
    // }
    static getDerivedStateFromProps(props) {
        // this.setState({
        //     text: props.completed ? "完成" : "未完成"
        // })
        return {
            text: props.completed ? "完成" : "未完成"
        }
    }

    // UNSAFE_componentWillMount() {
    //     console.log("UNSAFE_componentWillMount")
    // }

    shouldComponentUpdate(nextProps, nextState) {
        // console.log(nextProps, nextState)
        // console.log(this.props, this.state)
        return nextProps.completed !== this.props.completed
        // return true
    }

    render() {
        // console.log(`TodoItem ${this.props.title} Render`)
        return (
            <li>
                <input
                    type="checkbox"
                    checked={this.props.completed}
                    onChange={this.changeFinish}
                />
                {/* <span>{this.props.title}  {this.props.completed ? "完成" : "未完成"}</span> */}
                <span>{this.props.title}  {this.state.text}</span>
            </li>
        )
    }
}

// import React, { PureComponent } from 'react'
// const noop = () => { }
// export default class TodoItem extends PureComponent {
//     constructor() {
//         super()
//         this.state = {}
//     }
//     changeFinish = () => {
//         const {
//             changeFinish = noop,
//             id
//         } = this.props

//         changeFinish && changeFinish(id)
//     }
//     // static getDerivedStateFromProps() {
//     //     return {}
//     // }

//     UNSAFE_componentWillMount() {
//         console.log("UNSAFE_componentWillMount")
//     }

//     // shouldComponentUpdate(nextProps, nextState) {
//     //     // console.log(nextProps, nextState)
//     //     // console.log(this.props, this.state)
//     //     return nextProps.completed !== this.props.completed
//     //     // return true
//     // }

//     render() {
//         console.log(`TodoItem ${this.props.title} Render`)
//         return (
//             <li>
//                 <input
//                     type="checkbox"
//                     checked={this.props.completed}
//                     onChange={this.changeFinish}
//                 />
//                 <span>{this.props.title}  {this.props.completed ? "完成" : "未完成"}</span>
//             </li>
//         )
//     }
// }
