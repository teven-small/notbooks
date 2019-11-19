import actionType from './actionTypes'

//第一种写法谢忱给一个对象，这是标准的action，但是，问题不方便产地动态传输
// export const increment = {
//   type: actionType.ADD_NUMBER_INCREMENT,
//   payload: {
//       id
//   }
// }

//在工作中，常用的一种方式是使用actionCreatot，他是一个方法，返回一个对象，这个对象才是真正的action
export const increment = (id) => {
    // console.log(id)
    return {
        type: actionType.ADD_NUMBER_INCREMENT,
        payload: {
            id
        }
    }
}

export const decrement = (id) => {
    // console.log(id)
    return {
        type: actionType.ADD_NUMBER_DECREMENT,
        payload: {
            id
        }
    }
}

//异步action，使用redux-thunk之后，可以使用actionCreator里的return一个方法，这个方法的参数是dispatch
// export const decrementAsync = (id) => {
//     return (dipatch) => {
//         setTimeout(() => {
//             dipatch(decrement(id))
//         }, 2000)
//     }
// }

export const decrementAsync = id => dipatch => {
    setTimeout(() => {
        dipatch(decrement(id))
    }, 2000)
}