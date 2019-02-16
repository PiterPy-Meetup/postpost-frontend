<template>
  <div>
    <h1 class='v-once'>Новый пост</h1>
    <v-form ref='form'>
      <v-textarea outline name='input-post' label='Текст поста' value></v-textarea>

      <v-container grid-list-xl text-md-center>
        <v-layout row wrap fill-height>
          <v-flex v-for='i in 4' :key='`3${i}`' xl3>
            <v-card dark color='secondary'>
              <v-card-text class='px-0'>
                <span v-if='i === 1'>+</span>
                <span v-else>&nbsp;</span>
              </v-card-text>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>

      <v-select
        :items='publicationTypes'
        label='Тип публикации'
        outline
      ></v-select>

      <span color='secondary'>Дата и время</span>
      <v-date-picker v-model="datePicker" reactive></v-date-picker>
      <v-time-picker v-model="timePicker" reactive></v-time-picker>

      <span color='secondary'>Соцсети</span>
      <v-btn v-for="socialMedia in socialMediaList" color='info'>{{ socialMedia.text }}</v-btn>

      <v-btn color="success">Создать пост</v-btn>
    </v-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';

@Component
export default class PublicationForm extends Vue {
    private publicationTypes: Array<{'text': string, 'value': string}> = [
      {text: 'Черновик', value: 'draft'},
      {text: 'Запланированная', value: 'scheduled'},
    ];

    private socialMediaList: Array<{'text': string, 'value': string}> = [
      {text: 'Telegram', value: 'telegram'},
      {text: 'Facebook', value: 'facebook'},
      {text: 'VK', value: 'vk'},
      {text: 'Twitter', value: 'twitter'},
      {text: 'Instagram', value: 'instagram'},
    ];

    private data() {
        return {
            datePicker: new Date().toISOString().substr(0, 10),
            timePicker: new Date().toLocaleTimeString(),
        };
    }
}
</script>
