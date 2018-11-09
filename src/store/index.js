import Vue from "vue";
import Vuex from "vuex";

import app from "./modules/app/index";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

const modules = {
  app
};

const store = new Vuex.Store({
  modules,
  strict: debug
});

export default store;
