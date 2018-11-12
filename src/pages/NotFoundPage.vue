<template>
  <v-content>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs12 sm8 md4 class="text-xs-center">
          <div>
            <v-flex xs12>
              <img width="256px" :src="logo" class="logo" />
            </v-flex>
            <v-flex xs12 mt-4>
              <span class="headline">Page not found.</span>
            </v-flex>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content>
</template>

<script>
export default {
  name: "NotFoundPage",
  props: {
    logo: {
      type: [String, Function],
      default: () => require("@/assets/logo.png")
    }
  }
};
</script>
