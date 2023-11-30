<template>
  <div class="nav">
    <!-- 上半部分：展示 logo 和搜索栏 -->
    <div class="logo-box" @click="backToHome">
      <img src="@/assets/logo.png" class="logo" />
      <span class="title">豆瓣电影</span>
    </div>
    <div class="search-bar">
      <el-input
        v-model="searchQuery"
        placeholder="搜索电影"
        class="search-input"
        clearable
        @keyup.enter="searchMovies"
      >
        <template #append>
          <el-button :icon="Search" @click="searchMovies" />
        </template>
      </el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { ElMessage } from "element-plus";
import { useRouter } from "vue-router";
import { Search } from "@element-plus/icons-vue";

const router = useRouter();
const searchQuery = ref("");

// 搜索电影
const searchMovies = () => {
  if (searchQuery.value === "") {
    ElMessage.warning("请输入搜索内容！");
  } else {
    router.push(`/search/${searchQuery.value}`);
  }
};

// 返回首页
const backToHome = () => {
  router.push({ name: "home" });
};
</script>

<style scoped lang="scss">
.nav {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center; /* 垂直居中 */
  box-shadow: 0px 0px 10px 0px $base-color-grey;
  background-color: $base-color-white;
  // 固定在顶部，不随页面滚动而滚动，且 z-index 为 1
  position: fixed;
  top: 0;
  z-index: 1;

  .logo-box {
    width: 20%;
    height: 100%;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */

    // 鼠标显示为手型
    cursor: pointer;

    .logo {
      width: 50px;
      height: 50px;
    }

    .title {
      font-size: 26px;
      font-weight: bold;
      margin-left: 10px;
    }
  }

  .search-bar {
    width: 60%;
    height: 100%;
    display: flex;
    align-items: center; /* 垂直居中 */
    justify-content: center; /* 水平居中 */
  }

  .search-input {
    width: 40%; /* 输入框宽度占父元素宽度的70% */
    margin-right: 10px; /* 输入框和按钮之间的间距 */
  }

  .el-input {
    // 这里颜色不能使用预设的变量
    --el-input-focus-border-color: #929292;
  }
}
</style>
