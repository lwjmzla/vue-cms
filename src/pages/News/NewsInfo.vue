<template>
  <div class="main_wrap" ref="main_wrap">
    <div class="newsinfo-container">
      <!-- 大标题 -->
      <h3 class="title">{{ newsinfo.title }}</h3>
      <!-- 子标题 -->
      <p class="subtitle">
        <span>发表时间：{{ newsinfo.add_time | dateFormat }}</span>
        <span>点击：{{ newsinfo.click }}次</span>
      </p>

      <hr>

      <!-- 内容区域 -->
      <div class="content" v-html="newsinfo.content"></div>

      <!-- 评论子组件区域 -->
      <!-- <comment-box :id="this.id" @monitor="monitor"></comment-box> -->
      <div class="cmt-container">
        <h3>发表评论</h3>
        <hr>
        <textarea placeholder="请输入要BB的内容（做多吐槽120字）" maxlength="120" v-model="msg"></textarea>

        <mt-button type="primary" size="large" @click="postComment">发表评论</mt-button>

        <div class="cmt-list">
          <div class="cmt-item" v-for="(item, i) in comments" :key="i">
            <div class="cmt-title">
              第{{ i+1 }}楼&nbsp;&nbsp;用户：{{ item.user_name }}&nbsp;&nbsp;发表时间：{{ item.add_time | dateFormat }}
            </div>
            <div class="cmt-body">
              {{ item.content === 'undefined' ? '此用户很懒，嘛都没说': item.content }}
            </div>
          </div>

        </div>
        <div class="loading" style="color:red;" v-show="isLoading">正在加载中。。。</div>
        <!-- <mt-button type="danger" size="large" plain @click="getMore">加载更多</mt-button> -->
      </div>
    </div>
  </div>
</template>

<script>
// 1. 导入 评论子组件
//import comment from "components/comment.vue";
import axios from 'axios'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
export default {
  name: 'newsinfo',
  data() {
    return {
      pageIndex: 1, // 默认展示第一页数据
      comments: [], // 所有的评论数据
      msg: "", // 评论输入的内容
      id: this.$route.params.id, // 将 URL 地址中传递过来的 Id值，挂载到 data上，方便以后调用
      newsinfo: {}, // 新闻对象
      isLoading: false,
      enableLoad: true
    };
  },
  activated() {
    console.log('activated')
  },
  created() {
    console.log('created')
    this.getNewsInfo();
    this.getComments();
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.main_wrap, {
      click: true
    })
    this.scroll.on('scrollEnd', () => {
      //console.log(this.scroll)
      if (this.scroll.y <= this.scroll.maxScrollY + 50) {
        if(!this.isLoading && this.enableLoad) {
          this.isLoading = true
          this.getMore()
        }
        // this._searchMore()
        //alert(1)
      }
    })
  },
  methods: {
    getNewsInfo() {
      // 获取新闻详情
      axios.get("http://www.liulongbin.top:3005/api/getnew/" + this.id).then(result => {
        result = result.data
        if (result.status === 0) {
          this.newsinfo = result.message[0];
        } else {
          Toast("获取新闻失败！");
        }
      });
    },
    getComments() {
      // 获取评论
      axios.get("http://www.liulongbin.top:3005/api/getcomments/" + this.id + "?pageindex=" + this.pageIndex)
        .then(result => {
          result = result.data
          this.isLoading = false
          if (result.status === 0) {
            if (!result.message.length) {
              Toast("数据已加载完毕");
              this.enableLoad = false
            }
            this.comments = this.comments.concat(result.message);
          } else {
            Toast("获取评论失败！");
          }
        });
    },
    getMore() {
      // 加载更多
      this.pageIndex++;
      this.getComments();
    },
    postComment() {
      // 校验是否为空内容
      if (this.msg.trim().length === 0) {
        return Toast("评论内容不能为空！");
      }

      // 发表评论
      // 参数1： 请求的URL地址
      // 参数2： 提交给服务器的数据对象 { content: this.msg }
      // 参数3： 定义提交时候，表单中数据的格式  { emulateJSON:true }
      axios.post("http://www.liulongbin.top:3005/api/postcomment/" + this.$route.params.id, {
          content: this.msg.trim()
        })
        .then((result) => {
          result = result.data
          if (result.status === 0) {
            // 1. 拼接出一个评论对象
            var cmt = {
              user_name: "匿名用户",
              add_time: Date.now(),
              content: this.msg.trim()
            };
            this.comments.unshift(cmt);
            this.msg = "";
          }
        });
    }
  },
  components: {
    // 用来注册子组件的节点
    //"comment-box": comment
  },
  watch: {
    newsinfo(newVal) {
        this.$nextTick(() => {
            setTimeout(() => {
                this.scroll.refresh()
            }, 50)
        })
    },
    comments(newVal) {
      this.$nextTick(() => {
          setTimeout(() => {
              this.scroll.refresh()
          }, 50)
      })
    },
    isLoading () {
      this.$nextTick(() => {
          setTimeout(() => {
              this.scroll.refresh()
          }, 50)
      })
    }
  }
};
</script>

<style lang="scss">
.newsinfo-container {
  padding: 0 4px;
  padding-top: 15px;
  .title {
    font-size: 16px;
    text-align: center;
    margin-bottom: 15px;
    color: red;
  }
  .subtitle {
    font-size: 13px;
    color: #226aff;
    display: flex;
    justify-content: space-between;
  }
  .content {
    img {
      width: 100%;
    }
  }
}
.main_wrap {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
    //height: 577px;
}
.cmt-container {
  h3 {
    font-size: 18px;
  }
  textarea {
    font-size: 14px;
    height: 85px;
    margin: 0;
  }

  .cmt-list {
    margin: 5px 0;
    .cmt-item {
      font-size: 13px;
      .cmt-title {
        line-height: 30px;
        background-color: #ccc;
      }
      .cmt-body {
        line-height: 35px;
        text-indent: 2em;
      }
    }
  }
}
</style>
