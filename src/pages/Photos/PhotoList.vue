<template>
  <div class="main_wrap">
    <!-- 顶部滑动条区域 -->
    <div id="slider" class="mui-slider">
      <div id="sliderSegmentedControl" ref="slider" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
        <div class="mui-scroll">
          <a class="mui-control-item" :class="item.id === 0 ? 'mui-active' : ''" v-for="(item, index) in cates" :key="index" @click="getPhotoListByCateId(item.id,$event)">{{item.title}}</a>
        </div>
      </div>

    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/' + item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
          <h1 class="info-title">{{ item.title }}</h1>
          <div class="info-body">{{ item.zhaiyao }}</div>
        </div>
      </router-link>
    </ul>

  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      cates: [], // 所有分类的列表数组
      list: [] // 图片列表的数组
    };
  },
  created() {
    this.getAllCategory();
    this.getPhotoListByCateId(0)
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.slider, {
      click: true,
      scrollY: false,
      scrollX: true
    })
  },
  methods: {
    getAllCategory() {
      // 获取所有的图片分类
      axios.get("http://www.liulongbin.top:3005/api/getimgcategory").then(result => {
        result = result.data
        console.log(result)
        if (result.status === 0) {
          // 手动拼接出一个最完整的 分类列表
          result.message.unshift({ title: "全部", id: 0 });
          this.cates = result.message;
        }
      });
    },
    getPhotoListByCateId(id,ev) {
      if (ev) {
        const target = ev.target
        const parent = target.parentElement
        const children = parent.children
        for (let i = 0;i<children.length;i++) {
          children[i].classList.remove('mui-active')
        }
        target.classList.add('mui-active')
      }
      // 根据 分类Id，获取图片列表
      axios.get("http://www.liulongbin.top:3005/api/getimages/" + id).then(result => {
        result = result.data
        if (result.status === 0) {
          this.list = result.message;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
* {
  touch-action: pan-y;
}

.photo-list {
  list-style: none;
  margin: 0;
  padding: 10px;
  padding-bottom: 0;
  li {
    background-color: #ccc;
    text-align: center;
    margin-bottom: 10px;
    box-shadow: 0 0 9px #999;
    position: relative;
    img {
      width: 100%;
      vertical-align: middle;
    }
    img[lazy="loading"] {
      width: 40px;
      height: 300px;
      margin: auto;
    }

    .info {
      color: white;
      text-align: left;
      position: absolute;
      bottom: 0;
      background-color: rgba(0, 0, 0, 0.4);
      max-height: 84px;
      .info-title {
        font-size: 14px;
      }
      .info-body {
        font-size: 13px;
      }
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
