import React, { Component } from 'react'

import { increment, decrement, decrementAsync } from '../../actions/cart'
import { connect } from 'react-redux'
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
               {this.props.cartList.map(item => {
                  return (
                     <tr key={item.id}>
                        <td>{item.id}</td>
                        <td>{item.title}</td>
                        <td>{item.price}</td>
                        <td>
                           <button
                              onClick={this.props.decrementAsync.bind(this, item.id)}
                           >等会儿减</button>
                           <button onClick={
                              () => {
                                 // this.props.dispatch(increment(item.id))
                                 this.props.decrement(item.id)
                              }

                           }>-</button>
                           <span>{item.amount}</span>
                           <button onClick={
                              () => {
                                 // this.props.dispatch(decrement(item.id)) 
                                 this.props.increment(item.id)
                              }
                           }>+</button>
                        </td>
                     </tr>
                  )
               })}
            </tbody>
         </table>
      );
   }
}

const mapState = (state) => {
   return {
      cartList: state.cart
   }
}

// const mapStateToProps = () => dispatch => {
//    return {
//       add: (id) => dispatch(increment(id)),
//       reduce: (id) => dispatch(decrement(id))
//    }
// }

//第一个参数是mapStateToProps，作用就是从store里把state注入到当前组件的props上
//第二个参数可以是mapDispatchToProps，这个的主要作用把action生成的方法注入到当前组件的props上
//一般不推荐使用
// export default connect(mapState, mapStateToProps)(CartList)


//直接第二个蚕食传递一个对象，这里面的对象就是actionCreators，只要引入了actionCreaters,
//在组件内就通过this.props.actionCreator来调用，调用之后，那个actionCreator就会自动把它
//内部的action，dispatch出去
export default connect(mapState, { increment, decrement, decrementAsync })(CartList)