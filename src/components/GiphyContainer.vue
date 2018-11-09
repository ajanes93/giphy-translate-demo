<template>
  <v-container grid-list-sm fluid pa-0>
    <v-layout row wrap v-if="images && images.length > 0">
      <v-flex v-for="image in images" :key="image.uuid" xs12 sm6 md4 lg3 d-flex>
        <v-hover>
          <v-card slot-scope="{ hover }">
            <v-img
              contain
              lazy-src="//media.giphy.com/media/xUPGcKg2zgJoS4TBWo/giphy.gif"
              :src="getImage(image).url"
              :max-height="getImage(image).height"
              :max-width:="getImage(image).width"
              class="grey darken-4"
            >
            </v-img>
            <v-expand-transition>
              <div
                @click="$emit('remove', image.uuid);"
                v-if="hover"
                class="d-flex transition-fast-in-fast-out error darken-2 v-card--reveal white--text"
                style="height: 100%;"
              >
                <v-icon color="white">close</v-icon>
              </div>
            </v-expand-transition>
            <v-card-title
              v-if="image.data && Object.keys(image.data).length > 0"
            >
              <v-flex xs12 pa-0>
                From: {{ image.data.sender.replace(/^.{6}/g, "******") }}
              </v-flex>
              <v-flex xs12 pa-0> Message: {{ image.data.content }} </v-flex>
            </v-card-title>
          </v-card>
        </v-hover>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style>
.v-card--reveal {
  cursor: pointer;
  align-items: center;
  bottom: 0;
  justify-content: center;
  opacity: 0.7;
  position: absolute;
  text-align: center;
  width: 100%;
}
</style>

<script>
export default {
  name: "GiphyContainer",
  props: {
    size: {
      type: String,
      default: "downsized_medium"
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    getImage() {
      const vm = this;
      return image => image[vm.size];
    }
  }
};
</script>
