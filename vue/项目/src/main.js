import Vue from 'vue'
import App from './App'
import router from './router'
import {Picker, Popup, MessageBox, Tabbar, TabItem}from 'mint-ui'
import 'mint-ui/lib/style.css'
import Calendar from 'vue-mobile-calendar'
import store from './store/index.js'

Vue.config.productionTip = false
Vue.component(Picker.name, Picker);
Vue.component(MessageBox.name, MessageBox);
Vue.component(Popup.name, Popup);
Vue.component(Tabbar.name, Tabbar);
Vue.component(TabItem.name, TabItem);
Vue.use(Calendar)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
