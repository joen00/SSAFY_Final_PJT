<template>
  <v-container>
    <div class="main-header-section">
      <div class="section1">
        <img src="@/assets/like1.png" width="100px" />
        <span> </span>
        <span class="main-header-title"> &nbsp; 관심 매물을 살펴보세요</span>
      </div>
      <div class="section1">
        <span class="main-header-title2">{{ userInfo.userName }}님의 관심 매물 목록입니다.</span>
      </div>
    </div>
    <!-- 관심 매물 보여주는 곳 -->
    <div class="likeMain" v-if="likeAptDetailList">
      <!-- 1번줄 -->
      <div class="card-section" v-for="i in list()" :key="i">
        <v-card
          class="mx-auto"
          max-width="350"
          min-width="350"
          min-height="400"
          elevation="17"
          style="text-align: center; padding-top: 2.5rem; border-radius: 1rem"
          round
          v-for="j in Math.min(likeAptDetailList.length - i, 3)"
          :key="j"
        >
          <v-btn icon class="deleteLike" @click="deleteLike(likeAptDetailList[i + j - 1].no)">
            <v-icon>fa-solid fa-trash-can</v-icon>
          </v-btn>
          <h2>
            {{ likeAptDetailList[i + j - 1].apartmentName }}
          </h2>
          <br />
          <table style="margin: 0 auto">
            <tr>
              <td>
                <v-chip :color="`red lighten-4`" label class="info-item"
                  ><strong>검색주소</strong></v-chip
                >
              </td>
              <td>
                &nbsp;
                <strong>
                  {{ likeAptDetailList[i + j - 1].dongName }}
                  {{ likeAptDetailList[i + j - 1].roadName }}
                  {{ likeAptDetailList[i + j - 1].jibun }}</strong
                >
              </td>
            </tr>
            <tr>
              <td>
                <v-chip :color="`red lighten-4`" label class="info-item"
                  ><strong>거래 날짜</strong></v-chip
                >
              </td>
              <td>
                &nbsp;
                <strong
                  >{{ likeAptDetailList[i + j - 1].dealYear }}년
                  {{ likeAptDetailList[i + j - 1].dealMonth }}월</strong
                >
              </td>
            </tr>
            <tr>
              <td>
                <v-chip :color="`red lighten-4`" label class="info-item"
                  ><strong>건축 년도</strong></v-chip
                >
              </td>
              <td>
                &nbsp;
                <strong>{{ likeAptDetailList[i + j - 1].buildYear }}년</strong>
              </td>
            </tr>
            <tr>
              <td>
                <v-chip :color="`red lighten-4`" label class="info-item">
                  <strong>층</strong></v-chip
                >
              </td>
              <td>
                &nbsp;
                <strong>{{ likeAptDetailList[i + j - 1].floor }}층</strong>
              </td>
            </tr>
            <tr>
              <td>
                <v-chip :color="`red lighten-4`" label class="info-item">
                  <strong>거래 금액</strong></v-chip
                >
              </td>
              <td>
                &nbsp;
                <strong>{{ likeAptDetailList[i + j - 1].dealAmount }}만원</strong>
              </td>
            </tr>
            <tr>
              <td>
                <v-chip :color="`red lighten-4`" label class="info-item">
                  <strong>면적</strong></v-chip
                >
              </td>
              <td>
                &nbsp;
                <strong>{{ likeAptDetailList[i + j - 1].area }}㎡</strong>
              </td>
            </tr>
          </table>
        </v-card>
      </div>
      <!-- 2번줄 -->
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "RecommendView",
  data() {
    return {
      list: function () {
        var list = [];
        for (var i = 0; i < this.likeList.length; i += 3) list.push(i);
        return list;
      },
    };
  },
  computed: {
    ...mapState(["likeList", "likeAptDetailList", "userInfo"]),
  },

  created() {
    this.getLikeAptDetailInfo();
    console.log("하이");
  },
  methods: {
    ...mapActions(["getLikeAptDetailInfo", "unlike"]),
    async deleteLike(houseCode) {
      let deleteNo = null;
      this.likeList.forEach((like) => {
        if (like.houseCode == houseCode) {
          deleteNo = like.no;
        }
      });
      if (deleteNo) {
        console.log(deleteNo);
        await this.unlike(deleteNo);

        this.$store.commit("POP", {
          msg: "관심 매물에서 삭제되었습니다.",
          color: "dark",
        });

        this.getLikeAptDetailInfo();
      }
    },
  },
};
</script>

<style>
.card-section {
  margin-top: 5rem;
}
.likeMain {
  padding-left: 15rem;
  padding-right: 15rem;
}
.deleteLike {
  position: absolute;
  right: 20px;
  top: 35px;
}
</style>
