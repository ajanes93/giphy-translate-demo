import Vue from "vue";
import PusherMixin from "./pusher";
import Pusher from "pusher-js";

export default {
  install(Vue, options = {}) {
    options = { ...{ forceTLS: true, cluster: "eu" }, ...options };

    const pusher = new Pusher(options.pusherKey, {
      cluster: options.cluster,
      forceTLS: options.forceTLS
    });

    Vue.mixin(PusherMixin);

    Object.defineProperties(Vue.prototype, {
      $pusher: { value: pusher }
    });
  }
};
