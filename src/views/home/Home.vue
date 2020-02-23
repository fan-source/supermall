<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
                 @tabClick='tabClick'
                 ref='tabControl1'
                 class='tab-control'
                 v-show="isTabFixed" />
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentscroll"
            :pull-up-load="true"
            @pullingUp='loadMore'>
      <home-swiper :banners='banners'
                   @swiperImageLoad='swiperImageLoad' />
      <recommend-view :recommends='recommends' />
      <feature-view />
      <tab-control :titles="['流行','新款','精选']"
                   @tabClick='tabClick'
                   ref='tabControl2' />
      <!-- :class="{fixed:isTabFixed}" /> -->
      <good-list :goods="showGoods" />
    </scroll>
    <back-top @click.native='backClick'
              v-show="isShowBackTop"></back-top>

  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'

import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultiadata } from 'network/home'
import { getHomeGoods } from 'network/home'
import { debounce } from 'common/utils'


export default {
  name: "Home",
  data () {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] }
      },
      // 默认展示流行数据
      currentType: 'pop',
      // 判断backtap是否展示
      isShowBackTop: false,
      tabOffsetTop: 0,
      // 判断是否吸顶的量
      isTabFixed: false,
      saveY: 0

    }
  },
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop

  },
  created () {
    //1.请求多个数据 将网络请求放在methods内 外面包裹一个函数。this.getHomeMultiadata调用
    this.getHomeMultiadata()
    // 2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },

  mounted () {
    // 图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 50)
    // 事件总线 接收
    this.$bus.$on('itemimageload', () => {
      // this.$refs.scroll.refresh()
      refresh()
    })
  },
  destroyed () {
    console.log('home destroyed')
  },
  activated () {
    // console.log('home active')
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  deactivated () {
    this.saveY = this.$refs.scroll.getScrollY()
    console.log(this.saveY)
  },
  computed: {
    showGoods () {

      return this.goods[this.currentType].list
    }
  },

  methods: {
    /**
     * 事件监听
     */


    tabClick (index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentindex = index;
      this.$refs.tabControl2.currentindex = index;

    },
    backClick () {
      // console.log('btnClick')
      // 拿scroll组件，再去拿里面属性 在调其中的方法
      // this.$refs.scroll.scroll.scrollTo(0, 0, 1000)
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentscroll (position) {

      // 1.判断backtop是否显示   position.y < 1000
      this.isShowBackTop = (-position.y) > 1000
      // 2.决定tabControl是否吸顶{position：fixed}
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    // func=this.$refs.scroll.refresh
    loadMore () {
      // console.log('----')
      this.getHomeGoods(this.currentType)
    },
    // 获取当幻灯片图片加载完后的offsettop
    swiperImageLoad () {
      // 2.获取tabControl中的offsetTop
      // 所有组件都有用一个属性$el,用于获取组件元素
      // console.log(this.$refs.tabControl2.$el.offsetTop)
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop

    },


    /**
     * 网络请求相关
     */
    getHomeMultiadata () {
      getHomeMultiadata().then(res => {
        // console.log(res)
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1
        // 完成上拉加载最多
        this.$refs.scroll.finishPullUp()

      })
    },
  }
}
</script>

<style scoped>
#home {
  /* padding-top: 44px; */
  /* vh->viewpprt 视口 */
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* 在使用浏览器原生滚动时 为了让导航不跟随一起滚动*/
  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}
/* 当达到top 44px 自动positon切换为fixed属性 */
/* .tab-control {
  position: sticky;
  top: 44px;
} */
/* .fixed {
  position: fixed;
  left: 0;
  right: 0;
  top: 44px;
} */
.tab-control {
  position: relative;
  z-index: 9;
}
.content {
  overflow: hidden;
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>