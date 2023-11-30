<template>
  <div class="top">
    <!-- 上半部分：展示 logo 和搜索栏 -->
    <Nav></Nav>

    <div class="main">
      <div class="container">
        <p class="title">豆瓣电影 Top 250</p>
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
import { ref, onMounted } from "vue";
import movieAPI from "@/api/movie";

const resultMoviesData = ref([]);

const getTop250Movies = () => {
  movieAPI
    .getTop250Movies()
    .then((response) => {
      console.log("获取电影数据成功", response);
      resultMoviesData.value = response.data;
    })
    .catch((error) => {
      console.error(error);
    });
};

onMounted(() => {
  getTop250Movies();
});

</script>

<style scoped lang="scss">
.top {
  background-color: $base-color-grey-light;

  .main {
    padding: 110px 14% 0 14%;
    min-height: calc(100vh - 110px);

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      background-color: $base-color-white;
      padding-top: 20px;

      .title {
        font-size: 24px;
        font-weight: bold;
        margin: 35px 0;
      }

      .overviews-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
      }
    }
  }
}
</style>
