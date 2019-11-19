import React, { Component } from 'react'

export default class FetchDemo extends Component {
    constructor() {
        super()
        this.state = {
            data: []
        }
    }
    componentDidMount() {
        fetch("http://jsonplaceholder.typicode.com/users")
            .then(res => {
                return res.json()
            })
            .then(data => {
                // console.log(data)
                this.setState({ data: data })
            })
    }

    render() {
        return (
            <div>
                <ul>
                    {this.state.data.map((item, index) => {
                        return <li key={index}>第{index}个：{item.name}的电话号码：{item.phone}</li>
                    })
                    }
                </ul>
            </div>
        )
    }
}