<template>
  <div class="movie">
    <!-- 展示 logo 和搜索栏 -->
    <Nav></Nav>

    <!-- 主体部分 -->
    <div class="main">
      <div class="container">
        <!-- 影片信息部分 -->
        <div class="movie-info">
          <div class="movie-title">
            <!-- 上部分：电影名和上映年份拼接的标题 -->
            <span class="name">{{ movieData.name }}</span
            ><span class="release-year">（{{ movieData.year }}）</span>
          </div>
          <div class="movie-details">
            <!-- 下部分：左中右三栏 -->
            <div class="left-column">
              <!-- 显示电影图片 -->
              <img :src="movieData.poster" alt="Movie Poster" />
            </div>
            <div class="center-column">
              <!-- 显示导演、编剧等信息 -->
              <p>
                <span class="sub-title">导演：</span>
                <!-- 遍历movieData.directors，如果是最后一个，则不加 /  -->
                <span
                  v-for="(director, index) in movieData.directors"
                  :key="index"
                >
                  {{ director }}
                  <span v-if="index !== movieData.directors.length - 1">
                    /
                  </span>
                </span>
              </p>
              <p>
                <span class="sub-title">编剧：</span>
                <!-- 遍历movieData.scriptWriters，如果是最后一个，则不加 /  -->
                <span
                  v-for="(scriptWriter, index) in movieData.scriptWriters"
                  :key="index"
                >
                  {{ scriptWriter }}
                  <span v-if="index !== movieData.scriptWriters.length - 1">
                    /
                  </span>
                </span>
              </p>
              <p class="actor">
                <!-- TODO: 这里改成显示不完则有“更多”按钮 -->
                <span class="sub-title">主演：</span>
                <span v-for="(actor, index) in movieData.actors" :key="index">
                  {{ actor }}
                  <span v-if="index !== movieData.actors.length - 1"> / </span>
                </span>
              </p>
              <p>
                <span class="sub-title">类型：</span>
                <span v-for="(type, index) in movieData.types" :key="index">
                  {{ type }}
                  <span v-if="index !== movieData.types.length - 1"> / </span>
                </span>
              </p>
              <p>
                <span class="sub-title">制片国家/地区：</span>
                <span
                  v-for="(country, index) in movieData.countries"
                  :key="index"
                >
                  {{ country }}
                  <span v-if="index !== movieData.countries.length - 1">
                    /
                  </span>
                </span>
              </p>
              <p>
                <span class="sub-title">语言：</span>
                <span>{{ movieData.language }}</span>
              </p>
              <p>
                <span class="sub-title">上映日期：</span>
                <span>{{ movieData.releaseDate }}</span>
              </p>
              <p>
                <span class="sub-title">片长：</span>
                <span>{{ movieData.duration }}</span>
              </p>
              <p class="aka">
                <span class="sub-title">又名：</span>
                <span>{{ movieData.alias }}</span>
              </p>
              <p>
                <span class="sub-title">IMDb：</span>
                <span>{{ movieData.imdb }}</span>
              </p>
            </div>
            <div class="right-column">
              <!-- 显示豆瓣评分 -->
              <p><span class="rating-title">豆瓣评分</span></p>
              <div class="rating-and-votes">
                <div class="rate-left">
                  <span class="rate-num">{{ movieData.rating }}</span>
                </div>
                <div class="rate-right">
                  <el-rate v-model="doubanRating" disabled class="rate-stars" />
                  <p class="votes-num">{{ movieData.votes }}人评价</p>
                </div>
              </div>
              <div class="rating-chart-box">
                <div id="rating-chart" style="width: 65%; height: 300px"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- 剧情简介 -->
        <div class="movie-introduction">
          <el-divider content-position="left">
            <p class="part-name">剧情简介</p>
          </el-divider>
          <div class="introduction">
            <p>
              {{ movieData.introduction }}
            </p>
          </div>
        </div>

        <!-- 演职员 -->
        <div class="director-actor">
          <el-divider content-position="left">
            <p class="part-name">演职员</p>
          </el-divider>
          <div class="slides-container">
            <Slide
              v-for="(person, index) in personData"
              :key="index"
              :person="person"
            />
          </div>
        </div>

        <!-- 相关视频图片 -->
        <div class="related-video-image">
          <el-divider content-position="left">
            <p class="part-name">相关视频图片</p>
          </el-divider>
          <div class="video-image">
            <img
              v-for="(image, index) in movieData.images"
              :key="index"
              :src="image"
              alt="Movie Pictures"
              class="video-image-item"
            />
          </div>
        </div>

        <!-- 获奖情况 -->
        <div class="awards">
          <el-divider content-position="left">
            <p class="part-name">获奖情况</p>
          </el-divider>
          <div class="awards-list">
            <p v-for="(award, index) in movieData.awards" :key="index">
              <!-- {{ award[0] }} -->
              <span class="awards-name">{{ index }}</span>
              <br />
              <span v-for="(awardItem, index) in award" :key="index">
                <span class="sub-awards-name">{{ index }}</span>
                <span v-if="awardItem !== ''" class="sub-awards-name">：</span>
                <span v-if="awardItem !== ''">{{ awardItem }}</span>
                <span v-if="index !== award.length - 1"><br /></span>
              </span>
            </p>
          </div>
        </div>

        <!-- 在哪看这部电影 -->
        <div class="play-sources">
          <el-divider content-position="left">
            <p class="part-name">在哪看这部电影</p>
          </el-divider>
          <div class="play-source">
            <p v-for="(source, index) in movieData.playSources" :key="index">
              <a :href="source" target="_blank" class="source-link">{{
                index
              }}</a>
            </p>
          </div>
        </div>

        <!-- 喜欢这部电影的人也喜欢 -->
        <div class="also-like-movies">
          <el-divider content-position="left">
            <p class="part-name">喜欢这部电影的人也喜欢</p>
          </el-divider>
          <div class="also-like">
            <div
              class="also-like-box"
              v-for="(image, index) in movieData.alsoLikes"
            >
              <img
                :key="index"
                :src="image"
                alt="Movie Poster"
                class="also-like-item-poster"
              />
              <p class="also-like-item-name">{{ index }}</p>
            </div>
          </div>
        </div>

        <!-- 评论 -->
        <div class="comments">
          <el-divider content-position="left">
            <p class="part-name">评论</p>
          </el-divider>
          <div class="comment-list">
            <p v-for="(comment, index) in movieData.comments" :key="index">
              <!-- {{ index }} -->
              <span class="commenter-info">{{ comment.commenter_info }}</span>
              <br />
              <span class="time-info">{{ comment.time_info }}</span>
              <!-- <span class="rating-info">{{ comment.rating_info }}</span> -->
              <p class="comment-text">{{ comment.comment_text }}</p>
              <br />
            </p>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Nav from "@/components/Nav/index.vue";
