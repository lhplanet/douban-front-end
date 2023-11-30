<template>
  <div class="overview" @click="goToLink()">
    <el-card :body-style="{ padding: '0px' }">
      <div class="content">
        <!-- 序号部分 -->
        <div class="index">
          <span class="index-num">{{ props.index }}</span>
        </div>
        <!-- 左侧图片部分 -->
        <div class="image">
          <img :src="movie.poster" />
        </div>
        <!-- 右侧信息部分 -->
        <div class="info">
          <p class="name">
            {{ movie.name }}
          </p>

          <p class="directors">
            <span class="sub-title">导演：</span>
            <span v-for="(director, index) in movie.directors" :key="index">
              {{ director }}
              <span v-if="index !== movie.directors.length - 1"> / </span>
            </span>
          </p>

          <p class="actors">
            <span class="sub-title">主演：</span>
            <span v-for="(actor, index) in movie.actors" :key="index">
              {{ actor }}
              <span v-if="index !== movie.actors.length - 1"> / </span>
            </span>
          </p>

          <p class="year">
            {{ movie.year }}
            |
            <span v-for="(country, index) in movie.countries" :key="index">
              {{ country }}
              <span v-if="index !== movie.countries.length - 1"> </span>
            </span>
            |
            <span v-for="(type, index) in movie.types" :key="index">
              {{ type }}
              <span v-if="index !== movie.types.length - 1"> </span>
            </span>
          </p>

          <div class="rating-and-votes">
            <div class="rate-left">
              <span class="rate-num">{{ movie.rating }}</span>
            </div>
            <div class="rate-right">
              <el-rate v-model="doubanRating" disabled class="rate-stars" />
              <p class="votes-num">{{ movie.votes }}人评价</p>
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps, ref } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  index: Number,
  movie: {
    type: Object as () => {
      id: number;
      poster: string;

      name: string;

      directors: any;
      actors: any;

      year: string;
      countries: any;
      types: any;

      rating: number;
      votes: number;
    },
    required: true,
  },
});

const doubanRating = ref(0);
doubanRating.value = props.movie.rating / 2;

const router = useRouter();

const goToLink = () => {
  // 使用 router.push() 跳转到链接对应的页面
  router.push(`/movie/${props.movie.id}`);
};
</script>

<style scoped lang="scss">
.overview {
  width: 60vw;
  margin-bottom: 20px;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.3);
  }

  .content {
    display: flex;
    padding: 14px;

    .index {
      width: 2vw; /* 左侧部分占比 */
      margin: 10px 10px;
      font-weight: bold;
      color: $base-color-grey;
      font-size: 16px;
    }

    .image {
      width: 8vw; /* 左侧部分占比 */
      margin-right: 20px;
    }

    .image img {
      width: 100%;
      display: block;
    }

    .info {
      width: 50vw; /* 右侧部分占比 */
      font-size: 15px;
      .sub-title {
        font-weight: bold;
        color: $base-color-grey;
      }

      .name {
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 15px;
        margin-top: 10px;
      }

      .directors {
        color: $base-color-grey;
        margin-bottom: 10px;
        white-space: nowrap; /* 限制文本不换行 */
        overflow: hidden; /* 隐藏溢出部分 */
        text-overflow: ellipsis; /* 显示省略号 */
      }

      .actors {
        color: $base-color-grey;
        margin-bottom: 10px;
        // 只能显示两行，超出部分显示省略号
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
        line-height: 1.2;
      }

      .year {
        color: $base-color-grey;
        margin-bottom: 10px;
      }

      .rating-and-votes {
        display: flex;
        justify-content: left;
        .rate-left {
          // 垂直居中
          display: flex;
          align-items: center;
          margin-right: 10px;
          .rate-num {
            font-size: 30px;
            color: $base-color-orange;
          }
        }
        .rate-right {
          .rate-stars {
          }
          .votes-num {
            font-size: 14px;
            font-weight: bold;
            color: $base-color-grey;
            margin-bottom: 10px;
          }
        }
      }

      .review {
        color: $base-color-grey;
        .quote-icon {
          // 转化成行内元素
          display: inline-block;
        }
      }
    }
  }
}
</style>
