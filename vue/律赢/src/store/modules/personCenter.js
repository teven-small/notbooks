// initial state
/* 个人中心页面状态管理 */

  const state = {
    // 个人中心导航
    navIndex: 0 ,
    // 记录地址为空和不为空
    addressState: 0,
    // 记录订单类型状态
    orderType: 0,
    // 记录视频播放下标
    videoIndex: '',
    // 记录音频播放下标
    audioIndex: '',
    videoState: 0,
  }
  
  // getters
  const getters = {
    
  }
  
  // actions
  const actions = {
   
  }
  
  // mutations
  const mutations = {
    
    // 个人中心导航
    NavIndex(state, n) {  state.navIndex = n; },
    // 当地址为空时
    setAddressState(state, n) {  state.addressState = n  },
    // 记录订单类型状态
    setOrderType(state, n) {  state.orderType = n  },
    // 记录视频类型状态
    setVideoIndex(state, n) {  state.videoIndex = n  ; },
    // 记录视频首次播放
    setVideoState(state, n) {  state.videoState = n  ; },
    // 记录音频类型状态
    setAudioIndex(state, n) {  state.audioIndex = n  ; },

  }
  
  export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
  }