import Slide from "@/components/Slide/index2.vue";
import { watch, onMounted, ref } from "vue";
import movieAPI from "@/api/movie";
import personAPI from "@/api/person";
import { ElMessage } from "element-plus";
// 导入echarts
import { ECharts, EChartsOption, init } from "echarts";
import { useRoute } from "vue-router";

const $route = useRoute(); // 获取当前路由信息
// 获取路由参数
const movieId = $route.params.id;

const movieData = ref([]);
const doubanRating = ref(0);
const r5 = ref(0);
const r4 = ref(0);
const r3 = ref(0);
const r2 = ref(0);
const r1 = ref(0);

// 调用接口获取电影数据
const getMovieById = (id: number) => {
  movieAPI
    .getMovieById(id)
    .then((response) => {
      console.log("获取电影数据成功", response);
      movieData.value = response.data;
      doubanRating.value = response.data.rating / 2;
      r5.value = response.data.r5;
      r4.value = response.data.r4;
      r3.value = response.data.r3;
      r2.value = response.data.r2;
      r1.value = response.data.r1;
    })
    .catch((error) => {
      console.error("获取电影数据失败", error);
      ElMessage.error("获取电影数据失败，请重试！");
    });
};

// 调用接口获取演职员数据
const personData = ref([]);
const getPersonsByMovieId = (id: number) => {
  personAPI
    .getPersonsByMovieId(id)
    .then((response) => {
      console.log("获取人物数据成功", response);
      personData.value = response.data;
    })
    .catch((error) => {
      console.error("获取人物数据失败", error);
      ElMessage.error("获取人物数据失败，请重试！");
    });
};

