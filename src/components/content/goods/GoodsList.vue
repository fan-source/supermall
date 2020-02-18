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
</style>