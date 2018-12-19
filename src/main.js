
// import 'babel-polyfill'
import Vue from 'vue'
import app from './app.vue'
import router from './router'
//import store from './store/index.js'
//import 'bootstrap/dist/css/bootstrap.css'
import './lib/mui/css/mui.min.css'
import { Header } from 'mint-ui'
Vue.component(Header.name, Header);
// import { Button } from 'mint-ui' // 按需加载  还要再 babelrc配置 js的话 在对应组件引入组件就行了
// Vue.component(Button.name, Button)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { app },
  template: '<app/>'
  // render: function (createElements) {
  //   return createElements(app)
  // }
  // render: (c) => c(app)
  // render (c) {
  //   return c(app)
  // }
})
