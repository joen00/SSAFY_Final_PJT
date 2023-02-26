<template>
  <v-container>
    <div class="main-header-section">
      <div class="section1">
        <img src="@/assets/busmain.png" width="70px" /> &nbsp;
        <span class="main-header-title">교통 정보 맞춤 매물 추천</span>
      </div>

      <div class="section1">
        <span class="main-header-title2"
          >시군구를 선택하고 추천된 아파트 상세 정보를 확인하세요</span
        >
        <div class="select_section">
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
          <v-btn color="#FFFFFF" elevation="2" @click="searchResult()"
            ><strong>검색</strong></v-btn
          >
        </div>
      </div>
    </div>
    <!--  -->
    <div class="card-section" v-if="StationApt != null">
      <!-- 첫번째 추천 아파트  -->
      <v-card
        class="mx-auto"
        max-width="300"
        min-width="300"
        max-height="300"
        elevation="17"
        color="#FF6450"
        style="text-align: center; padding-top: 2.5rem; border-radius: 1rem"
        round
      >
        <!--여기 모달창 step 1 -->
        <div class="text-center">
          <v-dialog v-model="dialog1" width="900">
            <template v-slot:activator="{ on, attrs }">
              <h1
                style="color: black"
                v-bind="attrs"
                v-on="on"
                @click="getTotalApt(StationApt[0].apartmentName)"
              >
                {{ StationApt[0].apartmentName }}
              </h1>
            </template>
            <v-card>
              <br />
              <div style="text-align: center">
                <h1>{{ StationApt[0].apartmentName }} 아파트 거내 내역</h1>
              </div>
              <br />
              <v-card-text>
                <!-- 테이블 -->
                <v-data-table
                  :headers="headers"
                  :items="data"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>

              <br />
              <!-- 그래프 -->
              <v-card
                class="mx-auto text-center"
                color="green"
                dark
                max-width="600"
              >
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="dealAmount"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>

                <v-card-text>
                  <div style="font-family: LINESeedKR-Bd; font-size: 2rem">
                    3년간 거래 내역 그래프
                  </div>
                </v-card-text>
              </v-card>
              <!-- 그래프 끝-->
              <br />
              <br />
              <v-divider></v-divider>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog1 = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <!-- 여기 모달창 끝-->
        <p style="color: white; font-size: 13px">
          {{ sido }} {{ StationApt[0].dongName }} {{ StationApt[0].roadName }}
          {{ StationApt[0].jibun }}
        </p>
        <v-img
          src="@/assets/bus.png"
          max-height="120"
          max-width="120"
          style="margin: 0 auto"
        ></v-img>
      </v-card>

      <!-- 두번째 추천 아파트  -->
      <v-card
        class="mx-auto"
        max-width="300"
        min-width="300"
        max-height="300"
        elevation="17"
        color="#04DC00"
        style="text-align: center; padding-top: 2.5rem; border-radius: 1rem"
        round
      >
        <!--여기 모달창 step 1 -->
        <div class="text-center">
          <v-dialog v-model="dialog2" width="900">
            <template v-slot:activator="{ on, attrs }">
              <h1
                style="color: black"
                v-bind="attrs"
                v-on="on"
                @click="getTotalApt(StationApt[1].apartmentName)"
              >
                {{ StationApt[1].apartmentName }}
              </h1>
            </template>
            <v-card>
              <br />
              <div style="text-align: center">
                <h1>{{ StationApt[1].apartmentName }}</h1>
              </div>
              <br />
              <v-card-text>
                <v-data-table
                  :headers="headers"
                  :items="data"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>

              <br />
              <!-- 그래프 -->
              <v-card
                class="mx-auto text-center"
                color="green"
                dark
                max-width="600"
              >
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="dealAmount"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>

                <v-card-text>
                  <div style="font-family: LINESeedKR-Bd; font-size: 2rem">
                    3년간 거래 내역 그래프
                  </div>
                </v-card-text>
              </v-card>
              <!-- 그래프 끝-->
              <br />
              <br />
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog2 = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <!-- 여기 모달창 끝-->
        <p style="color: black; font-size: 13px">
          {{ sido }} {{ StationApt[1].dongName }} {{ StationApt[1].roadName }}
          {{ StationApt[1].jibun }}
        </p>
        <v-img
          src="@/assets/subway.png"
          max-height="120"
          max-width="120"
          style="margin: 0 auto"
        ></v-img>
      </v-card>
      <v-card
        class="mx-auto"
        max-width="300"
        min-width="300"
        max-height="300"
        elevation="17"
        color="#06A0E6"
        style="text-align: center; padding-top: 2.5rem; border-radius: 1rem"
        round
      >
        <!--여기 모달창 step 1 -->
        <div class="text-center">
          <v-dialog v-model="dialog3" width="900">
            <template v-slot:activator="{ on, attrs }">
              <h1
                style="color: black"
                v-bind="attrs"
                v-on="on"
                @click="getTotalApt(StationApt[2].apartmentName)"
              >
                {{ StationApt[2].apartmentName }}
              </h1>
            </template>
            <v-card>
              <br />
              <div style="text-align: center">
                <h1>{{ StationApt[2].apartmentName }}</h1>
              </div>
              <br />
              <v-card-text>
                <!-- 테이블 -->
                <v-data-table
                  :headers="headers"
                  :items="data"
                  :items-per-page="5"
                  class="elevation-1"
                ></v-data-table>
              </v-card-text>

              <br />
              <!-- 그래프 -->
              <v-card
                class="mx-auto text-center"
                color="green"
                dark
                max-width="600"
              >
                <v-card-text>
                  <v-sheet color="rgba(0, 0, 0, .12)">
                    <v-sparkline
                      :value="dealAmount"
                      color="rgba(255, 255, 255, .7)"
                      height="100"
                      padding="24"
                      stroke-linecap="round"
                      smooth
                    >
                    </v-sparkline>
                  </v-sheet>
                </v-card-text>

                <v-card-text>
                  <div style="font-family: LINESeedKR-Bd; font-size: 2rem">
                    3년간 거래 내역 그래프
                  </div>
                </v-card-text>
              </v-card>
              <!-- 그래프 끝-->
              <br />
              <br />
              <v-divider></v-divider>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="dialog3 = false">
                  Close
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>

        <!-- 여기 모달창 끝-->
        <p style="color: white; font-size: 13px">
          {{ sido }} {{ StationApt[2].dongName }} {{ StationApt[2].roadName }}
          {{ StationApt[2].jibun }}
        </p>
        <v-img
          src="@/assets/bike.png"
          max-height="120"
          max-width="120"
          style="margin: 0 auto"
        ></v-img>
      </v-card>
    </div>

    <div class="info-section" v-if="StationApt != null">
      <b
        >※ 추천 매물은 지하철, 버스, 따릉이의 직선거리순의 개수를
        비교했습니다.</b
      >
    </div>

    <div class="stationDetail" v-if="StationApt != null">
      <div>
        <div class="traffic-info">
          <h1>{{ StationApt[0].apartmentName }} 아파트 상세 정보</h1>
        </div>
      </div>
      <div class="stationDetailSubway">
        <div class="SDSubwayLeft">
          <v-img
            src="@/assets/subwaygif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="300px"
          ></v-img>
        </div>
        <div class="SDSubwayRight">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 500m 이내의
          </h1>
          <h1 style="text-align: center">
            지하철역은 {{ StationApt[0].stationList.length }}개 입니다.
          </h1>
          <div
            style="margin-left: 25%"
            v-for="(station, index) in StationApt[0].stationList"
            :key="index"
          >
            <!-- 호선 색깔-->
            <v-chip
              class="ma-2"
              color="#044E94"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `01호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#0FA34F"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `02호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#EB712A"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `03호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#029FDA"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `04호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#8C629E"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `05호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#BA6A36"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `06호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#5D6A19"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `07호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#E33168"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `08호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#A7977E"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `09호선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#F6AA0C"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `분당선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#3EB9C2"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `경의선`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#0088CA"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `공항철도`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#BFC932"
              text-color="white"
              v-if="StationApt[0].stationList[index].line == `우이신설경전철`"
            >
              {{ StationApt[0].stationList[index].line }}
            </v-chip>
            <!-- 호선 색깔-->
            <strong>{{ StationApt[0].stationList[index].name }}역</strong>까지
            {{ StationApt[0].stationList[index].distance | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
      </div>
      <!-- 버스 시작 -->
      <div class="stationDetailBus">
        <div class="SDBusLeft">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 100m 이내의
          </h1>
          <h1 style="text-align: center">
            버스정류장은 {{ StationApt[0].busList.length }}개 입니다.
          </h1>
          <br />
          <div v-for="(bus, index) in StationApt[0].busList" :key="index">
            <v-chip class="ma-2" color="#FF6450" text-color="white">
              {{ StationApt[0].busList[index].stop_nm }}
            </v-chip>
            까지
            {{ StationApt[0].busList[index].dis | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
        <div class="SDBBusMid"></div>
        <div class="SDBusRight">
          <v-img
            src="@/assets/busgif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="280px"
          ></v-img>
        </div>
      </div>
      <div class="stationDetailBike">
        <div class="SDBikeLeft">
          <v-img
            src="@/assets/bikegif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="300px"
          ></v-img>
        </div>
        <div class="SDBikeRight">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 100m 이내의
          </h1>
          <h1 style="text-align: center">
            따릉이는 {{ StationApt[0].bikeList.length }}개 입니다.
          </h1>
          <div
            v-for="(bike, index) in StationApt[0].bikeList"
            :key="index"
            style="margin-left: 20%"
          >
            <v-chip class="ma-2" color="#06A0E6" text-color="white">
              {{ StationApt[0].bikeList[index].rent_name }}
            </v-chip>
            까지
            {{ StationApt[0].bikeList[index].dis | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
      </div>
      <v-divider></v-divider>
      <!-- **********************************************************************아파트 시작1개 -->
      <div>
        <div class="traffic-info">
          <h1>{{ StationApt[1].apartmentName }} 아파트 상세 정보</h1>
        </div>
      </div>
      <div class="stationDetailSubway">
        <div class="SDSubwayLeft">
          <v-img
            src="@/assets/subwaygif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="300px"
          ></v-img>
        </div>
        <div class="SDSubwayRight">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 500m 이내의
          </h1>
          <h1 style="text-align: center">
            지하철역은 {{ StationApt[1].stationList.length }}개 입니다.
          </h1>
          <div
            style="margin-left: 25%"
            v-for="(station, index) in StationApt[1].stationList"
            :key="index"
          >
            <!-- 호선 색깔-->
            <v-chip
              class="ma-2"
              color="#044E94"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `01호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#0FA34F"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `02호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#EB712A"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `03호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#029FDA"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `04호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#8C629E"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `05호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#BA6A36"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `06호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#5D6A19"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `07호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#E33168"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `08호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#A7977E"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `09호선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#F6AA0C"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `분당선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#3EB9C2"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `경의선`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#0088CA"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `공항철도`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#BFC932"
              text-color="white"
              v-if="StationApt[1].stationList[index].line == `우이신설경전철`"
            >
              {{ StationApt[1].stationList[index].line }}
            </v-chip>
            <!-- 호선 색깔-->
            <strong>{{ StationApt[1].stationList[index].name }}역</strong>까지
            {{ StationApt[1].stationList[index].distance | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
      </div>
      <!-- 버스 시작 -->
      <div class="stationDetailBus">
        <div class="SDBusLeft">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 100m 이내의
          </h1>
          <h1 style="text-align: center">
            버스정류장은 {{ StationApt[1].busList.length }}개 입니다.
          </h1>
          <div v-for="(bus, index) in StationApt[1].busList" :key="index">
            <v-chip class="ma-2" color="#FF6450" text-color="white">
              {{ StationApt[1].busList[index].stop_nm }}
            </v-chip>
            까지
            {{ StationApt[1].busList[index].dis | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
        <div class="SDBBusMid"></div>
        <div class="SDBusRight">
          <v-img
            src="@/assets/busgif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="280px"
          ></v-img>
        </div>
      </div>
      <div class="stationDetailBike">
        <div class="SDBikeLeft">
          <v-img
            src="@/assets/bikegif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="300px"
          ></v-img>
        </div>
        <div class="SDBikeRight">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 100m 이내의
          </h1>
          <h1 style="text-align: center">
            따릉이는 {{ StationApt[1].bikeList.length }}개 입니다.
          </h1>
          <div
            v-for="(bike, index) in StationApt[1].bikeList"
            :key="index"
            style="margin-left: 20%"
          >
            <v-chip class="ma-2" color="#06A0E6" text-color="white">
              {{ StationApt[1].bikeList[index].rent_name }}
            </v-chip>
            까지
            {{ StationApt[1].bikeList[index].dis | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
      </div>
      <!-- 끝-->
      <v-divider></v-divider>
      <!-- **********************************************************************아파트 시작3개 -->
      <div>
        <div class="traffic-info">
          <h1>{{ StationApt[2].apartmentName }} 아파트 상세 정보</h1>
        </div>
      </div>
      <div class="stationDetailSubway">
        <div class="SDSubwayLeft">
          <v-img
            src="@/assets/subwaygif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="300px"
          ></v-img>
        </div>
        <div class="SDSubwayRight">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 500m 이내의
          </h1>
          <h1 style="text-align: center">
            지하철역은 {{ StationApt[2].stationList.length }}개 입니다.
          </h1>
          <div
            style="margin-left: 25%"
            v-for="(station, index) in StationApt[2].stationList"
            :key="index"
          >
            <!-- 호선 색깔-->
            <v-chip
              class="ma-2"
              color="#044E94"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `01호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#0FA34F"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `02호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#EB712A"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `03호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#029FDA"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `04호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#8C629E"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `05호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#BA6A36"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `06호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#5D6A19"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `07호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#E33168"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `08호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#A7977E"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `09호선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#F6AA0C"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `분당선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#3EB9C2"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `경의선`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#0088CA"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `공항철도`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <v-chip
              class="ma-2"
              color="#BFC932"
              text-color="white"
              v-if="StationApt[2].stationList[index].line == `우이신설경전철`"
            >
              {{ StationApt[2].stationList[index].line }}
            </v-chip>
            <!-- 호선 색깔-->
            <strong>{{ StationApt[2].stationList[index].name }}역</strong>까지
            {{ StationApt[2].stationList[index].distance | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
      </div>
      <!-- 버스 시작 -->
      <div class="stationDetailBus">
        <div class="SDBusLeft">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 100m 이내의
          </h1>
          <h1 style="text-align: center">
            버스정류장은 {{ StationApt[2].busList.length }}개 입니다.
          </h1>
          <div v-for="(bus, index) in StationApt[2].busList" :key="index">
            <v-chip class="ma-2" color="#FF6450" text-color="white">
              {{ StationApt[2].busList[index].stop_nm }}
            </v-chip>
            까지
            {{ StationApt[2].busList[index].dis | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
        <div class="SDBBusMid"></div>
        <div class="SDBusRight">
          <v-img
            src="@/assets/busgif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="280px"
          ></v-img>
        </div>
      </div>
      <div class="stationDetailBike">
        <div class="SDBikeLeft">
          <v-img
            src="@/assets/bikegif.gif"
            style="margin: 0 auto; border-radius: 2rem"
            max-height="300px"
          ></v-img>
        </div>
        <div class="SDBikeRight">
          <h1 style="text-align: center; font-size: 1.5rem">
            직선거리 100m 이내의
          </h1>
          <h1 style="text-align: center">
            따릉이는 {{ StationApt[2].bikeList.length }}개 입니다.
          </h1>
          <div
            v-for="(bike, index) in StationApt[2].bikeList"
            :key="index"
            style="margin-left: 20%"
          >
            <v-chip class="ma-2" color="#06A0E6" text-color="white">
              {{ StationApt[2].bikeList[index].rent_name }}
            </v-chip>
            까지
            {{ StationApt[2].bikeList[index].dis | distance }}
            m 떨어져 있습니다.
          </div>
        </div>
      </div>
      <!-- 끝-->
    </div>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { selectAllByAptName } from "@/api/house";
export default {
  name: "RecommendView",
  data() {
    return {
      sido: "",
      gugun: "",
      dong: "",
      dongCode: "",
      tab: null,
      items: ["지하철", "버스", "따릉이"],
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      dialog1: false,
      dialog2: false,
      dialog3: false,
      dealAmount: [],
      headers: [
        {
          text: "아파트 이름",
          align: "start",
          sortable: false,
          value: "apartmentName",
        },
        { text: "floor", value: "floor" },
        { text: "area", value: "area" },
        { text: "dealAmount", value: "dealAmount" },
        { text: "dealYear", value: "dealYear" },
        { text: "dealMonth", value: "dealMonth" },
      ],
      data: [
        {
          apartmentName: "",
          floor: 1,
          area: 0,
          dealAmount: 19900,
          dealYear: 4.0,
          dealMonth: "",
        },
      ],
    };
  },
  computed: {
    ...mapState(["gugunList", "dongList", "StationApt"]),
  },
  created() {
    this.sido = "서울특별시";
    console.log(this.sido);
    this.searchGugunList(this.sido);
    this.$store.commit("STATION_APT", null);
  },
  methods: {
    gugunChange() {
      //action
      this.searchDongList({
        sido: this.sido,
        gugun: this.gugun,
      });
    },
    dongChange() {
      //동코드 가져와
      this.searchDongcode({
        dong: this.dong,
        sido: this.sido,
      });
    },
    // 검색 버튼 누를때 실행됨
    searchResult() {
      this.getRecommandResult(this.dong);
    },
    getTotalApt(apartmentName) {
      console.log(apartmentName);
      console.log(this.dong);
      // 초기화
      this.data = [];
      this.dealAmount = [];
      let aptInfo = {
        apartmentName: apartmentName,
        dongName: this.dong,
      };
      //비동기 요청
      selectAllByAptName(
        aptInfo,
        ({ data }) => {
          console.log(data);
          this.data = data;
          data.forEach((aptInfo) => {
            let price = Number(aptInfo.dealAmount.replace(",", ""));
            this.dealAmount.push(price);
          });
        },
        (error) => {
          console.log(error);
        }
      );
    },
    ...mapActions([
      "searchGugunList",
      "searchDongList",
      "searchDongcode",
      "getRecommandResult",
    ]),
  },
  filters: {
    distance(value) {
      return parseInt(value);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "LINESeedKR-Bd";
  src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_11-01@1.0/LINESeedKR-Bd.woff2")
    format("woff2");
  font-weight: 700;
  font-style: normal;
}
.select_section {
  display: flex;
  margin-left: 100px;
}
.select {
  margin: 0px 20px;
  width: 200px;
}
.v-btn {
  background: none;
  width: 150px;
}
.card-section {
  max-height: 40vh;
  min-height: 40vh;

  margin: 60px 200px;

  display: flex;
  animation: fadein 1s;
}
@keyframes fadein {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
.info-section {
  font-family: "LINESeedKR-Bd";
  margin: 0px 250px;
  text-align: right;
  animation: fadein 1s;
}

.traffic-section {
  margin: 50px 300px;
}
.traffic-info {
  display: flex;
  margin-top: 80px;
  margin-bottom: 40px;
}

.traffic-detail {
  display: flex;
  flex-direction: column;
  align-content: center;
  margin-left: 20px;
}
.traffic-title {
  margin-top: 14px;
  font-size: 20px;
}
.traffic-content {
  color: gray;
}

/* Helper classes */
.basil {
  background-color: #fffbe6 !important;
  width: 1200px;
  margin: auto;
}
.basil--text {
  color: #356859 !important;
}
/* detail 상세 들어가는 곳 */
.stationDetail {
  width: 70%;
  margin: 0 auto;
  height: 1200px;
}
.stationDetailSubway {
  height: 33.3%;
  margin: 2rem;
  display: flex;
}
.stationDetailBus {
  height: 33.3%;
}
.stationDetailBike {
  height: 33.3%;
}
.SDSubwayLeft {
  width: 40%;
  height: 100%;
  float: left;
}
.SDSubwayRight {
  width: 60%;
  height: 100%;
  float: left;
}
.SDBusLeft {
  width: 40%;
  height: 100%;
  float: left;
}
.SDBBusMid {
  width: 10%;
  height: 100%;
  float: left;
}
.SDBusRight {
  width: 40%;
  height: 100%;
  float: left;
}
.SDBikeLeft {
  width: 40%;
  height: 100%;
  float: left;
}
.SDBikeRight {
  width: 60%;
  height: 100%;
  float: left;
}
p,
span {
  font-family: "LINESeedKR-Bd";
}
</style>
