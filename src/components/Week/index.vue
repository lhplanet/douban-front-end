<template>
  <div class="week">
    <div class="title-box">
      <span class="title">一周口碑榜</span>
      <el-divider class="divider first-divider" border-style="dashed" />
    </div>

    <div class="links-container">
      <div
        class="link-item"
        v-for="(movie, index) in weekMoviesData"
        :key="index"
      >
        <router-link :to="`/week/${index + 1}`" v-if="index == 0"
          ><span class="num-1">1</span
          ><span class="link-1">{{ movie.title }}</span></router-link
        >
        <router-link :to="`/week/${index + 1}`" v-else-if="index == 1"
          ><span class="num-2">2</span
          ><span class="link-2">{{ movie.title }}</span></router-link
        >
        <router-link :to="`/week/${index + 1}`" v-else-if="index == 2"
          ><span class="num-3">3</span
          ><span class="link-3">{{ movie.title }}</span></router-link
        >
        <router-link :to="`/week/${index + 1}`" v-else-if="index < 9"
          ><span class="num">{{ index + 1 }}</span
          >{{ movie.title }}</router-link
        >
        <router-link :to="`/week/${index + 1}`" v-else
          ><span class="num-10">{{ index + 1 }}</span
          >{{ movie.title }}</router-link
        >
        <el-divider class="divider" border-style="dashed" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";

// 一周口碑榜
const weekMoviesData = reactive([
  {
    title: "电影标题1",
    rating: 8.5,
  },
  {
    title: "电影标题2电影标题2电影标题2电影标题2",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
  {
    title: "电影标题3",
    rating: 7.9,
  },
]);
</script>

<style scoped lang="scss">
.week {
  .title-box {
    margin-bottom: 20px;
    // 水平居中
    text-align: center;
    .title {
      font-size: 18px;
      font-weight: bold;
    }
    .first-divider {
      width: 70%;
      // 居中
      margin: 20px auto;
    }
  }

  .links-container {
    .link-item {
      width: 100%;
      .divider {
        width: 100%;
        margin: 10px 0;
      }
      .num,
      .num-1,
      .num-2,
      .num-3,
      .num-10 {
        margin-right: 10px;
        font-size: 12px;
        // 垂直居中
        display: inline-block;
        vertical-align: middle;
      }
      .num-1 {
        color: $base-color-red;
      }
      .num-2 {
        color: $base-color-orange;
      }
      .num-3 {
        color: $base-color-orange-light;
      }
      .num-10 {
        margin-right: 3px;
        font-size: 12px;
        // 垂直居中
        display: inline-block;
        vertical-align: middle;
      }
    }
    .link-item:last-child {
      margin-bottom: 0;
    }
    .link-item a {
      display: block;
      font-size: 16px;
      font-weight: bold;
      color: #333;
      cursor: pointer;
      // 取消 a 标签的下划线
      text-decoration: none;
      // 如果内容过长，超出部分用省略号代替
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .link-item a:hover {
      color: #409eff;
    }

    .link-1:hover {
      color: $base-color-red;
    }
    .link-2:hover {
      color: $base-color-orange;
    }
    .link-3:hover {
      color: $base-color-orange-light;
    }
  }
}
</style>
