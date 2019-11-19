import actionTypes from '../actions/actionTypes'
const initState = [
    {
        id: 1,
        title: 'Apple',
        price: 6999,
        number: 1
    },
    {
        id: 2,
        title: 'Orange',
        price: 8999,
        number: 1
    }
]

export default (state = initState, action) => {
    // console.log(action)
    switch (action.type) {
        case actionTypes.ADD_NUMBER_INCREMENT:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item.number -= 1
                }
                return item
            })
        case actionTypes.ADD_NUMBER_DECREMENT:
            return state.map(item => {
                if (item.id === action.payload.id) {
                    item.number += 2
                }
                return item
            })
        default:
            return state
    }
}