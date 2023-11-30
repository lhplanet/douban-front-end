<template>
  <div class="search">
    <!-- 上半部分：展示 logo 和搜索栏 -->
    <Nav></Nav>

    <div class="main">
      <div class="container">
        <div class="overviews-container">
          <Overview
            v-for="(movie, index) in resultMoviesData"
            :key="index"
            :movie="movie"
            :index="index + 1"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav/index.vue";
import Overview from "@/components/Overview/index.vue";
import { useRoute } from "vue-router";
import { onMounted, ref, watch } from "vue";
import movieAPI from "@/api/movie";

const $route = useRoute(); // 获取当前路由信息
const keyword = ref(""); // 获取路由参数 keyword 的值
keyword.value = $route.params.keyword.toString();

const resultMoviesData = ref([]);

// 通过用户输入的关键字查找电影
const getMoviesByKeyword = (keyword: string) => {
  movieAPI
    .getMoviesByKeyword(keyword)
    .then((response) => {
      console.log("获取电影数据成功", response);
      resultMoviesData.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  if (keyword) {
    getMoviesByKeyword(keyword.value);
  }
});

// 监听路由参数 keyword 的变化
watch(
  () => $route.params.keyword,
  (newVal, oldVal) => {
    console.log("keyword 变化了", newVal, oldVal);
    keyword.value = newVal.toString();
    getMoviesByKeyword(keyword.value);
  }
);
</script>

<style scoped lang="scss">
.search {
  background-color: $base-color-grey-light;
  margin-top: 100px;

  .main {
    padding: 0px 14% 0 14%;
    min-height: calc(100vh - 100px);

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $base-color-white;
      padding-top: 20px;
      min-height: calc(100vh - 100px);

      .overviews-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
</style>
