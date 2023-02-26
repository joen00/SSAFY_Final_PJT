<template>
  <div style="width: 80%; margin: auto" v-show="isShow">
    <v-card>
      <div class="detailMain">
        <div class="aptName">
          <h1>{{ aptDetailInfo.apartmentName }} 아파트</h1>
          <button class="like-btn" @click="changeLike" v-if="isLike" id="like">
            <v-icon color="red">fa-solid fa-heart</v-icon>
          </button>
          <button class="like-btn" @click="changeLike" v-else id="unlike">
            <v-icon color="red">fa-regular fa-heart</v-icon>
          </button>
        </div>
        <div class="detailMiddle">
          <div class="detailMiddleLeft">
            <div class="detail-img">
              <img class="img" src="@/assets/detailbighouse.jpg" width="200px" />
              <br />
              <strong> {{ aptDetailInfo.area }} ㎡ </strong>
            </div>
            <!--  simple info -->
            <table>
              <tr>
                <td>
                  <v-chip :color="`red lighten-4`" label class="info-item"
                    ><strong>검색주소</strong></v-chip
                  >
                </td>
                <td>
                  &nbsp;
                  <strong
                    >{{ sido }} {{ aptDetailInfo.dongName }}
                    {{ aptDetailInfo.roadName }}
                    {{ aptDetailInfo.jibun }}</strong
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
                  <strong>{{ aptDetailInfo.dealYear }}년 {{ aptDetailInfo.dealMonth }}월</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <v-chip :color="`red lighten-4`" label class="info-item"
                    ><strong>건축 년도</strong></v-chip
                  >
                </td>
                <td>
                  &nbsp; <strong>{{ aptDetailInfo.buildYear }}년</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <v-chip :color="`red lighten-4`" label class="info-item">
                    <strong>층</strong></v-chip
                  >
                </td>
                <td>
                  &nbsp; <strong>{{ aptDetailInfo.floor }}층</strong>
                </td>
              </tr>
              <tr>
                <td>
                  <v-chip :color="`red lighten-4`" label class="info-item">
                    <strong>거래 금액</strong></v-chip
                  >
                </td>
                <td>
                  &nbsp; <strong>{{ aptDetailInfo.dealAmount }}만원</strong>
                </td>
              </tr>
            </table>
          </div>
          <div class="detailMiddleRight">
            <div>
              <div
                class="map"
                id="map"
                style="width: 100%; height: 455px; border-radius: 1rem"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  name: "AptInfoDetail",
  components: {},
  data() {
    return {
      map: Object,
      markers: [],
      isLike: false,
    };
  },
  created() {},
  computed: {
    ...mapState(["aptDetailInfo", "sido", "likeList", "userInfo", "isShow"]),
  },
  methods: {
    initMap() {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });

      const container = document.getElementById("map");

      const options = {
        center: new kakao.maps.LatLng(this.aptDetailInfo.lat, this.aptDetailInfo.lng),
        level: 4,
      };
      //지도 객체를 등록합니다.
      //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
      this.map = new kakao.maps.Map(container, options); // 지도를 생성합니다.

      var markerPosition = new kakao.maps.LatLng(this.aptDetailInfo.lat, this.aptDetailInfo.lng);

      // 마커를 생성합니다
      var marker = new kakao.maps.Marker({
        position: markerPosition,
      });

      // 마커가 지도 위에 표시되도록 설정합니다
      marker.setMap(this.map);
    },
    check_like() {
      let no = this.aptDetailInfo.no;
      this.isLike = false;

      this.likeList.forEach((likeInfo) => {
        if (no === likeInfo.houseCode) {
          this.isLike = true;
        }
      });
    },
    async changeLike() {
      //로그인 정보가 없으면 로그인 알람창 후 이동
      if(!this.userInfo){
        alert('로그인 후 이용해주세요');
        this.$router.push({  name:'login'})
      }

      if (this.isLike) {
        //좋아요 되어 있으면 delete하고 바꾸기

        let no;
        this.likeList.forEach((info) => {
          if (info.houseCode === this.aptDetailInfo.no) no = info.no;
        });
        await this.unlike(no);
        this.isLike = false;
      } else {
        // 좋아요 처리
        let likeInfo = {
          userId: this.userInfo.userId,
          houseCode: this.aptDetailInfo.no,
        };
        await this.like(likeInfo);

        this.$store.commit("POP", {
          msg: "관심 매물에 등록되었습니다.",
          color: "dark",
        });
        this.isLike = true;
      }
    },
    ...mapActions(["like", "unlike"]),
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      /* global kakao */
      script.onload = () => kakao.maps.load(this.initMap);
      script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAO_MAP_SERVICE_KEY}`;

      document.head.appendChild(script);
    }
  },
  watch: {
    aptDetailInfo() {
      this.$store.commit("TOGGLE_IS_SHOW", true);
      this.map = null;
      this.initMap();
      this.check_like();
    },
  },
};
</script>

<style>
.detailMain {
  margin-top: 5rem;
  background-color: rgb(255, 255, 255);
  height: 600px;
  -webkit-animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}
.aptName {
  padding: 1rem;
  text-align: center;

  position: relative;
}
.like-btn {
  position: absolute;
  top: 20px;
  right: 40px;
  font-size: 25px;
}
.detailMiddle {
  display: flex;
  padding: 1rem;
}
.detailMiddleLeft {
  text-align: center;
  margin: 20px;
  width: 30%;
}
.detailMiddleRight {
  margin: 20px;
  width: 70%;
}
.info-item {
  width: 80px;
  text-align: center;
}
.img {
  border-radius: 50px;
  -moz-border-radius: 70px;
  -khtml-border-radius: 70px;
  -webkit-border-radius: 70px;
}
</style>
