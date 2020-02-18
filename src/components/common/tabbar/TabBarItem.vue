<template>
  <div class="tab-bar-item"
       @click="itemClick">
    <!-- 所有的item都展示同一个图片 同一个文字 -->
    <!-- <img src="../../assets/img/tabbar/home.svg" alt=""> -->
    <div v-if="!isActive">
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style="activeStyle">
      <slot name='item-text'></slot>
    </div>
    <!-- <slot :class="{active:isACtive}"
          name='item-text'></slot> -->
  </div>
</template>


<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data () {
    return {
      // isACtive: true
    }
  },
  computed: {
    isActive () {
      // home ->item1(/home)=true
      // home ->item1(/category)=false
      // home ->item1(/cart)=false
      // home ->item1(/profile)=false
      // 等于-1 表示没有找到
      return this.$route.path.indexOf(this.path) !== -1

    },
    activeStyle () {
      return this.isActive ? { color: this.activeColor } : {}
    }
  },
  methods: {
    itemClick () {
      // console.log('itemClick')
      this.$router.replace(this.path)
      // console.log(this.path)
      // console.log(this.$route.path)
    }
  }
}


</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  text-align: center;
  height: 49px;
  font-size: 14px;
}

.tab-bar-item img {
  width: 24px;
  height: 24px;
  margin-top: 3px;
  /* 图片最下面多3个像素 */
  vertical-align: middle;
  margin-bottom: 2px;
}
/* 插槽相当于会替换一个div动态绑定div没有效果 */
.active {
  color: red;
}
</style>