<template>
  <div class="main_wrap" ref="main_wrap">
    <div style="padding: 5px 0;">
      <cmtbox :id="$route.params.id"></cmtbox>
    </div>
  </div>
</template>

<script>
import cmtbox from "components/comment.vue";
import axios from 'axios'
import BScroll from 'better-scroll'
import { Toast } from 'mint-ui';
export default {
  name: 'goodscomment',
  components: {
    cmtbox
  },
  mounted() {
    this.scroll = new BScroll(this.$refs.main_wrap, {
      click: true
    })
  },
  watch: {
  },
};
</script>

<style lang="scss" scoped>
.main_wrap {
  position: absolute;
  width: 100%;
  top: 40px;
  bottom: 50px;
}
</style>
