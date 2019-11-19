const state = {
    meumIndex:0,        //头部菜单导航
    baseStation:'',      //基站选择
    displayType:0,      //显示类型
    searchText:'',      //搜索内容
}

const getters = {
    
}

const actions = {

}

const mutations = {

    // 头部菜单导航
    setmeumState(state, n) {  state.meumIndex = n; },

    //基站选择
    setbaseState(state, n) { state.baseStation = n; },

    //显示类型
    setdisplayState(state, n) { state.displayType = n; },

    //搜索内容
    setsearchState(state, n) { state.searchText = n; },
}

export default {
    state,
    getters,
    actions,
    mutations 
}
