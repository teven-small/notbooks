import React from 'react'
import { ConterConsumer } from '../../counterStore'

class CounterBtn extends React.Component {
    render() {
        return (
            <ConterConsumer>
                {
                    ({ onIncrementCount, onDecrementCount }) => {
                        const handler = this.props.type === "increment" ? onIncrementCount : onDecrementCount
                        return <button onClick={handler}>{this.props.children}</button>
                    }
                }
            </ConterConsumer>
        )
    }
}

export default CounterBtn