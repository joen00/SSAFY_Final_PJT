<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="12">
        <div class="select_section" min-height="10vh" rounded="lg">
          <v-select
            class="select"
            label="시도"
            :items="sidoList"
            dense
            solo
            placeholder="select"
            v-model="sido"
            @change="sidoChange()"
          >
            <option v-for="sido in sidoList" :key="sido" :value="sido">
              {{ sido }}
            </option>
          </v-select>
          <v-select
            class="select"
            label="구군"
            :items="gugunList"
            dense
            solo
            placeholder="select"
            v-model="gugun"
            @change="gugunChange()"
          >
            <option v-for="gugun in gugunList" :key="gugun" :value="gugun">
              {{ gugun }}
            </option>
          </v-select>
          <v-select
            class="select"
            label="법정동"
            :items="dongList"
            dense
            solo
            placeholder="select"
            v-model="dong"
            @change="dongChange()"
          >
            <option v-for="dong in dongList" :key="dong" :value="dong">
              {{ dong }}
            </option>
          </v-select>
          <v-select
            class="select"
            label="년"
            :items="yearList"
            dense
            solo
            placeholder="select"
            v-model="year"
            @change="yearChange()"
          >
            <option v-for="year in yearList" :key="year" :value="year">
              {{ gugun }}
            </option>
          </v-select>
          <v-select
            class="select"
            label="월"
            :items="monthList"
            dense
            solo
            placeholder="select"
            v-model="month"
            @change="monthChange()"
          >
            <option v-for="month in monthList" :key="month" :value="month">
              {{ month }}
            </option>
          </v-select>
          <v-btn class="search-btn" color="#FFFFFF" elevation="2" @click="search()"
            ><strong>검색</strong></v-btn
          >
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";

export default {
  name: "SelectCondition",
  data() {
    return {
      sido: "",
      gugun: "",
      dong: "",
      year: "",
      yearList: [],
      month: "",
      monthList: [],
      dongCode: "",
    };
  },
  created() {
    this.searchSidoList();
    this.CLEAR_NEWS_INFO();
  },
  computed: {
    ...mapState(["sidoList", "gugunList", "dongList"]),
  },
  methods: {
    ...mapMutations([
      "SET_SIDOLIST",
      "SET_GUGUNLIST",
      "SET_DONGLIST",
      "CLEAR_APT",
      "CLEAR_APT_DETAIL",
      "CLEAR_NEWS_INFO",
    ]),
    sidoChange() {
      //선택된 시도를 state에 저장
      this.searchSido(this.sido);

      //action
      this.searchGugunList(this.sido);
    },
    gugunChange() {
      //선택된 구군을 state에 저장
      this.searchGugun(this.gugun);

      //action
      this.searchDongList({
        sido: this.sido,
        gugun: this.gugun,
      });
    },
    dongChange() {
      for (let i = 2022; i >= 2000; i--) {
        this.yearList.push(i);
      }
      this.searchDong(this.dong);
      this.searchDongcode({
        dong: this.dong,
        sido: this.sido,
      });
    },
    yearChange() {
      for (let i = 1; i <= 12; i++) {
        this.monthList.push(i);
      }
      // this.searchYear(this.year);
    },
    monthChange() {
      // this.searchYear(this.year);
      // this.searchMonth(this.month);
    },
    search() {
      this.searchYear(this.year);
      this.searchMonth(this.month);

      this.searchDongcode({
        dong: this.dong,
        sido: this.sido,
      });
      this.searchApt();

      //News 가져와
      this.searchNews(this.dong);
    },
    ...mapActions([
      "searchSidoList",
      "searchGugunList",
      "searchDongList",
      "searchApt",
      "searchSido",
      "searchGugun",
      "searchDong",
      "searchYear",
      "searchMonth",
      "searchDongcode",
      "searchApt",
      "searchNews",
    ]),
  },
};
</script>

<style scoped>
.select_section {
  display: flex;
  margin: 20px 100px;
}
.select {
  margin: 0px 20px;
  width: 300px;
}
.search_btn {
  width: 200px;
  margin-top: 10px;
  background: none;
}
.search-btn {
  background: none;
  width: 200px;
}
</style>
