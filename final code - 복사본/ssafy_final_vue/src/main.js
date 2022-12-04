import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import "@/util/fontAwesomeIcon.js"; // fontAwesomeIcon.js 불러옴
import CKEditor from "ckeditor4-vue";
Vue.use(CKEditor);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
