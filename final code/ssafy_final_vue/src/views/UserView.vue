<template>
    <v-container>
        <router-view></router-view>
    </v-container>
</template>
<script>
</script>
<style>
.container {
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
</style>