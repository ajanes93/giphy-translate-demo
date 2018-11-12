// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import Pusher from "@/plugins/pusher.js";
import store from "./store";
import "vuetify/dist/vuetify.min.css";

Vue.use(Vuetify, {
  theme: {
    primary: "#a90055",
    secondary: "#003473",
    accent: "#626d78",
    light: "#eeeeee",
    error: "#ed1c24",
    info: "#4b9bd4",
    success: "#7fa73d",
    warning: "#ffcb04"
  }
});

Vue.use(Pusher, { pusherKey: "1cb8378cb0b45470e0ec" });

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
