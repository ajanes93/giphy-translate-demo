import Vue from "vue";
import Router from "vue-router";

import HomePage from "@/pages/HomePage.vue";
import NotFoundPage from "@/pages/NotFoundPage.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      name: "home",
      path: "/",
      component: HomePage
    },
    {
      name: "not-found",
      path: "*",
      component: NotFoundPage
    }
  ]
});
