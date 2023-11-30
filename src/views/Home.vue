<template>
  <div class="home">
    <!-- 上半部分：展示 logo 和搜索栏 -->
    <Nav></Nav>

    <!-- 主体部分：展示 Home.vue 或 Search.vue -->
    <div class="main">
      <!-- 左右两部分 -->
      <div class="container">
        <!-- 左侧占80% -->
        <div class="left-side">
          <!-- 上下两部分 -->
          <div class="top-section">
            <Hot></Hot>
          </div>
          <div class="bottom-section">
            <Top></Top>
          </div>
        </div>

        <!-- 右侧占20% -->
        <div class="right-side">
          <Week></Week>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav/index.vue";
import Hot from "@/components/Hot/index.vue";
import Top from "@/components/Top/index.vue";
import Week from "@/components/Week/index.vue";
</script>

<style scoped lang="scss">
// 整个首页的样式
.home {
  background-color: $base-color-grey-light;

  // 上半部分的样式

  .main {
    padding: 110px 14% 0 14%;
    min-height: calc(100vh - 110px);

    // 左右两部分
    .container {
      display: flex;
      min-height: calc(100vh - 110px);
      background-color: $base-color-white;

      // 左侧占
      .left-side {
        margin: 30px;
        width: 80%;

        // 热映
        .top-section {
        }

        // 排行榜
        .bottom-section {
          margin-top: 20px;
        }
      }

      // 右侧占
      .right-side {
        margin: 30px 30px 30px 0;
        width: 20%;
      }
    }
  }
}
</style>
