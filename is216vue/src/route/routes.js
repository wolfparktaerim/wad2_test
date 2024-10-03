// import {createRouter} from 'vue-router'
import {
    createWebHistory,
    createRouter
} from "vue-router";

// import HelloWorld from '../components/HelloWorld.vue';
import WeatherMenu from '../components/WeatherMenu.vue';
import Temperature from '../components/Temperature.vue';
import Forecast2Hour from '../components/Forecast2Hour.vue';
import Forecast24Hour from '../components/Forecast24Hour.vue';
import Forecast4Days from '../components/Forecast4Days.vue';

const history = createWebHistory()
const routes = [
  {
    path: '/',
    component: WeatherMenu
  },

  {
    path: '/Temperature/',
    component: Temperature
  },

  {
    path: '/Forecast2Hour/',
    component: Forecast2Hour 
  },
  {
    path: '/Forecast24Hour/',
    component: Forecast24Hour 
  },
  {
    path: '/Forecast4Days/',
    component: Forecast4Days
  },
]

// export default function (history) {
//     return createRouter({
//       history,
//       routes
//     })
// }

const router = createRouter({
    history,
    routes
  });

export default router;