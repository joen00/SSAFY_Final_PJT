<template>
  <v-container>
    <div class="main-header-section">
      <div class="section1">
        <img src="@/assets/detailsmallhouse.png" width="100px" />
        <span class="main-header-title">전국구 아파트 정보</span>
      </div>
      <div class="section1">
        <span class="main-header-title2">시군구를 선택하고 아파트 상세 정보를 확인하세요</span>
      </div>
    </div>
    <select-condition></select-condition>
    <apt-info-list></apt-info-list>
    <apt-info-detail v-if="aptDetailInfo"></apt-info-detail>
    <div class="main_section">
      <div class="map_section" min-height="10vh" v-if="aptList">
        <kakao-map></kakao-map>
      </div>
      <div class="new_section" v-if="aptList">
        <naver-news></naver-news>
      </div>
    </div>
    <router-view />
  </v-container>
</template>

<script>
import SelectCondition from "@/components/SelectCondition.vue";
import AptInfoList from "@/components/AptInfoList.vue";
import KakaoMap from "./KakaoMap.vue";
import AptInfoDetail from "@/components/AptInfoDetail.vue";
import NaverNews from "@/components/NaverNews.vue";

import { mapState } from "vuex";

export default {
  name: "App",
  components: {
    SelectCondition,
    AptInfoList,
    KakaoMap,
    AptInfoDetail,
    NaverNews,
  },
  computed: {
    ...mapState(["aptList", "aptDetailInfo", "newsInfo"]),
  },
  data: () => ({
    //
  }),
};
</script>
<style>
.section1 {
  display: flex;
}
.main-header-section {
  margin-top: 50px;
  margin-left: 120px;
  margin-bottom: 50px;
}
.main-header-title {
  font-size: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;
}
.main-header-title2 {
  margin-left: 10px;
  font-size: 25px;
  font-weight: bold;
}
.main_section {
  display: flex;
  max-height: 60vh;
  margin-top: 100px;
  margin-bottom: 109px;
}
.map_section {
  width: 40%;
  float: left;
  background: none;
}
.new_section {
  /* background-color: black; */
  width: 60%;
  height: 60vh;
  float: left;
  padding-top: 40px;
}
</style>
