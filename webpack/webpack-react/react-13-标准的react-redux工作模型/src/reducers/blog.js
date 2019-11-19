import actionTyes from '../actions/actionTypes'
const initState = {
    list: [{
        "userId": 1,
        "id": 2,
        "title": "qui est esse",
        "body": "est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla"
    },
    {
        "userId": 1,
        "id": 3,
        "title": "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        "body": "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut"
    },],
    isLoading: false
}

export default (state = initState, action) => {
    switch (action.type) {
        case actionTyes.START_FETCH_BLOG_LIST:
            return {
                ...state,
                isLoading: true
            }
        case actionTyes.FETCH_BLOG_LIST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                list: action.payload.list,
                msg: ''
            }
        case actionTyes.FETCH_BLOG_LIST_FAILED:
            return {
                ...state,
                isLoading: false,
                msg: "数据获取失败！"
            }
        default:
            return state
    }
}