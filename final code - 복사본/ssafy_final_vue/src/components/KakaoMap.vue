<template>
  <div class="mapmain" v-if="aptList" style="border-radius: 1rem">
    <div class="map" id="place1" style="width: 100%; height: 60vh; border-radius: 1rem"></div>
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "kakaoMap",
  data() {
    return {
      map: Object,
      markers: [],
    };
  },
  computed: {
    ...mapState(["aptList"]),
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
    aptList() {
      this.initMap();
    },
  },
  methods: {
    async initMap() {
      this.clear_markers();

      const container = document.getElementById("place1");
      if (this.aptList.boardList) {
        const options = {
          center: new kakao.maps.LatLng(
            this.aptList.boardList[0].lat,
            this.aptList.boardList[0].lng
          ),
          level: 4,
        };
        //지도 객체를 등록합니다.
        //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        const map = new kakao.maps.Map(container, options); // 지도를 생성합니다.
        this.map = map;

        var imageSrc = "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png";
        // 마커 이미지의 이미지 크기 입니다
        var imageSize = new kakao.maps.Size(24, 35);

        // 마커 이미지를 생성합니다
        var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);

        for (let i = 0; i < this.aptList.boardList.length; i++) {
          this.markers.push(
            new kakao.maps.Marker({
              map: this.map,
              title: this.aptList.boardList[i].apartmentName,
              position: new kakao.maps.LatLng(
                this.aptList.boardList[i].lat,
                this.aptList.boardList[i].lng
              ),
              image: markerImage, // 마커 이미지
            })
          );
        }
      } else {
        let now = await this.getNowLocation();

        const options = {
          center: new kakao.maps.LatLng(now.nowLat, now.nowLng),
          level: 4,
        };
        //지도 객체를 등록합니다.
        //지도 객체는 반응형 관리 대상이 아니므로 initMap에서 선언합니다.
        const map = new kakao.maps.Map(container, options); // 지도를 생성합니다.
        this.map = map;
      }
    },
    clear_markers() {
      this.markers.forEach((marker) => {
        marker.setMap(null);
      });
    },
    async getNowLocation() {
      let data = Object;
      let position = await this.getMyGps();
      data = {
        nowLat: position.coords.latitude,
        nowLng: position.coords.longitude,
      };
      return data;
    },
    getMyGps() {
      return new Promise((resolve, rejected) => {
        navigator.geolocation.getCurrentPosition(resolve, rejected);
      });
    },
    displayInfoWindow() {
      if (this.infowindow && this.infowindow.getMap()) {
        //이미 생성한 인포윈도우가 있기 때문에 지도 중심좌표를 인포윈도우 좌표로 이동시킨다.
        this.map.setCenter(this.infowindow.getPosition());
        return;
      }

      var iwContent = '<div style="padding:5px;">Hello World!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
        iwPosition = new kakao.maps.LatLng(33.450701, 126.570667), //인포윈도우 표시 위치입니다
        iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

      this.infowindow = new kakao.maps.InfoWindow({
        map: this.map, // 인포윈도우가 표시될 지도
        position: iwPosition,
        content: iwContent,
        removable: iwRemoveable,
      });

      this.map.setCenter(iwPosition);
    },
  },
};
</script>

<style>
.mapmain {
  padding: 40px;
}
</style>
