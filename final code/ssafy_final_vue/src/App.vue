<template>
  <index-view></index-view>
</template>

<script>
import IndexView from "./views/IndexView.vue";
export default {
  name: "App",
  components: {
    IndexView,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
@font-face {
  font-family: "LINESeedKR-Bd";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2")
    format("woff2");
  font-weight: 700;
  font-style: normal;
}
.container {
  max-width: 1500px;
}
</style>
