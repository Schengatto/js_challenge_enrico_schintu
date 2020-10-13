import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import ShowcaseWrapper from "@/views/pages/ShowcaseWrapper.vue";
import Home from "@/views/Home.vue";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: { name: "showcase" },
    children: [
      {
        path: "/showcase",
        name: "showcase",
        component: ShowcaseWrapper
      }
    ]
  },
  {
    path: "*",
    redirect: { name: "Home" }
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
