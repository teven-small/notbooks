import React, { Component } from 'react'
import { BackHome } from '../../components'
export default class ArticlDetail extends Component {
    // goHome = () => {
    //     // this.props.history.push('/home')
    //     this.props.history.push({
    //         pathname: 'home',
    //         state: {
    //             id: 1
    //         }
    //     })
    // }
    render() {
        console.log(this.props)
        return (
            <div>
                文章详情{this.props.match.params.id}
                <BackHome />
            </div>
        )
    }
}