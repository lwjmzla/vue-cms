import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    goods: JSON.parse(localStorage.getItem('goods')) || []
  },
  mutations: {
    addGoods (state, good) {
      let isNewGood = true
      state.goods.forEach((item) => {
        if (item.id === good.id) {
          item.count = item.count + good.count
          isNewGood = false
        }
      })
      if (isNewGood) {
        state.goods.push(good)
      }
      localStorage.setItem('goods',JSON.stringify(state.goods))
    },
    removeGoods(state, id) {
      state.goods.forEach((item,index) => {
        if (item.id === id) {
          state.goods.splice(index,1)
        }
      })
      localStorage.setItem('goods',JSON.stringify(state.goods))
    }
  },
  actions: {

  },
  getters: {
    goodsCount (state) {
      let count = 0
      state.goods.forEach((item) => {
        count += item.count
      })
      return count
    }
  }
})

export default store