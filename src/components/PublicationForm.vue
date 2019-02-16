<template>
  <div>
    <h1 class='v-once'>Новый пост</h1>
    <v-form ref='form'>
      <v-textarea outline name='input-post' label='Текст поста' value v-model="formData.text"></v-textarea>

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
        v-model="formData.type"
      ></v-select>

      <span color='secondary'>Дата и время</span>
      <v-date-picker v-model="formData.date" reactive></v-date-picker>
      <v-time-picker v-model="formData.time" reactive></v-time-picker>

      <span color='secondary'>Соцсети</span>
      <v-btn :key="socialMedia.value" v-for="socialMedia in socialMediaList" color='info'>{{ socialMedia.text }}</v-btn>

      <v-btn color="success" v-on:click="postPublication">Создать пост</v-btn>
    </v-form>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import Component from 'vue-class-component';
import { Prop } from 'vue-property-decorator';
import axios from 'axios';
import moment from 'moment';

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

    private formData = {
      date: new Date().toISOString().substr(0, 10),
      time: new Date().toLocaleTimeString(),
      text: '',
      type: null,
    };

    private async postPublication(): Promise<void> {
      // const result = await axios.post(`{BACKEND_URL}/api/publications`);

      const payload = this.transformFormDataToPayload();

      try {
        const result = await axios.post(
          `https://opes.serveo.net/api/publications/`,
          payload,
          {headers: {authorization: 'Bearer 9Q2DBXAUju3PpL7R18vdXbs6KQ1AJ6'}},
        );
      } catch (e) {
        // pass
      }
    }

    private transformFormDataToPayload(): any {  // TODO declare formdata and payload interfaces
      const data = this.formData;

      return {
        text: data.text,
        scheduledAt: moment(`${data.date} ${data.time}`).format(),
        platformPosts: [
          {
            platformType: 'telegram_channel',
          },
        ],
      };
    }
}
</script>
