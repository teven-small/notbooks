import React from 'react'
import { ConterConsumer } from '../../counterStore'

class Conter extends React.Component {
    render() {
        return (
            //使用ConterConsumer来接收count，
            <ConterConsumer>
                {
                    //注意！ConterConsumer的children必须是一个方法，一个参数为Provider的value
                    ({ count }) => {
                        return <span>{count}</span>
                    }
                }
            </ConterConsumer>
        )
    }
}

export default Conter