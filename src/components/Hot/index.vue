<template>
  <div class="hot">
    <div class="title-box">
      <span class="title">正在热映</span>
    </div>
    <div class="slides-container">
      <Slide
        v-for="(movie, index) in hotMoviesData"
        :key="index"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import Slide from "@/components/Slide/index.vue";

// 正在热映
const hotMoviesData = reactive([
  {
    name: "电影标题1",
    rating: 8.5,
    poster:
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp",
  },
  {
    name: "电影标题2",
    rating: 7.9,
    poster:
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp",
  },
  {
    title: "电影标题2",
    rating: 7.9,
    poster:
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp",
  },
  {
    title: "电影标题2",
    rating: 7.9,
    poster:
      "https://img2.doubanio.com/view/photo/s_ratio_poster/public/p480747492.webp",
  },
]);
</script>

<style scoped lang="scss">
.hot {
  .title-box {
    margin-bottom: 20px;
  }
  .title {
    font-size: 18px;
    font-weight: bold;
  }

  .slides-container {
    display: flex;
    // 允许内容换行
    flex-wrap: wrap;
    // 左对齐
    justify-content: flex-start;
  }
}
</style>
