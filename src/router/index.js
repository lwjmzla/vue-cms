import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Member from 'pages/Member'
import Shopcar from 'pages/Shopcar'
import Search from 'pages/Search'
import NewsList from 'pages/News/NewsList'
import NewsInfo from 'pages/News/NewsInfo'
import PhotoList from 'pages/Photos/PhotoList.vue'
import PhotoInfo from 'pages/Photos/PhotoInfo.vue'
import GoodsList from 'pages/Goods/GoodsList.vue'
import GoodsInfo from 'pages/Goods/GoodsInfo.vue'
import GoodsComment from 'pages/Goods/GoodsComment.vue'
import GoodsDesc from 'pages/Goods/GoodsDesc.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/home',
      component: Home,
      // children: [ // 用children要用 router-view
      //   {
      //     path: 'newlist',
      //     component: NewsList
      //   }
      // ]
    },
    { path: '/home/newslist', component: NewsList },
    { path: '/home/newsinfo/:id', component: NewsInfo },
    { path: '/home/photolist', component: PhotoList },
    { path: '/home/photoinfo/:id', component: PhotoInfo },
    { path: '/home/goodslist', component: GoodsList },
    { path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo'},
    { path: '/home/goodscomment/:id', component: GoodsComment, name: 'goodscomment'},
    { path: '/home/goodsdesc/:id', component: GoodsDesc, name: 'goodsdesc'},
    {
      path: '/member',
      component: Member
    },
    {
      path: '/shopcar',
      component: Shopcar
    },
    {
      path: '/search',
      component: Search
    }
  ],
  linkExactActiveClass: 'mui-active'
})
