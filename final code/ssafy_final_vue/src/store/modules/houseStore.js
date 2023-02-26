import {sidoList, gugunList, houseList} from "@/api/house.js";

const houseStore = {
    namespaced : true,
    state : {
        sido : [{value:null, text: "선택하세요"}],
        gugun : [{value:null, text: "선택하세요"}],
        aptList : Object,
        aptDetailInfo: Object,
        dong: "",
        dongCode: "",
        year: "",
        month: "",
    },
    getters: {},
    mutations: {
        SET_SIMPLE_HOUSE(state, house) {
        state.house = house;
        },
        SET_SIDO(state, sido) {
        state.sido = sido;
        },
        SET_GUGUN(state, gugun) {
        state.gugun = gugun;
        },
        SET_DONG(state, dong) {
        state.dong = dong;
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
        CLEAR_APT(state) { 
        state.aptList = Object;
        state.aptDetailInfo = Object;
        },
        CLEAR_APT_DETAIL(state) { 
        state.aptDetailInfo = Object;
        }
    },
    actions :{
        searchSido : ({commit}) =>{
            sidoList(
                ({data}) => {
                    commit("SET_SIDO", data);
                },
                (error)=>{
                    console.log(error);
                }
            );
        }
    }
}