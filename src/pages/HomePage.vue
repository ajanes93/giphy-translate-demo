<template>
  <v-container grid-list-lg fluid>
    <v-layout row wrap>
      <v-flex xs12 pb-0>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search..."
          :loading="loading"
          @click:append="() => handleTranslate()"
          @keyup.enter="() => handleTranslate()"
        ></v-text-field>
      </v-flex>
      <v-flex xs12 px-0 pt-0>
        <v-btn
          :loading="loading"
          v-if="search"
          color="primary"
          @click="() => handleTranslate()"
        >
          Search
          <v-icon right dark>search</v-icon>
        </v-btn>
        <v-btn v-if="images.length > 0" @click="clearResponses">
          Clear Results
          <v-icon right dark>fa-ban</v-icon>
        </v-btn>
      </v-flex>
      <v-flex xs12>
        <giphy-container
          size="original"
          :images="images"
          @remove="removeResponse"
        />
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GiphyContainer from "@/components/GiphyContainer.vue";

export default {
  name: "HomePage",
  data: () => ({
    loading: false,
    search: "",
    attempts: 0,
    maxAttempts: 10,
    pusherChannel: "giphy_search"
  }),
  components: {
    GiphyContainer
  },
  methods: {
    ...mapActions("app", ["translate", "clearResponses", "removeResponse"]),
    handleTranslate(search = "", data = {}) {
      const vm = this;
      const s = search ? search : vm.search;

      if (s.length === 0) {
        return;
      }

      vm.loading = true;
      vm.translate({ s, data }).then(
        dup => {
          if (dup && vm.attempts < vm.maxAttempts) {
            vm.attempts++;
            vm.handleTranslate(s);

            return;
          } else if (vm.attempts >= vm.maxAttempts) {
            console.log("No new GIPHY found");
          }

          vm.attempts = 0;
          vm.loading = false;
        },
        () => {
          vm.loading = false;
        }
      );
    }
  },
  computed: mapGetters("app", ["images", "responses", "title"]),
  created() {
    const vm = this;

    vm.subscribeToPusherChannel(vm.pusherChannel);
    vm.bindEventToPusherChannel(vm.pusherChannel, "sms_search", data => {
      vm.handleTranslate(data.content, data);
    });
  },
  destroyed() {
    const vm = this;
    vm.unsubscribeFromPusherChannel(vm.pusherChannel);
  }
};
</script>
