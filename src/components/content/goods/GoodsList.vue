<template>
  <div class="goodslists">
    <goods-list-item v-for='(item,index) in goods'
                     :key="index"
                     :goodsItem='item' />
  </div>
</template>

<script>
import GoodsListItem from './GoodsListItem'
export default {
  name: 'GoodsList',
  components: {
    GoodsListItem
  },
  props: {
    goods: {
      type: Array,
      default () {
        return []
      }
    }
  }


}
</script>

<style scoped>
.goodslists {
  display: flex;
  /* 默认 为布包裹  wrap会根据宽度显示一行多少个 */
  flex-wrap: wrap;
  /* 均等分 */
  justify-content: space-around;
  padding: 2px;
}
</style>