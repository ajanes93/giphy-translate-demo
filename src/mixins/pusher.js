import _ from "underscore";

export default {
  data() {
    return {
      pusherSubscriptions: []
    };
  },
  methods: {
    subscribeToPusherChannel(channel) {
      const vm = this;

      if (vm.$pusher && !_.contains(vm.pusherSubscriptions, channel)) {
        vm.$pusher.subscribe(channel);
        vm.pusherSubscriptions.push(channel);
      }
    },
    unsubscribeFromPusherChannel(channel) {
      const vm = this;

      if (vm.$pusher && _.contains(vm.pusherSubscriptions, channel)) {
        const subscription = vm.$pusher.channel(channel);

        subscription.unsubscribe(channel);
        subscription && subscription.unbind();

        vm.pusherSubscriptions.splice(
          _.indexOf(vm.pusherSubscriptions, channel),
          1
        );
      }
    },
    bindEventToPusherChannel(channel, event, callback) {
      const vm = this;

      if (vm.$pusher && _.contains(vm.pusherSubscriptions, channel)) {
        const cb = data => callback(data);
        vm.$pusher.channel(channel).bind(event, cb);
      }
    },
    unbindEventFromPusherChannel(channel, event, callback = false) {
      const vm = this;

      if (vm.$pusher && _.contains(vm.pusherSubscriptions, channel)) {
        const cb = callback ? data => callback(data) : callback;
        vm.$pusher.channel(channel).unbind(event, cb);
      }
    }
  }
};
