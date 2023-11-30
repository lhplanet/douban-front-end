<template>
  <div class="slide" @click="goToLink()">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="movie.poster" class="image" />
      <div style="padding: 14px" class="info">
        <p class="name">{{ movie.name }}</p>
        <p class="rating-box">
          评分: <span class="rating">{{ movie.rating }}</span>
        </p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  movie: {
    type: Object as () => {
      id: number;
      name: string;
      rating: number;
      poster: string;
    },
    required: true,
  },
});

const router = useRouter();

const goToLink = () => {
  // 使用 router.push() 跳转到链接对应的页面
  router.push(`/movie/${props.movie.id}`);
};
</script>

<style scoped lang="scss">
.slide {
  width: calc(20% - 20px); /* 设置宽度，使每行放五个，减去间距 */
  margin-right: 20px; /* 设置间距 */
  margin-bottom: 20px;
  .el-card {
    height: 100%;
    .image {
      width: 100%;
      display: block;
    }
    .info {
      .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .rating-box {
        font-size: 14px;
        margin-bottom: 10px;
        font-weight: bold;
        color: $base-color-grey;
        .rating {
          color: $base-color-orange;
        }
      }
    }
  }

  transition: transform 0.3s ease-in-out;
}

.slide:hover {
  transform: scale(1.05);
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
}
</style>
