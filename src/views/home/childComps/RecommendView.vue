<template>
  <div class="recommend">
    <div v-for="(item,index) in recommends"
         :key="index"
         class="recomend-item">
      <a :href="item.link">
        <img :src="item.image"
             alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>


<script>
export default {
  name: "RecommendView",
  props: {
    recommends: {
      type: Array,
      default () {
        return []
      }
    }
  }


}
</script>

<style scoped>
.recommend {
  display: flex;
  width: 100%;
  text-align: center;
  padding: 10px 0 20px;
  border-bottom: 8px solid #eee;
}
.recomend-item {
  flex: 1;
}
.recomend-item img {
  width: 65px;
  height: 65px;
  margin-bottom: 10px;
}
</style>