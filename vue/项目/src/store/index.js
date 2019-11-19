import Vue from 'vue'
import Vuex from 'vuex'
import all from './module/all';

Vue.use(Vuex)

// 创建 store 实例
export default new Vuex.Store({
  modules: {
      all
  }
})