onMounted(() => {
  if (Array.isArray(movieId)) {
    getMovieById(parseInt(movieId[0]));
    getPersonsByMovieId(parseInt(movieId[0]));
  } else {
    getMovieById(parseInt(movieId));
    getPersonsByMovieId(parseInt(movieId));
  }
});

// 监听r5,r4,r3,r2,r1的数值变化
watch([r5, r4, r3, r2, r1], () => {
  // 基于准备好的dom，初始化echarts实例
  const myChart: ECharts = init(
    document.getElementById("rating-chart") as HTMLDivElement
  );
  const option: EChartsOption = {
    yAxis: {
      type: "category",
      data: ["1星", "2星", "3星", "4星", "5星"],
    },
    xAxis: {
      type: "value",
      max: 100,
    },
    series: [
      {
        data: [r1.value, r2.value, r3.value, r4.value, r5.value],
        type: "bar",
        color: "#f7b92a",
        label: {
          // 展示具体柱状图的数值
          show: true,
        },
        // 上下左右边距
        // grid: {
        //   left: "-20%",
        //   right: "0%",
        //   bottom: "0%",
        //   top: "0%",
        //   containLabel: true,
        // },
      },
    ],
  };

  // 绘制图表
  myChart.setOption(option);
});
</script>

<style scoped lang="scss">
.movie {
  background-color: #f5f5f5;

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

      .movie-info {
        padding: 10px 45px;

        .movie-title {
          text-align: center;
          .name {
            font-size: 24px;
            font-weight: bold;
          }
          .release-year {
            font-size: 24px;
            font-weight: bold;
            color: $base-color-grey;
          }
        }

        .movie-details {
          display: flex;
          justify-content: space-between;
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
            .actor,
            .aka {
              // 行间距
              line-height: 1.2;
              // 设置演员部分最多显示两行
              display: -webkit-box;
              -webkit-box-orient: vertical;
              overflow: hidden;
              // 设置最多显示两行，超出部分显示省略号
              -webkit-line-clamp: 2;
            }
          }

          .right-column {
            width: 24vw;
            .rating-title {
              margin-left: 30px;
              font-size: 18px;
              font-weight: bold;
              color: $base-color-red;
            }
            .rating-and-votes {
              margin-left: 30px;
              margin-top: 20px;
              display: flex;
              justify-content: left;
              .rate-left {
                // 垂直居中
                display: flex;
                align-items: center;
                margin-right: 10px;
                .rate-num {
                  font-size: 38px;
                  font-weight: bold;
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
                }
              }
            }
          }
        }
      }

      .movie-introduction {
        .introduction {
          padding: 10px 45px;
          p {
            margin-bottom: 18px;
            line-height: 1.5;
          }
        }
      }

      .director-actor {
        width: 100%;
        .slides-container {
          padding: 10px 45px;
          display: flex;
          // 允许内容换行
          flex-wrap: wrap;
          // 左对齐
          justify-content: flex-start;
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

      .play-sources {
        .play-source {
          padding: 10px 45px;

          p {
            margin-bottom: 18px;
            line-height: 1.5;
            .source-link {
              font-weight: bold;
              color: $base-color-grey;
            }
          }
        }
      }

      .also-like-movies {
        .also-like {
          padding: 10px 45px;
          display: flex;
          // 允许内容换行
          flex-wrap: wrap;
          // 左对齐
          justify-content: flex-start;

          .also-like-box {
            margin-right: 20px;
            margin-bottom: 20px;
            height: 30vh;
            .also-like-item-poster {
              height: 90%;
            }
            .also-like-item-name {
              font-size: 16px;
              font-weight: bold;
              text-align: center;
              margin-top: 10px;
            }
          }
        }
      }
    }
  }
}

#app > div > div > div.main > div > div.comments {
  margin: 35px 40px;
}
.commenter-info{
  color: #ce7111;
  line-height: 27px;
  font-weight: 800;
}
.time-info{
    color: grey;
    font-size: 14px;
    line-height: 19px;
}
.comment-text{
  font-size: 15px;
  line-height: 18px;
}
</style>
