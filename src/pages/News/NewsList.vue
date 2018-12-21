<template>

 <div class="list_wrap" ref="list_wrap">
     <ul class="mui-table-view">
      <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
        <router-link :to="'/home/newsinfo/' + item.id">
          <img class="mui-media-object mui-pull-left" :src="item.img_url">
          <div class="mui-media-body">
            <h1>{{ item.title }}</h1>
            <p class='mui-ellipsis'>
              <span>发表时间：{{ item.add_time | dateFormat }}</span>
              <span>点击：{{item.click}}次</span>
            </p>
          </div>
        </router-link>
      </li>

    </ul>
     </div>  
</template>


<script>
import BScroll from 'better-scroll'
import axios from 'axios'
import { Toast } from 'mint-ui';
export default {
  name: 'newslist',
  data() {
    return {
      newslist: []
    }
  },
  methods: {
    getNewsList() {
      // 获取新闻列表
      axios.get("http://www.liulongbin.top:3005/api/getnewslist").then(result => {
        result = result.data
        console.log(result)
        if (result.status === 0) {
          // 如果没有失败，应该把数据保存到 data 上
          this.newslist = result.message;
        } else {
          Toast("获取新闻列表失败！");
        }
      });
    }
  },
  // filters: {
  //   dateFormat(value) {
  //     return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
  //   }
  // },
  activated () {
      console.log('activated')
    //   if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.list_wrap, {
    //         click: true
    //         })
    //   }
  },
  created() {
    this.getNewsList()
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.list_wrap, {
      click: true
    })
  },
  watch: {
    newslist(newVal) {
        this.$nextTick(() => {
            setTimeout(() => {
                this.scroll.refresh()
            }, 50)
        })
    }
  }
}
</script>


<style lang="scss" scoped>
.mui-table-view {
  li {
    h1 {
      font-size: 14px;
    }
    .mui-ellipsis {
      font-size: 12px;
      color: #226aff;
      display: flex;
      justify-content: space-between;
    }
  }
}
.list_wrap {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
    //height: 577px;
}
</style>
