<template>
  <div class="person">
    <!-- 展示 logo 和搜索栏 -->
    <Nav></Nav>
    <!-- 主体部分 -->
    <div class="main">
      <div class="container">
        <!-- 人物简介部分 -->
        <div class="person-info">
          <div class="person-name">
            <!-- 上部分：人物名 -->
            <span class="name">{{ personData.name }}</span>
          </div>
          <div class="person-details">
            <!-- 下部分：左右两栏 -->
            <div class="left-column">
              <!-- 显示人物图片 -->
              <img :src="personData.poster" alt="Person Poster" />
            </div>
            <div class="center-column">
              <p>
                <span class="sub-title">性别：</span>
                <span>{{ personData.gender }}</span>
              </p>
              <p>
                <span class="sub-title">星座：</span>
                <span>{{ personData.constellation }}</span>
              </p>
              <p>
                <span class="sub-title">出生日期：</span>
                <span>{{ personData.birthday }}</span>
              </p>
              <p>
                <span class="sub-title">出生地：</span>
                <span>{{ personData.birthplace }}</span>
              </p>
              <p>
                <span class="sub-title">职业：</span>
                <span>{{ personData.occupation }}</span>
              </p>
              <p>
                <span class="sub-title">IMDb编号：</span>
                <a :href="imdb.imdbUrl" target="_blank" class="imdb-url">{{
                  imdb.imdbName
                }}</a>
              </p>
            </div>
          </div>
        </div>

        <!-- 影人简介 -->
        <div class="person-introduction">
          <el-divider content-position="left">
            <p class="part-name">影人简介</p>
          </el-divider>
          <div class="introduction">
            <p>
              {{ personData.introduction }}
            </p>
          </div>
        </div>

        <!-- 影人图片 -->
        <div class="related-image">
          <el-divider content-position="left">
            <p class="part-name">影人图片</p>
          </el-divider>
          <div class="image">
            <img
              src="https://img2.doubanio.com/view/celebrity/raw/public/p34642.jpg"
              alt="Person Poster"
            />
            <img
              src="https://img2.doubanio.com/view/celebrity/raw/public/p34642.jpg"
              alt="Person Poster"
            />
            <img
              src="https://img2.doubanio.com/view/celebrity/raw/public/p34642.jpg"
              alt="Person Poster"
            />
            <img
              src="https://img2.doubanio.com/view/celebrity/raw/public/p34642.jpg"
              alt="Person Poster"
            />
          </div>
        </div>

        <!-- 获奖情况 -->
        <div class="awards">
          <el-divider content-position="left">
            <p class="part-name">获奖情况</p>
          </el-divider>
          <div class="awards-list">
            <p v-for="(award, index) in awardsData" :key="index">
              {{ award.name }}
            </p>
          </div>
        </div>

        <!-- 最近的5部作品 -->
        <div class="last-five-works">
          <el-divider content-position="left">
            <p class="part-name">最近的5部作品</p>
          </el-divider>
          <!-- <div class="awards-list">
            <p v-for="(award, index) in awardsData" :key="index">
              {{ award.name }}
            </p>
          </div> -->
        </div>

        <!-- 最受好评的5部作品 -->
        <div class="best-five-works">
          <el-divider content-position="left">
            <p class="part-name">最受好评的5部作品</p>
          </el-divider>
          <!-- <div class="awards-list">
            <p v-for="(award, index) in awardsData" :key="index">
              {{ award.name }}
            </p>
          </div> -->
        </div>

        <!-- 合作2次以上的影人 -->
        <div class="collaborate-more-than-twice">
          <el-divider content-position="left">
            <p class="part-name">合作2次以上的影人</p>
          </el-divider>
          <!-- <div class="awards-list">
            <p v-for="(award, index) in awardsData" :key="index">
              {{ award.name }}
            </p>
          </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav/index.vue";
// import Slide from "@/components/Slide/index2.vue";

import { reactive, onMounted, ref } from "vue";
import personAPI from "@/api/person";
import { ElMessage } from "element-plus";
import { useRoute } from "vue-router";

const $route = useRoute();
// 获取路由参数
const personId = $route.params.id;

const personData = ref([]);

// 将imdb编号的地址https://www.imdb.com/name/nm0000151/中的nm0000151提取出来，并一起封装到对象中
let imdbUrl: string = "";
// 取出最后的9位
const imdb = {
  imdbName: imdbUrl.substring(imdbUrl.length - 9, imdbUrl.length),
  imdbUrl,
};

const getPersonById = (id: number) => {
  personAPI
    .getPersonById(id)
    .then((response) => {
      console.log("获取人物数据成功", response);
      personData.value = response.data;
      imdbUrl = personData.value.imdb;
      imdb.imdbName = imdbUrl.substring(imdbUrl.length - 9, imdbUrl.length);
      imdb.imdbUrl = imdbUrl;
      console.log(personData.value);
    })
    .catch((error) => {
      console.error("获取人物数据失败", error);
      ElMessage.error("获取人物数据失败，请重试！");
    });
};

onMounted(() => {
  if (Array.isArray(personId)) {
    getPersonById(parseInt(personId[0]));
  } else {
    getPersonById(parseInt(personId));
  }
});

const awardsData = reactive([
  {
    name: "获奖1",
  },
  {
    name: "获奖2",
  },
  {
    name: "获奖3",
  },
  {
    name: "获奖4",
  },
]);
</script>

<style scoped lang="scss">
.person {
  background-color: $base-color-grey-light;

  .main {
    padding: 110px 14% 0 14%;
    min-height: calc(100vh - 110px);
    display: flex;
    justify-content: center;

    .container {
      padding-top: 35px;
      min-height: calc(100vh - 110px);
      background-color: $base-color-white;

      .el-divider {
        .part-name {
          font-size: 18px;
          font-weight: bold;
          color: $base-color-red;
        }
      }

      .person-info {
        padding: 10px 45px;

        .person-name {
          .name {
            font-size: 24px;
            font-weight: bold;
          }
        }

        .person-details {
          display: flex;
          justify-content: left;
          margin-top: 30px;

          .left-column {
            height: 34vh;
            img {
              height: 100%;
            }
          }

          .center-column {
            padding: 0 22px;
            .sub-title {
              font-weight: bold;
              color: $base-color-grey;
            }
            p {
              margin-bottom: 18px;
            }
            .imdb-url {
              color: $base-color-black;
            }
          }
        }
      }

      .person-introduction {
        .introduction {
          padding: 10px 45px;
          p {
            margin-bottom: 18px;
            line-height: 1.5;
          }
        }
      }

      .related-image {
        height: 35vh;
        .image {
          padding: 10px 45px;
          height: calc(100% - 65px);

          img {
            height: 100%;
            margin-right: 20px;
          }
        }
      }
      .awards {
        .awards-list {
          padding: 10px 45px;
          p {
            margin-bottom: 18px;
            line-height: 1.5;
          }
        }
      }
    }
  }
}
</style>
