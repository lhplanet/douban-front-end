<template>
  <div class="top">
    <div class="title-box">
      <span class="title">排行榜</span>
      <el-button type="text" @click="getTop250Movies" class="get-more-btn"
        >更多</el-button
      >
    </div>
    <div class="slides-container">
      <Slide
        v-for="(movie, index) in top10MoviesData"
        :key="index"
        :movie="movie"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Slide from "@/components/Slide/index.vue";
import movieAPI from "@/api/movie";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const top10MoviesData = ref([]);
// 获取评分前10电影数据
const getTop10Movies = () => {
  movieAPI
    .getTop10Movies()
    .then((response) => {
      top10MoviesData.value = response.data;
      console.log(top10MoviesData.value);
    })
    .catch((error) => {
      console.log(error);
      ElMessage.error("获取评分前10电影数据失败");
    });
};

const getTop250Movies = () => {
  router.push("/top");
};

onMounted(() => {
  getTop10Movies();
});
</script>

<style scoped lang="scss">
.top {
  .title-box {
    margin-bottom: 20px;
    // 垂直居中
    display: flex;
    align-items: center;

    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .get-more-btn {
      margin-left: 88%;
      color: $base-color-grey;
    }
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
