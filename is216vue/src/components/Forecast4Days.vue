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
        
        data() {
            return {
                now: new Date(),
                forecasts: []
            };
        }, // data

        computed: {
            nowDate() {
                var nowStr = this.now.toISOString();
                return nowStr.slice(0, 10);
            }
        }, // computed

        created() {
            axios.get("https://api.data.gov.sg/v1/environment/4-day-weather-forecast", {
                params: {
                    date: this.nowDate
                }
            })
                .then(response => {
                    var obj = response.data;
                    this.process(obj);
                }).catch(error => {
                    document.getElementById("output").innerText = 'HTTP Error ' + error.message;
                });
        }, // created

        methods: {
            getTimePart(str) {
                return str.slice(11, 16);
            },
            process(obj) {
                // use the latest update
                this.forecasts = obj.items[obj.items.length - 1].forecasts;

            } // process
        }, // methods
  }
    
</script>

<template>
    <WeatherMenu></WeatherMenu>

    <h2>4-days</h2>

    <table class='table table-bordered table-striped text-center'>
        <thead>
            <tr>
                <th scope="col" rowspan='2'>Date</th>
                <th scope="col" rowspan='2'>Forecast</th>
                <th scope="col" colspan='2'>Temperature</th>
                <th scope="col" colspan='2'>Humid</th>
                <th scope="col" colspan='3'>Wind</th>
            </tr>
            <tr>
                <td>Low</td>
                <td>High</td>
                <td>Low</td>
                <td>High</td>
                <td>Direction</td>
                <td>Low</td>
                <td>High</td>
            </tr>
        </thead>
        <tbody>
            <tr v-for="forecast of forecasts">
                <th scope='row'>{{forecast.date}}</th>
                <td>{{forecast.forecast}}</td>
                <td>{{forecast.temperature.low}}</td>
                <td>{{forecast.temperature.high}}</td>
                <td>{{forecast.relative_humidity.low}}</td>
                <td>{{forecast.relative_humidity.high}}</td>
                <td>{{forecast.wind.direction}}</td>
                <td>{{forecast.wind.speed.low}}</td>
                <td>{{forecast.wind.speed.high}}</td>
            </tr>
        </tbody>
    </table>

    <p id="output"></p>   
 
</template>

<style scoped>
    /* .read-the-docs {
    color: #888;
    } */
</style>
