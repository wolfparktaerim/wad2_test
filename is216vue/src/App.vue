<script setup>
// import HelloWorld from './components/HelloWorld.vue'

// import WeatherMenu from './components/WeatherMenu.vue'
</script>

<!-- // <script>
// export default {
//   components: { WeatherMenu },
//     data() {
//         return {
//             menuitems: ["Temperature", "2-hourly", "24-hour", "4-days"],
//             current_active: "Temperature"
//         };
//     }, // data
//     methods: {
//         do_menu_click(item) {
//             this.current_active = item;
//         }
//     },
//   };
// </script> -->

<template>
  <router-view></router-view>
  <!-- <div class="p-3">
    <WeatherMenu :menuitems="menuitems" :activeitem="current_active" @click="do_menu_click"></WeatherMenu> -->

    <!-- <temperature v-if='current_active === "Temperature"'></temperature>

    <forecast_2_hourly v-if='current_active === "2-hourly"'></forecast_2_hourly>

    <forecast_24_hour v-if='current_active === "24-hour"'></forecast_24_hour>

    <forecast_4_days v-if='current_active === "4-days"'></forecast_4_days> -->

    <!-- <a href="https://vitejs.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div> -->
  <!-- <HelloWorld msg="Vite + Vue" /> -->
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
