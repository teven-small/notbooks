import actionType from './actionTypes'

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