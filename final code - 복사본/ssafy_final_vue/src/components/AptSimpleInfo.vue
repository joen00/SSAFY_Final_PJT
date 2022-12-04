<template>
  <div class="abc">
    <v-container v-if="house">
      <v-row>
        <v-col cols="12" sm="12">
          <v-sheet min-height="10vh" rounded="lg">
            {{ house.name }}
          </v-sheet>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "AptSimpleInfo",
  computed: {
    ...mapState(["house"]),
    // house() {
    //   return this.$store.state.house;
    // },
  },
  created() {
    console.log("create");
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
<style scoped>
/* .v-sheet{

        height: 100px;
        transition: 0.5s;
        transition-duration: 0.5s;
    }
    .v-sheet:hover {
        height: 200px;
    } */
</style>
