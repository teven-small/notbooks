import React from 'react'

import {
    CartList
} from './components'

class App extends React.Component {
    render() {
        return (
            <>
                <CartList store={this.props.store} />
            </>
        )
    }
}

export default App
