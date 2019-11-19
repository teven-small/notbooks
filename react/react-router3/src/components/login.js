import React, { Component } from 'react'

export default class Login extends Component {
    constructor() {
        super()
        this.state = {
            time: new Date(),
            day: '',
            hour: '',
            minute: '',
            seconds: '',
        }
    }

    componentDidMount() {
        this.default()
        setInterval(() => {
            this.default()
        }, 1000)
    }
    default() {
        var sDate = new Date()
        var eDate = new Date("2020-1-1 00:00:00")
        var seconds = Math.floor((eDate.getTime() - sDate.getTime()) / 1000)
        var day = Math.floor(seconds / (24 * 60 * 60))
        seconds = seconds % (24 * 60 * 60)
        var hour = Math.floor(seconds / (60 * 60))
        seconds = seconds % (60 * 60)
        var minute = Math.floor(seconds / (60))
        seconds %= 60

        this.setState({
            day: day,
            hour: hour,
            minute: minute,
            seconds: seconds,
        })
    }

    geShi(n) {
        return n >= 0 && n < 10 ? '0' + n : '' + n;
    }

    render() {

        return (
            <div>
                <h2>倒计时：距离2020年还有{this.geShi(this.state.day)}天
                    {this.geShi(this.state.hour)}小时
                    {this.geShi(this.state.minute)}分钟
                    {this.geShi(this.state.seconds)}秒
                </h2>
            </div>
        )
    }
}
