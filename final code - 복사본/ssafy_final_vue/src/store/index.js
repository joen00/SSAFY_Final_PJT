import Vue from "vue";
import Vuex from "vuex";
import http from "@/util/http-common";
import jwtDecode from "jwt-decode";
import { login, findById, tokenRegeneration, logout } from "@/api/member";
import { like, unlike } from "@/api/house";
import { news } from "@/api/news";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState({
      // 브라우저 종료시 제거하기 위해 localStorage가 아닌 sessionStorage로 변경. (default: localStorage)
      storage: sessionStorage,
    }),
  ],
  state: {
    sidoList: [],
    gugunList: [],
    dongList: [],
    house: null,
    sido: "",
    gugun: "",
    dong: "",
    dongCode: "",
    year: "",
    month: "",
    aptList: null,
    aptDetailInfo: null,
    isShow: false,
    StationApt: null,
    AnimalApt: null,
    isLogin: false,
    isLoginError: false,
    userInfo: null,
    likeList: [],
    isValidToken: false,
    sb: {
      act: false,
      msg: "",
      color: "error",
    },
    likeAptDetailList: [],
    newsInfo: null,
  },
  getters: {},
  mutations: {
    SET_SIMPLE_HOUSE(state, house) {
      state.house = house;
    },
    SET_SIDO(state, sido) {
      state.sido = sido;
    },
    SET_SIDOLIST(state, sidoList) {
      state.sidoList = sidoList;
    },

    SET_GUGUN(state, gugun) {
      state.gugun = gugun;
    },
    SET_GUGUNLIST(state, gugunList) {
      state.gugunList = gugunList;
    },
    SET_DONG(state, dong) {
      state.dong = dong;
    },
    SET_DONGLIST(state, dongList) {
      state.dongList = dongList;
    },
    SET_YEAR(state, year) {
      state.year = year;
    },
    SET_MONTH(state, month) {
      state.month = month;
    },
    SET_DONGCODE(state, dongCode) {
      state.dongCode = dongCode;
    },
    SET_APT(state, aptList) {
      state.aptList = aptList;
    },
    SET_APT_DETAIL(state, aptDetailInfo) {
      state.aptDetailInfo = aptDetailInfo;
    },
    CLEAR_GUGUN(state) {
      state.gugunList = [];
    },
    CLEAR_DONG(state) {
      state.dongList = [];
    },
    CLEAR_APT(state) {
      state.aptList = null;
      state.aptDetailInfo = null;
    },
    CLEAR_APT_DETAIL(state) {
      state.aptDetailInfo = null;
    },

    STATION_APT(state, StationApt) {
      state.StationApt = StationApt;
    },
    ANIMAL_APT(state, AnimalApt) {
      state.AnimalApt = AnimalApt;
    },
    SET_LIKEDETAILLIST(state, likeAptDetailList) {
      //console.log(likeAptDetailList);
      state.likeAptDetailList = likeAptDetailList;
    },
    //user
    SET_IS_LOGIN: (state, isLogin) => {
      state.isLogin = isLogin;
    },
    SET_IS_LOGIN_ERROR: (state, isLoginError) => {
      state.isLoginError = isLoginError;
    },
    SET_IS_VALID_TOKEN: (state, isValidToken) => {
      state.isValidToken = isValidToken;
    },
    SET_USER_INFO: (state, userInfo) => {
      state.isLogin = true;
      state.userInfo = userInfo;
    },
    SET_LIKE_LIST: (state, likeList) => {
      state.likeList = likeList;
    },
    POP: (state, data) => {
      state.sb.msg = data.msg;
      state.sb.color = data.color;
      state.sb.act = false;
      if (data.act === undefined) state.sb.act = true;
    },
    TOGGLE_IS_SHOW: (state, isShow) => {
      state.isShow = isShow;
    },
    //News
    CLEAR_NEWS_INFO: (state) => {
      state.newsInfo = null;
    },
    SET_NEWS_INFO: (state, newsInfo) => {
      state.newsInfo = newsInfo;
    },
  },
  actions: {
    simpleHouse({ commit }, house) {
      commit("SET_SIMPLE_HOUSE", house);
    },
    searchSidoList({ commit }) {
      // 시도 리스트를 검색합니다.
      let sidoList = [];
      http.get("home/sidoName").then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          sidoList.push(data[i].sidoName);
        }
        commit("SET_SIDOLIST", sidoList);
      });
    },
    searchGugunList({ commit }, sido) {
      //시도에 따른 구군 리스트를 검색합니다.
      let gugunList = [];

      http.get(`home/gugunName?sidoName=${sido}`).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          gugunList.push(data[i].gugunName);
        }
        commit("SET_GUGUNLIST", gugunList);
      });
    },
    searchDongList({ commit }, payload) {
      //구군에 따른 동 리스트를 검새합니다.
      let dongList = [];
      http.get(`home/dongName?sidoName=${payload.sido}&gugunName=${payload.gugun}`).then(({ data }) => {
        for (let i = 0; i < data.length; i++) {
          dongList.push(data[i].dongName);
        }
        commit("SET_DONGLIST", dongList);
      });
    },
    searchSido({ commit }, sido) {
      commit("SET_SIDO", sido);
    },
    searchGugun({ commit }, gugun) {
      commit("SET_GUGUN", gugun);
    },
    searchDong({ commit }, dong) {
      commit("SET_DONG", dong);
    },
    searchYear({ commit }, year) {
      commit("SET_YEAR", year);
    },
    searchMonth({ commit }, month) {
      commit("SET_MONTH", month);
    },
    searchDongcode({ commit }, payload) {
      let dongCode;
      http.get(`home/dongCode?dongName=${payload.dong}&sidoName=${payload.sido}`).then(({ data }) => {
        console.log(data);
        dongCode = data;
        commit("SET_DONGCODE", dongCode);
      });
      console.log(dongCode);
    },
    searchApt({ commit }, page) {
      // 검색 조건에 따른 아파트 리스트

      //아파트 리스트 초기화
      commit("CLEAR_APT");

      if (!page) {
        page = 1;
      }
      console.log(this.state.dongCode);
      http
        .get(
          `home/list?dongCode=${this.state.dongCode}&dealYear=${this.state.year}&dealMonth=${this.state.month}&page=${page}`
        )
        .then(({ data }) => {
          console.log(data);
          console.log("길이 비교 " + data.boardList.length);
          if (data.boardList.length == 0) {
            data = null;
          }
          commit("SET_APT", data);
        });
    },
    searchBeforePage({ commit }) {
      //다음 페이지 목록 보여주기

      //aptDetail info 초기화
      commit("CLEAR_APT_DETAIL");

      let currPage = this.state.aptList.currPage;
      http
        .get(
          `home/list?dongCode=${this.state.dongCode}&dealYear=${this.state.year}&dealMonth=${this.state.month}&page=${currPage - 1
          }`
        )
        .then(({ data }) => {
          commit("SET_APT", data);
        });
    },
    searchNextPage({ commit }) {
      //다음 페이지 목록 보여주기

      //aptDetail info 초기화
      commit("CLEAR_APT_DETAIL");

      let currPage = this.state.aptList.currPage;
      http
        .get(
          `home/list?dongCode=${this.state.dongCode}&dealYear=${this.state.year}&dealMonth=${this.state.month}&page=${currPage + 1
          }`
        )
        .then(({ data }) => {
          commit("SET_APT", data);
        });
    },
    getAptDetailInfo({ commit }, no) {
      let detail;

      if (this.state.aptList) {
        const aptList = this.state.aptList.boardList;
        aptList.forEach((info) => {
          if (info.no == no) {
            detail = info;
          }
        });
      }
      commit("SET_APT_DETAIL", detail);
    },
    async getLikeAptDetailInfo({ commit }) {
      let likeAptDetailList = [];
      this.state.likeList.forEach((likeList) => {
        http.get(`view/houseRead?no=${likeList.houseCode}`).then(({ data }) => {
          likeAptDetailList.push(data);
        });
      });
      commit("SET_LIKEDETAILLIST", likeAptDetailList);
      // console.log(likeAptDetailList);
    },
    getRecommandResult({ commit }, dongName) {
      http.get(`station/list?dongName=${dongName}`).then(({ data }) => {
        commit("STATION_APT", data);
      });
    },
    getRecommandAnimalResult({ commit }, dongName) {
      http.get(`/animal/list?dongName=${dongName}`).then(({ data }) => {
        commit("ANIMAL_APT", data);
      });
    },
    async userConfirm({ commit }, user) {
      console.log(user);
      await login(
        user,
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            let refreshToken = data["refresh-token"];

            commit("SET_IS_LOGIN", true);
            commit("SET_IS_LOGIN_ERROR", false);
            commit("SET_IS_VALID_TOKEN", true);
            sessionStorage.setItem("access-token", accessToken);
            sessionStorage.setItem("refresh-token", refreshToken);
          } else {
            //로그인 정보가 없음.
            alert('아이디 또는 비밀번호를 확인해주세요!!');
            commit("SET_IS_LOGIN", false);
            commit("SET_IS_LOGIN_ERROR", true);
            commit("SET_IS_VALID_TOKEN", false);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async getUserInfo({ commit, dispatch }, token) {
      let decodeToken = jwtDecode(token);
      console.log("2. getUserInfo() decodeToken :: ", decodeToken);
      await findById(
        decodeToken.userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_USER_INFO", data.userInfo);
            commit("SET_LIKE_LIST", data.aptLike);
            console.log("3. getUserInfo data >> ", data);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        async (error) => {
          console.log("getUserInfo() error code [토큰 만료되어 사용 불가능.] ::: ", error.response.status);
          commit("SET_IS_VALID_TOKEN", false);
          await dispatch("tokenRegeneration");
        }
      );
    },
    async tokenRegeneration({ commit, state }) {
      console.log("토큰 재발급 >> 기존 토큰 정보 : {}", sessionStorage.getItem("access-token"));
      await tokenRegeneration(
        JSON.stringify(state.userInfo),
        ({ data }) => {
          if (data.message === "success") {
            let accessToken = data["access-token"];
            console.log("재발급 완료 >> 새로운 토큰 : {}", accessToken);
            sessionStorage.setItem("access-token", accessToken);
            commit("SET_IS_VALID_TOKEN", true);
          }
        },
        async (error) => {
          // HttpStatus.UNAUTHORIZE(401) : RefreshToken 기간 만료 >> 다시 로그인!!!!
          if (error.response.status === 401) {
            console.log("갱신 실패");
            // 다시 로그인 전 DB에 저장된 RefreshToken 제거.
            await logout(
              state.userInfo.userid,
              ({ data }) => {
                if (data.message === "success") {
                  console.log("리프레시 토큰 제거 성공");
                } else {
                  console.log("리프레시 토큰 제거 실패");
                }
                alert("다시 로그인해 주세요.");
                commit("SET_IS_LOGIN", false);
                commit("SET_USER_INFO", null);
                commit("SET_LIKE_LIST", null);
                commit("SET_IS_VALID_TOKEN", false);
                this.$route.push({ name: "login" });
              },
              (error) => {
                console.log(error);
                commit("SET_IS_LOGIN", false);
                commit("SET_LIKE_LIST", null);
                commit("SET_USER_INFO", null);
                alert("다시 로그인해 주세요.");
                this.$route.push({ name: "login" });
              }
            );
          }
        }
      );
    },
    async userLogout({ commit }, userid) {
      await logout(
        userid,
        ({ data }) => {
          if (data.message === "success") {
            commit("SET_IS_LOGIN", false);
            commit("SET_USER_INFO", null);
            commit("SET_LIKE_LIST", null);
            commit("SET_IS_VALID_TOKEN", false);
          } else {
            console.log("유저 정보 없음!!!!");
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async like({ dispatch }, likeInfo) {
      await like(
        likeInfo,
        async ({ data }) => {
          console.log(data);
          if (data === "likeSuccess") {
            //좋아요 했으면 정보 갱신
            let token = sessionStorage.getItem("access-token");
            console.log(token);
            await dispatch("getUserInfo", token);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    async unlike({ dispatch }, no) {
      console.log(no);
      await unlike(
        no,
        async ({ data }) => {
          if (data === "unlikeSuccess") {
            //좋아요 했으면 정보 갱신
            let token = sessionStorage.getItem("access-token");
            console.log(token);
            await dispatch("getUserInfo", token);
          }
        },
        (error) => {
          console.log(error);
        }
      );
    },
    //News
    async searchNews({ commit }, keyword) {
      await news(
        keyword,
        async ({ data }) => {
          // if (data.message === "success") {
          console.log(data.items);
          let newsInfo = [];
          let items = [
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
              icon: 'mdi-book-variant',
            },
          ];
          for (let i = 0; i < 3; i++) {
            data.items[i].attr = items[i];
            newsInfo.push(data.items[i]);
          }
          commit("SET_NEWS_INFO", newsInfo);
          // }
        },
        (error) => {
          console.log(error);
        }
      )
    }
  },
  modules: {},
});
