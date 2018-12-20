<template>
  <div>
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="(item,index) in lunbotuList" :key="index">
        <img :src="item" class="lunbo_img" />
      </mt-swipe-item>
    </mt-swipe>
    <!-- 九宫格demo -->
    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
          <router-link to="/home/newslist">
            <img src="../common/img/menu1.png" alt="">
            <div class="mui-media-body">新闻资讯</div>
          </router-link>
        </li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
                  <img src="../common/img/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                <img src="../common/img/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                <img src="../common/img/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                  <img src="../common/img/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></router-link></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/">
                  <img src="../common/img/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></router-link></li>
        
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      lunbotuList: [
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1105176.jpg',
        'http://y.gtimg.cn/music/common/upload/MUSIC_FOCUS/1105801.jpg'
      ]
    }
  },
  components: {},
  created() {},
  methods: {}
}
</script>

<style lang='stylus' scoped>
.mint-swipe {
  height: 200px;

  .mint-swipe-item {
    img {
      width: 100%;
      height: 100%;
    }
  }
}

.mui-grid-view.mui-grid-9 {
  background-color: #fff;
  border: none;

  li {
    border: none;

    img {
      width: 60px;
      height: 60px;
    }

    .mui-media-body {
      font-size: 13px;
    }
  }
}

.mint-swipe-indicator {
  opacity: 0.5;
}

.is-active {
  background: blue !important;
}
</style>
