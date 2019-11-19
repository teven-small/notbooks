import React from 'react'
import { Counter, CountBtn } from './view'

export default class App extends React.Component {
    render() {
        return (
            <>
                <CountBtn type="decrement">+</CountBtn>
                <Counter />
                <CountBtn type="increment">-</CountBtn>
            </>
        )
    }
}
