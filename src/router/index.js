import Vue from 'vue'
import Router from 'vue-router'
import Home from 'pages/Home'
import Login from 'pages/Login'
import Member from 'pages/Member'
import Shopcar from 'pages/Shopcar'
import Search from 'pages/Search'
import NewsList from 'pages/News/NewsList'
import NewsInfo from 'pages/News/NewsInfo'

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
