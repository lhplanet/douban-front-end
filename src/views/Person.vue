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
                <span
                  v-for="(occupation, index) in personData.occupation"
                  :key="index"
                >
                  {{ occupation }}
                  <span v-if="index !== personData.occupation.length - 1">
                    /
                  </span>
                </span>
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
        <div v-if="personData.introduction !== ''" class="person-introduction">
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
        <div class="related-video-image">
          <el-divider content-position="left">
            <p class="part-name">影人图片</p>
          </el-divider>
          <div class="video-image">
            <img
              v-for="(image, index) in personData.images"
              :key="index"
              :src="image"
              alt="Movie Pictures"
              class="video-image-item"
              style="width: 210px; height: 250px;"
            />
          </div>
        </div>

        <!-- 获奖情况 -->
        <div class="awards">
          <el-divider content-position="left">
            <p class="part-name">获奖情况</p>
          </el-divider>
          <div class="awards-list">
            <p v-for="(award, index) in personData.awards" :key="index">
              <!-- {{ award[0] }} -->
              <span class="awards-name">{{ award.year }}</span>
              <br />
              <span v-for="(awardItem, index) in award.awardList" :key="index">
                <!-- <span class="sub-awards-name">{{ index }}</span> -->
                <!-- <span v-if="awardItem !== ''" class="sub-awards-name">：</span> -->
                <span v-if="awardItem !== ''">{{ awardItem }}</span>
                <span v-if="index !== award.length - 1"><br /></span>
              </span>
            </p>
          </div>
        </div>

        <!-- 最近的5部作品 -->
        <div class="last-five-works">
          <el-divider content-position="left">
            <p class="part-name">最近的5部作品</p>
          </el-divider>
          <div class="last-list">
            <div v-for="(movie, index) in recentMovieData" :key="index" class="last-list-box">
              <img
                :key="index"
                :src="movie.poster"
                alt="Movie Poster"
                class="last-list-item-poster"
              />
              <p class="last-list-item-name">{{ movie.name }}</p>
              <!-- {{ award.name }} -->
            </div>
          </div>
        </div>

        <!-- 最受好评的5部作品 -->
        <div class="last-five-works">
          <el-divider content-position="left">
            <p class="part-name">最受好评的作品</p>
          </el-divider>
          <div class="last-list">
            <div v-for="(movie, index) in bestMovieData" :key="index" class="last-list-box">
              <img
                :key="index"
                :src="movie.poster"
                alt="Movie Poster"
                class="last-list-item-poster"
              />
              <p class="last-list-item-name">{{ movie.name }}</p>
              <!-- {{ award.name }} -->
            </div>
          </div>
        </div>

        <!-- 合作2次以上的影人 
        <div class="collaborate-more-than-twice">
          <el-divider content-position="left">
            <p class="part-name">合作2次以上的影人</p>
          </el-divider>
          <div class="awards-list">
            <p v-for="(award, index) in awardsData" :key="index">
              {{ award.name }}
            </p>
          </div> 
        </div>-->
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

const recentMovieData = ref([]);

const bestMovieData = ref([]);

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

const getRecentMovieByPersonId = (id: string) => {
  personAPI
    .getRecentMovieByPersonId(id)
    .then((response) => {
      console.log("获取最近电影数据成功", response);
      recentMovieData.value = response.data;
      // imdbUrl = personData.value.imdb;
      // imdb.imdbName = imdbUrl.substring(imdbUrl.length - 9, imdbUrl.length);
      // imdb.imdbUrl = imdbUrl;
      console.log(recentMovieData.value);
    })
    .catch((error) => {
      console.error("获取最近电影数据失败", error);
      ElMessage.error("获取最近电影数据失败，请重试！");
    });
};

const getBestMovieByPersonId = (id: string) => {
  personAPI
    .getBestMovieByPersonId(id)
    .then((response) => {
      console.log("获取最近电影数据成功", response);
      bestMovieData.value = response.data;
      // imdbUrl = personData.value.imdb;
      // imdb.imdbName = imdbUrl.substring(imdbUrl.length - 9, imdbUrl.length);
      // imdb.imdbUrl = imdbUrl;
      console.log(bestMovieData.value);
    })
    .catch((error) => {
      console.error("获取最近电影数据失败", error);
      ElMessage.error("获取最近电影数据失败，请重试！");
    });
};


onMounted(() => {
  if (Array.isArray(personId)) {
    getPersonById(parseInt(personId[0]));
    getRecentMovieByPersonId(personId[0]);
    getBestMovieByPersonId(personId[0]);
  } else {
    getPersonById(parseInt(personId));
    getRecentMovieByPersonId(personId);
    getBestMovieByPersonId(personId);
  }
});

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

      /*.related-image {
        height: 35vh;
        .image {
          padding: 10px 45px;
          height: calc(100% - 65px);

          img {
            height: 100%;
            margin-right: 20px;
          }
        }
      }*/
      .awards {
        .awards-list {
          padding: 10px 45px;

          p {
            margin-bottom: 18px;
            line-height: 1.5;
            .awards-name {
              font-weight: bold;
              color: $base-color-red-light;
            }
            .sub-awards-name {
              font-weight: bold;
              color: $base-color-grey;
            }
          }
        }
      }
      .related-video-image {
        .video-image {
          padding: 10px 45px;
          height: calc(100% - 65px);
          display: flex;
          // 允许内容换行
          flex-wrap: wrap;
          // 左对齐
          justify-content: flex-start;

          img {
            height: 100%;
            margin-right: 20px;
            margin-bottom: 20px;
          }
        }
      }
      .last-five-works {
        .last-list {
          padding: 10px 45px;
          display: flex;
          // 允许内容换行
          flex-wrap: wrap;
          // 左对齐
          justify-content: flex-start;

          // border: 1px solid red;


          .last-list-box {
            margin-right: 20px;
            margin-bottom: 20px;
            height: 30vh;
            // overflow: hidden;
            // border: 1px solid red;
            width: 9vw;
            .last-list-item-poster {
              height: 90%;
              // border: 1px solid red;
            }
            .last-list-item-name {
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              margin-top: 10px;
              // overflow: hidden;
              // border: 1px solid red;
            }
          }
        }
      }
    }
  }
}
</style>
