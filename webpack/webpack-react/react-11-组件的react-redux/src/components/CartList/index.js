import React, { Component } from 'react'
//connect执行之后是一个高阶组件
import { connect } from 'react-redux'
//导入actionCreators
import { increment, decrement } from '../../actions/cart'

class CartList extends Component {

    render() {
        console.log(this.props)
        return (
            <table>
                <thead>
                    <tr>
                        <th>id</th>
                        <th>商品名称</th>
                        <th>价格</th>
                        <th>数量</th>
                        <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.cartList.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.title}</td>
                                    <td>{item.price}</td>
                                    <td>
                                        <button
                                            onClick={
                                                () => {
                                                    this.props.increment(item.id)
                                                }
                                            }
                                        >-</button>
                                        <span>{item.number}</span>
                                        <button
                                            onClick={
                                                () => {
                                                    this.props.decrement(item.id)
                                                }
                                            }
                                        >+</button>
                                    </td>
                                    <td></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        )
    }
}

//mapStateToProps，这里的state实际上是store.getState()的值
const mapStateProps = (state) => {
    // console.log(state)
    //这里的return了什么，在组件就可以通过this.props来获取
    return {
        cartList: state.cart
    }
}

//mapDispathToProps
// const mapDispath = dispatch => {
//     return {
//         add: (id) => dispatch(increment(id)),
//         reduce: (id) => dispatch(decrement(id)),
//     }
// }

//connect方法有四个参数，常用的就是前面两个，
//参数：
//1.mapStateToProps,作用就是从store里把state注入到当前组件的props上
//2.mapDispathToProps，主要作用是把action生成的方法注入到当前组件的props上，一般来说也没必要这样用
// export default connect(mapStateProps, mapDispath)(CartList)

//直接第二个参数传递一个对象，这里的对象就是actionCreators，只要传入了actionCreators，在组件
//内就可以通过this.props.actionCreator来调用，这样的话，在调用之后，那个actionCreator就会自动
//帮你把它内部的action dispath出去
export default connect(mapStateProps, { increment, decrement })(CartList)