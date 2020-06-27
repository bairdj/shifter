<template>
    <v-row class="fill-height" align="center">
        <v-col>
            <h1 class="display-4 mb-10 text-center">{{accrued}}</h1>
            <v-progress-linear :value="progress"/>
        </v-col>
    </v-row>
</template>

<script>
    import { DateTime, Interval } from 'luxon';
  export default {
    props: {
      interval: Interval,
      rate: Number
    },
    data() {
      return {
        now: DateTime.local(),
        timer: null
      }
    },
    name: "Output",
    computed: {
      shiftHours() {
        return this.interval.toDuration().as('hours');
      },
      shiftHoursWorked() {
        if (this.interval.contains(this.now)) {
          const split = this.interval.splitAt(this.now);
          return split[0].toDuration().as('hours');
        } else if (this.interval.isAfter(this.now)) {
          return 0;
        } else {
          return this.shiftHours;
        }
      },
      progress() {
        return this.shiftHoursWorked / this.shiftHours * 100;
      },
      accrued() {
        const formatter = new Intl.NumberFormat('en-gb', {style: 'currency', currency: 'GBP'});
        return formatter.format(this.shiftHoursWorked * this.rate);
      }
    },
    created() {
      // Calculate how often rate increases by 0.01
      let change = (60 * 60 * 1000) / (this.rate / 0.01);
      this.timer = setInterval(() => this.now = DateTime.local(), change)
    }
  }
</script>

<style scoped>

</style>
