import React, { Component } from 'react'
import { httpGet, httpPost } from '../http'

export default class TextHttp extends Component {

    componentDidMount() {
        httpGet("http://jsonplaceholder.typicode.com/users")
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
            })

        httpPost("http://jsonplaceholder.typicode.com/users")
            .then(res => {
                return res.json()
            })
            .then(data => {
                console.log(data)
            })
    }

    render() {
        return (
            <div></div>
        )
    }
}