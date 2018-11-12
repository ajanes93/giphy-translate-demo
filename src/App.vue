<template>
  <v-app>
    <v-content>
      <v-toolbar dark color="secondary" flat app>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
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
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import GiphyContainer from "./components/GiphyContainer.vue";
import PusherMixin from "./mixins/pusher.js";

export default {
  name: "App",
  mixins: [PusherMixin],
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
    ...mapActions("app", [
      "translate",
      "clearResponses",
      "resetApp",
      "removeResponse"
    ]),
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
    vm.unsubscribeFromChannel(vm.pusherChannel);
    vm.resetApp();
  }
};
</script>
