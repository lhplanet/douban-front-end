// 对外暴露配置的路由
// 常量路由
export const constantRoutes = [
  {
    // 首页路由
    path: "/",
    component: () => import("@/views/Home.vue"),
    name: "home",
  },
  //   {
  //     // 搜索路由
  //     path: "/search",
  //     component: () => import("@/views/Search.vue"),
  //     name: "search",
  //   },
  {
    // 搜索路由，接受动态参数 :keyword
    path: "/search/:keyword",
    component: () => import("@/views/Search.vue"),
    name: "searchResult",
  },
  {
    // 排行榜路由
    path: "/top",
    component: () => import("@/views/Top.vue"),
    name: "top",
  },
  //   {
  //     // 电影路由
  //     path: "/movie",
  //     component: () => import("@/views/Movie.vue"),
  //     name: "movie",
  //   },
  {
    // 电影详情页路由，接受动态参数 :id
    path: "/movie/:id",
    component: () => import("@/views/Movie.vue"),
    name: "movieDetail",
  },
  //   {
  //     // 人物路由
  //     path: "/person",
  //     component: () => import("@/views/Person.vue"),
  //     name: "person",
  //   },
  {
    // 电影详情页路由，接受动态参数 :id
    path: "/person/:id",
    component: () => import("@/views/Person.vue"),
    name: "personDetail",
  },
  {
    // 404路由
    path: "/404",
    component: () => import("@/views/404.vue"),
    name: "404",
  },
  {
    // 重定向路由
    path: "/:pathMatch(.*)*",
    redirect: "/404",
    name: "any",
  },
];
