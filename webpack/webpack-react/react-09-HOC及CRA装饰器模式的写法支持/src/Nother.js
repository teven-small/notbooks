import React, { Component } from 'react'

import withCopy from './withCpoy'
@withCopy

class Nother extends Component {
    render() {
        return (
            <div>
                Nother {this.props.name}
            </div>
        )
    }
}

export default Nother