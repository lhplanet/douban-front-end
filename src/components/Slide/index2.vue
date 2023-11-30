<template>
  <div class="slide" @click="goToLink()">
    <el-card :body-style="{ padding: '0px' }">
      <img :src="person.poster" class="image" />
      <div style="padding: 14px" class="info">
        <p class="name">{{ person.name }}</p>
        <p class="work">{{ person.work }}</p>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import { useRouter } from "vue-router";
const props = defineProps({
  person: {
    type: Object as () => {
      id: number;
      name: string;
      work: string;
      poster: string;
    },
    required: true,
  },
});

const router = useRouter();

const goToLink = () => {
  // 使用 router.push() 跳转到链接对应的页面
  router.push(`/person/${props.person.id}`);
};
</script>

<style scoped lang="scss">
.slide {
  // 设置宽度，使每行放六个，减去间距
  width: calc(16% - 20px);
  // 设置间距
  margin-right: 20px;
  margin-bottom: 20px;
  height: 38vh;

  .el-card {
    height: 100%;

    .image {
      width: 100%;
      display: block;
      height: 25vh;
      // 图片平铺
      object-fit: cover;
    }
    .info {
      height: 13vh;
      .name {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 10px;
      }
      .work {

        color: $base-color-grey;
        // 只能显示两行，超出部分用省略号代替
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
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
