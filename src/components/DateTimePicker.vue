<template>
    <v-layout row wrap>
        <v-flex xs3>
            <v-menu
                    ref="menuDate"
                    v-model="dateMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            :value="getDate"
                            label="Дата"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-date-picker :value="getDate" @input="onDateInput" no-title scrollable reactive>
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary"
                           @click="dateMenu = false">OK
                    </v-btn>
                </v-date-picker>
            </v-menu>
        </v-flex>

        <v-flex offset-xs1 xs3>
            <v-menu
                    v-model="timeMenu"
                    :close-on-content-click="false"
                    :nudge-right="40"
                    lazy
                    transition="scale-transition"
                    offset-y
                    full-width
                    max-width="290px"
                    min-width="290px"
            >
                <template v-slot:activator="{ on }">
                    <v-text-field
                            :value="getTime"
                            label="Время"
                            readonly
                            v-on="on"
                    ></v-text-field>
                </template>
                <v-time-picker
                        :value="getTime"
                        @input="onTimeInput"
                        full-width
                >
                    <v-spacer></v-spacer>
                    <v-btn flat color="primary"
                           @click="timeMenu = false">OK
                    </v-btn>
                </v-time-picker>
            </v-menu>
        </v-flex>

    </v-layout>
</template>

<script lang='ts'>
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import {Prop} from 'vue-property-decorator';
    import moment from 'moment';

    @Component
    export default class DateTimePicker extends Vue {

        @Prop({
            type: String,
        })
        public value!: string;

        private dateMenu!: boolean = false;

        private timeMenu!: boolean = false;

        private onDateInput(newValue): void {
            const date = moment(newValue, 'YYYY-MM-DD');
            const currentDate = this.value ? moment(this.value, moment.HTML5_FMT.DATETIME_LOCAL_MS ) : moment();
            currentDate.year(date.year()).month(date.month()).date(date.date());
            this.$emit('input', currentDate.format(moment.HTML5_FMT.DATETIME_LOCAL_MS));
        }

        private onTimeInput(newValue): void {
            const date = moment(newValue, 'HH:mm');
            const currentDate = this.value ? moment(this.value, moment.HTML5_FMT.DATETIME_LOCAL_MS ) : moment();
            currentDate.hour(date.hour()).minute(date.minute()).second(date.second()).millisecond(date.millisecond());
            this.$emit('input', currentDate.format(moment.HTML5_FMT.DATETIME_LOCAL_MS));
        }

        private get getTime(): string {
            if (!this.value) {
                return '';
            }
            return moment(this.value, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('HH:mm');
        }

        private get getDate(): string {
            if (!this.value) {
                return '';
            }
            return moment(this.value, moment.HTML5_FMT.DATETIME_LOCAL_MS).format('YYYY-MM-DD');
        }

    }

</script>

<style scoped>

</style>
