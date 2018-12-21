<template>
  <div class="main_wrap">
    <div class="photoinfo-container">
      <h3>{{ photoinfo.title }}</h3>
      <p class="subtitle">
        <span>发表时间：{{ photoinfo.add_time | dateFormat }}</span>
        <span>点击：{{ photoinfo.click }}次</span>
      </p>

      <hr>

      <!-- 缩略图区域 -->
      <div class="thumbs">
        <!-- 注意：这里使用的 vue-preview 组件是版本 1.1.3,
            之前上课录屏时候, 所使用的 1.0.5 版本的 vue-preview 存在 Bug -->
        <vue-preview :slides="list"></vue-preview>
      </div>

      <!-- 图片内容区域 -->
      <div class="content" v-html="photoinfo.content"></div>

      <!-- 放置一个现成的 评论子组件 -->
      <cmt-box :id="id"></cmt-box>
    </div>
  </div>
</template>

<script>
// 1. 导入评论子组件
import comment from 'components/comment.vue'
import axios from 'axios'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
export default {
  name: 'photoinfo',
  data() {
    return {
      id: this.$route.params.id, // 从路由中获取到的 图片Id
      photoinfo: {}, // 图片详情
      list: [] // 缩略图的数组
    }
  },
  created() {
    this.getPhotoInfo()
    this.getThumbs()
  },
  methods: {
    getPhotoInfo() {
      // 获取图片的详情
      axios.get('http://www.liulongbin.top:3005/api/getimageInfo/' + this.id).then(result => {
        result = result.data
        if (result.status === 0) {
          this.photoinfo = result.message[0]
        }
      })
    },
    getThumbs() {
      // 获取缩略图
      axios.get('http://www.liulongbin.top:3005/api/getthumimages/' + this.id).then(result => {
        result = result.data
        if (result.status === 0) {
          // 循环每个图片数据，补全图片的宽和高
          this.list = result.message.map((item) => {
            return {
              w: 600,
              h: 600,
              msrc: item.src,
              src: item.src
            }
          })
          console.log(this.list)
        }
      })
    }
  },
  components: {
    // 注册 评论子组件
    'cmt-box': comment
  }
}
</script>

<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }
  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }

  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>

<style lang="scss">
.thumbs {
  .my-gallery {
    display: flex;
    flex-wrap: wrap;
  }
  figure {
    width: 100px;
    height: 100px;
    margin: 10px;
    box-shadow: 0 0 8px #999;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
.main_wrap {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
  overflow: auto;
    //height: 577px;
}
</style>
