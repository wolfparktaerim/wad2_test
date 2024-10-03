<script setup>
    // import { ref } from 'vue'
    import WeatherMenu  from './WeatherMenu.vue'
    // defineProps({
    // msg: String,
    // })

    // const count = ref(0)
</script>

<script>
    export default { 
        components: { WeatherMenu },
        // props: ['menuitems', 'activeitem'],
        data() {
                return {
                  now: new Date(),
                  timeslots: [],
                  forecasts: {}
                }
            },
        methods: {
            // do_click(item) {
            //     this.current_active = item;
            //     this.$emit('click', item);
            // }
        }, 
        computed: {
          nowDate() {
              // return "2022-07-20"  // to do screenshot
              var nowStr = this.now.toISOString();
              return nowStr.slice(0, 10);
          }
        }, // computed
        created() {
          axios.get("https://api.data.gov.sg/v1/environment/2-hour-weather-forecast", {
              params: {
                  date: this.nowDate
              }
          })
          .then(response => {
              var data = response.data;
              // console.log(data);

              for (let i = 0; i < data.items.length; i++) {
                  let item = data.items[i];

                  let start = item.valid_period.start.substr(11, 5); //hour:min

                  // There are repeated entries of the same period.
                  // The later item is of a later update time.
                  let skip = false;
                  if ((i + 1) < data.items.length) {
                      let next_start = data.items[i + 1].valid_period.start.substr(11, 5);
                      if (start === next_start) continue; // skip this item
                  }

                  let end = item.valid_period.end.substr(11, 5); //hour:min

                  // Add to the list of timeslots
                  this.timeslots.push({start:start,end:end});

                  for (let area_forecast of item.forecasts) {
                      let area = area_forecast.area;
                      let forecast = {
                          forecast: area_forecast.forecast,
                          skip: false,  // for table display
                          span: 1 // for table display
                      };

                      // There are "Partly Cloudy (Day)" and "Partly Cloudy (Night)" 
                      // Does not matter to us
                      if (forecast.forecast.includes("Partly Cloudy")) {
                          forecast.forecast = "Partly Cloudy";
                      }

                      // add to our filtered forecasts
                      if (this.forecasts[area]) {
                          this.forecasts[area].push(forecast);
                      } else {
                          this.forecasts[area] = [forecast];
                      }
                  }

              }

              // latest time first
              this.timeslots.reverse();

              for (area in this.forecasts) {
                  // reverse the areas' forecasts too to have latest time first.
                  this.forecasts[area].reverse();

                  // Update the skip and span properties to prepare for table creation
                  let area_forecasts = this.forecasts[area];
                  for (let i = 0; i < area_forecasts.length; i++) {
                      let forecast_i = area_forecasts[i];

                      // check subsequent timeslots
                      let j = i + 1;
                      while (j < area_forecasts.length
                          && forecast_i.forecast === area_forecasts[j].forecast) {
                          // same forecast

                          // increase i-th's span to cover j-th.
                          forecast_i.span++;
                          // j-th can be skipped
                          area_forecasts[j].skip = true;

                          j++;
                      }

                  }
              }

              // console.log(this.timeslots);
              // console.log(this.forecasts);

          })
          .catch(error => {
              document.getElementById("output").innerText = 'HTTP Error ' + error.message;
          });
        },
  
    } // end of export default

</script>

<template>
  <WeatherMenu></WeatherMenu>

  <h1>Consolidated 2 hourly forecasts {{nowDate}}</h1>

  <div class="overflow-scroll" style="max-width: 100%; max-height:480px;">
      <table class="table table-bordered table-striped text-center">
          <thead>
              <tr>
                  <th scope="col">Start of 2-hour </th>
                  <th scope='col' v-for='n in timeslots.length'>
                      {{timeslots[n-1].start}}
                      <template v-if="n===1">
                      to {{timeslots[n-1].end}}
                      </template>
                  </th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="(area_forecasts, area) in forecasts">
                  <th scope="row">{{area}}</th>
                  <template v-for="forecast in area_forecasts">
                      <td v-if="!forecast.skip" :colspan="forecast.span">
                          {{forecast.forecast}}
                      </td>
                  </template>
              </tr>
          </tbody>
      </table>
  </div>

  <div id="output"></div>    

</template>

<style scoped>
    /* .read-the-docs {
    color: #888;
    } */
</style>
