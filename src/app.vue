<template>
  <div class="app-container">
    <mt-header fixed title="Vue项目">
			<span slot="left" @click="goBack">
				<mt-button icon="back">返回</mt-button>
			</span>
		</mt-header>
    <div class="content">
			<transition>
				<keep-alive exclude="newsinfo,photoinfo,goodsinfo,goodsdsec,goodscomment,shopCart">
					<router-view></router-view>
				</keep-alive>
			</transition>
		</div>
    <nav class="mui-bar mui-bar-tab">
			<router-link class="mui-tab-item-llb" to="/home">
				<span class="mui-icon mui-icon-home"></span>
				<span class="mui-tab-label">首页</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/member">
				<span class="mui-icon mui-icon-contact"></span>
				<span class="mui-tab-label">会员</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/shopcar">
				<span class="mui-icon mui-icon-extra mui-icon-extra-cart"><span class="mui-badge" id="badge">{{$store.getters.goodsCount}}</span></span>
				<span class="mui-tab-label">购物车</span>
			</router-link>
			<router-link class="mui-tab-item-llb" to="/search">
				<span class="mui-icon mui-icon-search"></span>
				<span class="mui-tab-label">搜索</span>
			</router-link>
		</nav>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  components: {

	},
	methods: {
		goBack () { // 后续还要判断路径来控制 是否显示此按钮
			if (document.referrer.indexOf("http://" + window.location.host) < 0)
					window.location.href = "/";
			else
			{
					window.history.go(-1);
			}
		}	
	}
}
</script>

<style lang='stylus'>
	.v-enter-active
		transition all 0.3s
	.v-enter
		transform translateX(100%)
	.app-container
		padding-top 40px
		overflow-x hidden // 避免上面的动画效果影响
		//padding-bottom 50px
		width 375px
		height 100%
	html
		height 100%
	body
		min-height 100%
		height 100%
		background #fff
	.mint-header.is-fixed
		width 375px
	.mui-bar-tab
		width 375px
		position relative
	.content
		height calc(100% - 50px)
	// 该类名，解决 tabbar 点击无法切换的问题
	.mui-bar-tab .mui-tab-item-llb.mui-active {
		color: #007aff;
	}

	.mui-bar-tab .mui-tab-item-llb {
		display: table-cell;
		overflow: hidden;
		width: 1%;
		height: 50px;
		text-align: center;
		vertical-align: middle;
		white-space: nowrap;
		text-overflow: ellipsis;
		color: #929292;
	}

	.mui-bar-tab .mui-tab-item-llb .mui-icon {
		top: 3px;
		width: 24px;
		height: 24px;
		padding-top: 0;
		padding-bottom: 0;
	}

	.mui-bar-tab .mui-tab-item-llb .mui-icon ~ .mui-tab-label {
		font-size: 11px;
		display: block;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>