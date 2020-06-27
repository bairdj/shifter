<template>
    <v-card>
        <v-card-title>
            Shift Configuration
        </v-card-title>
        <v-card-text>
            <v-form ref="form">
                <v-row>
                    <v-col>
                        <v-menu
                                :close-on-content-click="false"
                                :return-value.sync="startTime"
                                ref="startTime"
                                v-model="showStartTime">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        label="Start Time"
                                        readonly
                                        v-model="startTime"
                                        prepend-icon="mdi-briefcase-clock"
                                        v-on="on"
                                        :rules="timeRules"></v-text-field>
                            </template>
                            <v-time-picker
                                    v-if="showStartTime"
                                    full-width
                                    v-model="startTime"
                                    format="24hr"
                                    @click:minute="$refs.startTime.save(startTime)"/>
                        </v-menu>
                    </v-col>
                    <v-col>
                        <v-menu
                                :close-on-content-click="false"
                                :return-value.sync="endTime"
                                ref="endTime"
                                v-model="showEndTime">
                            <template v-slot:activator="{ on }">
                                <v-text-field
                                        label="End Time"
                                        v-model="endTime"
                                        readonly
                                        v-on="on"
                                        :rules="timeRules"
                                        prepend-icon="mdi-briefcase-clock"/>
                            </template>
                            <v-time-picker
                                v-if="showEndTime"
                                full-width
                                v-model="endTime"
                                format="24hr"
                                @click:minute="$refs.endTime.save(endTime)"/>
                        </v-menu>
                    </v-col>
                </v-row>
                <v-row>
                    <v-col>
                        <v-text-field
                            label="Hourly Rate"
                            prepend-icon="mdi-cash-100"
                            v-model="rate"
                            type="number"
                            :rules="requiredRules"/>
                    </v-col>
                </v-row>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn text color="primary" @click="submit">Start</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
  import {DateTime} from 'luxon';
  import {required, timePattern, aboveZero} from '../rules';

  export default {
    name: "ShiftForm",
    data() {
      return {
        startTime: null,
        endTime: null,
        showStartTime: false,
        showEndTime: false,
        rate: null
      }
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          let start = DateTime.fromFormat(this.startTime, 'HH:mm');
          let end = DateTime.fromFormat(this.endTime, 'HH:mm');
          // Increment date if end time is less than start time i.e. night shift
          if (start > end) {
            end = end.plus({days: 1});
          }
          this.$emit('setup', start, end, parseFloat(this.rate))
        }
      }
    },
    computed: {
      timeRules() {
        return [required, timePattern]
      },
      requiredRules() {
        return [required, aboveZero]
      }
    }
  }
</script>

<style scoped>

</style>
