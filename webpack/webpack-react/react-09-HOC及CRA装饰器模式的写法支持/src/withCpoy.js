import React, { Component } from 'react'

const withCppy = (YouComponent) => {
    return class withCppy extends Component {
        render() {
            // console.log(this.props)
            return (
                <>
                    <YouComponent {...this.props} />
                    这是高级组件的内容
                    <div>&copy;2019 &emsp;Teven&nbsp; 最帅</div>
                </>
            )
        }
    }
}

export default withCppy