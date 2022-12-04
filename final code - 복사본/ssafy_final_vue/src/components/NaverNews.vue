<template>
  <div>
    <v-timeline align-top :reverse="false" dense>
      <v-timeline-item
        v-for="(news, i) in newsInfo"
        :key="i"
        :color="news.attr.color"
        :icon="news.attr.icon"
        fill-dot
      >
        <v-card :color="news.attr.color" dark>
          <v-card-title
            class="text-h8 new-title"
            v-html="news.title"
            style="margin: 10px"
            @click="moveLink(news.link)"
          >
          </v-card-title>
          <v-card-text class="white text--primary news-text">
            <br />
            <p v-html="news.description"></p>
          </v-card-text>
        </v-card>
      </v-timeline-item>
    </v-timeline>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  data: () => ({
    items: [
      {
        color: "red lighten-2",
        icon: "mdi-star",
      },
      {
        color: "green lighten-1",
        icon: "mdi-airballoon",
      },
      {
        color: "indigo",
        icon: "mdi-buffer",
      },
    ],
  }),
  computed: {
    ...mapState(["newsInfo"]),
  },
  methods: {
    moveLink(link) {
      window.open(link);
    },
  },
};
</script>

<style>
.v-timeline {
  padding-right: 90px;
}
/* .news-text{
  overflow: hidden;
} */
.new-title:hover {
  text-decoration: underline;
}
</style>
