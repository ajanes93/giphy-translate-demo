import _ from "underscore";

export default {
  data() {
    return {
      pusherChannel: {},
      pusherSubscriptions: []
    };
  },
  methods: {
    subscribeToChannel(channel, events, callback) {
      let vm = this;

      if (vm.$pusher) {
        let existingSubscription = vm.$pusher.channel(channel);

        if (!existingSubscription) {
          vm.pusherChannel = vm.$pusher.subscribe(channel);
          vm.pusherSubscriptions.push(channel);
        } else {
          vm.pusherChannel = existingSubscription;
        }

        _.each(events, event => {
          vm.pusherChannel.bind(event, data => {
            callback(data);
          });
        });
      }
    },
    unsubscribeFromChannel(channel) {
      let vm = this;

      if (vm.$pusher) {
        if (channel) {
          vm.unsubscribe(channel);
          vm.pusherSubscriptions.splice(
            _.indexOf(vm.pusherSubscriptions, channel),
            1
          );
          return;
        }

        _.each(vm.pusherSubscriptions, (channel, i) => {
          vm.unsubscribe(channel);
        });

        vm.pusherSubscriptions = [];
      }
    },
    unsubscribe(channel) {
      let vm = this;

      vm.pusherChannel.unsubscribe(channel);
      vm.pusherChannel && vm.pusherChannel.unbind();
    }
  }
};
