<template>
  <v-app>
    <header-nav></header-nav>
    <v-main>
      <router-view />
    </v-main>
    <v-snackbar v-model="$store.state.sb.act" :color="$store.state.sb.color">
      {{ $store.state.sb.msg }}
      <template v-slot:action="{ attrs }">
        <v-btn v-bind="attrs" @click="$store.commit('POP', { act: false })"> Close </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>
<script>
import HeaderNav from "@/components/HeaderNav.vue";
export default {
  name: "App",
  components: {
    HeaderNav,
  },
  data: () => ({
    //
  }),
};
</script>
<style>
.container {
  max-width: 1500px;
}
</style>
