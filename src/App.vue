<template>
  <v-app>
    <v-content>
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col lg="6" sm="12">
            <ShiftForm v-on:setup="update" v-if="!setup"/>
            <Output v-else :interval="interval" :rate="rate"/>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import ShiftForm from "./components/ShiftForm";
import Output from "./components/Output";
import { Interval } from 'luxon';
export default {
  name: 'App',
  components: {Output, ShiftForm},
  data() {
    return {
      setup: false,
      startTime: null,
      endTime: null,
      rate: 0
    }
  },
  methods: {
    update(startTime, endTime, rate) {
      this.startTime = startTime;
      this.endTime = endTime;
      this.rate = rate;
      this.setup = true;
    }
  },
  computed: {
    interval() {
      return Interval.fromDateTimes(this.startTime, this.endTime);
    }
  }
};
</script>
