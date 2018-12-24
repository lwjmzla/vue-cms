<template>
  <div class="main_wrap" ref="main_wrap">
    <div class="goodsdesc-container">
      <h3>{{ info.title }}</h3>

      <hr>

      <div class="content" v-html="info.content"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
export default {
  name: 'goodsdsec',
  data() {
    return {
      info: {} // 图文数据
    };
  },
  created() {
    this.getGoodsDesc();
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.main_wrap, {
      click: true
    })
  },
  watch: {
    info () {
      this.$nextTick(() => {
          setTimeout(() => {
              this.scroll.refresh()
          }, 50)
      })
    }
  },
  methods: {
    getGoodsDesc() {
      axios.get("http://www.liulongbin.top:3005/api/goods/getdesc/" + this.$route.params.id)
        .then(result => {
          result = result.data
          if (result.status === 0) {
            this.info = result.message[0];
          }
        });
    }
  }
};
</script>

<style lang="scss">
.goodsdesc-container {
  padding: 4px;
  h3 {
    font-size: 16px;
    color: #226aff;
    text-align: center;
    margin: 15px 0;
  }
  .content{
    img{
      width: 100%;
    }
  }
}
.main_wrap {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
}
</style>
