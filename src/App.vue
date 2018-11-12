<template>
  <v-app>
    <v-content>
      <v-toolbar dark color="secondary" flat app>
        <v-toolbar-title class="white--text">{{ title }}</v-toolbar-title>
      </v-toolbar>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "App",
  methods: mapActions("app", ["resetApp"]),
  computed: mapGetters("app", ["title"]),
  destroyed() {
    this.resetApp();
  }
};
</script>
