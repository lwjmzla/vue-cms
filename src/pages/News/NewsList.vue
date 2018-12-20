<template>

 <div class="list_wrap" ref="list_wrap">
     <ul class="mui-table-view">
				<li class="mui-table-view-cell mui-media" v-for="(item) in  commentList" :key="item.commentId">
					<router-link :to="'/home/newsinfo/'+ item.commentId ">
						<img class="mui-media-object mui-pull-left" :src="item.user.avatarUrl">
						<div class="mui-media-body">
							{{item.user.nickname}}
							<p class='mui-ellipsis'>
                                <span>发表时间:{{item.time | dataFormat}}</span>
                                <span>喜欢指数:{{item.likedCount}}</span>
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
import dayjs from 'dayjs'
export default {
  name: 'newslist',
  data() {
    return {
      commentList: []
    }
  },
  methods: {},
  filters: {
    dataFormat(value) {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
    }
  },
  activated () {
      console.log('activated')
    //   if (!this.scroll) {
    //       this.scroll = new BScroll(this.$refs.list_wrap, {
    //         click: true
    //         })
    //   }
  },
  deactivated () {
    //   console.log('deactivated')
    //   this.scroll.destroy()
    //   console.log(this.scroll)
  },
  created() {
    //由于找的是网易音乐的评论接口,需要传递id,这里是模拟的,直接固定了一首歌曲id
    axios
      .get(`https://autumnfish.cn/comment/music?id=255294&limit=5`)
      .then(response => {
        //把评论的时间戳转化为时间 这里也可以定义全局的过滤器来过滤时间
        // response.data.hotComments.forEach(element => {
        // element.time=new Date(element.time).toLocaleDateString()
        // .replace(/\//g, "-") + " " + new Date(element.time).toTimeString().substr(0, 8);
        // });
        //console.log(response);
        this.commentList = response.data.hotComments
      })
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.list_wrap, {
      click: true
    })
  },
  watch: {
    commentList(newVal) {
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
.mui-media-body {
  font-size: 14px;
  color: rgb(64, 61, 245);
  .mui-ellipsis {
    font-size: 13px;
    display: flex;
    justify-content: space-between;
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
