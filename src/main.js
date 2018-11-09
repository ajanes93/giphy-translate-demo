// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuetify from "vuetify";
import Pusher from "pusher-js";
import store from "./store";
import "vuetify/dist/vuetify.min.css";

const pusher = new Pusher("1cb8378cb0b45470e0ec", {
  cluster: "eu",
  forceTLS: true
});

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

Object.defineProperties(Vue.prototype, {
  $pusher: { value: pusher }
});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  store,
  render: h => h(App)
}).$mount("#app");
