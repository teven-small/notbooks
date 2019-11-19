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