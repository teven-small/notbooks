// createContext是react提供的一个用于夸组件传值的方法
import React, { createContext } from 'react';

// console.log(createContext())
//createContext这个方法的结果是一个对象，里面有组件Provider和Consumer
//Provider用于提供状态
//Consumer用于接收状态
const {
    Provider,
    Consumer: ConterConsumer
} = createContext()

//封装一个基本的Provider，因为直接使用Provider，不方便管理状态
class ConterProvider extends React.Component {
    constructor() {
        super()
        //这里的状态就是共享的，任何ConterProvider的子孙组件都可以通过ConterConsumer来接收
        this.state = {
            count: 5
        }
    }
    //这里的方法也会继续通过Provider共享下去
    decrementCount = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    incrementCount = () => {
        this.setState({
            count: this.state.count - 1
        })
    }

    render() {
        return (
            //使用Peovider这个组件，他必须要有一个value值，可以传送任何数据，一般传送一个对象比较合理
            <Provider value={{
                count: this.state.count,
                onDecrementCount: this.decrementCount,
                onIncrementCount: this.incrementCount
            }}>
                {this.props.children}
            </Provider>
        )
    }
}

export {
    ConterConsumer,
    ConterProvider
}