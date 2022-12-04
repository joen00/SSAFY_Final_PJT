<template>
  <apt-info-item></apt-info-item>
</template>
<script>
import AptInfoItem from "@/components/AptInfoItem.vue";
export default {
  name: "AptInfoList",
  components: {
    AptInfoItem,
  },
  data() {
    return {};
  },
  created() {
    console.log("새로고침 맨~");
    //싹 다 초기화
    this.$store.commit("CLEAR_APT");
  },
};
</script>
<style>
.card-section {
  display: flex;
}
</style>
