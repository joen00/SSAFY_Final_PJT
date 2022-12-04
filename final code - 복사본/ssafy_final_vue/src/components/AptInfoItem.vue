<template>
  <div>
  <div class="card-section" v-if="aptList">
    <button v-if="aptList.currPage != aptList.startPage" @click="getBeforePage">
      <v-icon style="font-size: 40px; color: RGB(229, 115, 115)"
        >fa-solid fa-angles-left</v-icon
      >
    </button>
    <v-card
      v-for="(item, index) in aptList.boardList"
      :key="index"
      class="mx-auto"
      max-width="300"
      min-width="300"
      elevation="17"
    >
      <v-list-item two-line>
        <v-list-item-content>
          <v-list-item-title class="text-h5">
            {{ item.apartmentName }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ item.dongName }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>fa-soild fa-stairs</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle> {{ item.floor }}층</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>fa-solid fa-arrow-up-from-ground-water</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ item.area }}㎡</v-list-item-subtitle>
      </v-list-item>

      <v-list-item>
        <v-list-item-icon>
          <v-icon>fa-solid fa-sack-dollar</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>{{ item.dealAmount }}만원</v-list-item-subtitle>
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>fa-regular fa-calendar-days</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle
          >{{ item.dealYear }}년 {{ item.dealMonth }}월</v-list-item-subtitle
        >
      </v-list-item>
      <v-list-item>
        <v-list-item-icon>
          <v-icon>fa-solid fa-location-dot</v-icon>
        </v-list-item-icon>
        <v-list-item-subtitle>126.12312341</v-list-item-subtitle>
      </v-list-item>

      <v-divider></v-divider>

      <v-card-actions>
        <div class="text-center">
          <v-btn
            class="abtn"
            color="red lighten-2"
            dark
            @click="clickDetail(item.no)"
          >
            Show
          </v-btn>
        </div>
      </v-card-actions>
    </v-card>

    <button v-if="aptList.currPage != aptList.endPage" @click="getNextPage">
      <v-icon style="font-size: 40px; color: RGB(229, 115, 115)"
        >fa-duotone fa-angles-right</v-icon
      >
    </button>
  </div>
  <div v-else>
    <v-img
          src="@/assets/nothing.png"
          width="1000"
          style="margin: 0 auto"
        ></v-img>
  </div>
</div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AptInfoItem",
  data() {
    return { dialog: false, detailInfo: [], idx: "" };
  },
  computed: {
    ...mapState(["aptList", "isShow", "aptDetailInfo"]),
  },
  methods: {
    ...mapActions(["searchNextPage", "searchBeforePage", "getAptDetailInfo"]),
    getNextPage() {
      this.searchNextPage();
    },
    getBeforePage() {
      this.searchBeforePage();
    },
    clickDetail(no) {
      if (this.aptDetailInfo) {
        if (this.aptDetailInfo.no != no) {
          this.$store.commit("CLEAR_APT_DETAIL");
          this.getAptDetailInfo(no);
        } else {
          this.$store.commit("TOGGLE_IS_SHOW", !this.isShow);
        }
      } else {
        this.getAptDetailInfo(no);
      }
    },
  },
};
</script>
<style scope>
.card-section {
  display: flex;
}
.v-icon {
  font-size: 40px;
}
.v-list-item__icon {
  text-align: center;
  margin-left: 10px;
}
.v-card {
  border-radius: 15px;
}
</style>
