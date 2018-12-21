
// import 'babel-polyfill'
import Vue from 'vue'
import app from './app.vue'
import router from './router'
//import store from './store/index.js'
//import 'bootstrap/dist/css/bootstrap.css'
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
import dayjs from 'dayjs'
import { Header } from 'mint-ui' // 按需加载  还要再 babelrc配置 js的话 在对应组件引入组件就行了
Vue.component(Header.name, Header);
import { Swipe, SwipeItem } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
import { Button } from 'mint-ui'
Vue.component(Button.name, Button);

import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
  // preLoad: 1.3,
  // error: 'dist/error.png',
  loading: require('common/img/loading.gif')
  // attempt: 1
})

import VuePreview from 'vue-preview'
Vue.use(VuePreview)

Vue.config.productionTip = false

Vue.filter('dateFormat', function(value) {
  return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
})

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
