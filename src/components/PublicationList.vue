<template>
  <v-card>Cписок публикаций
    <template v-for='publication in publications'>
      <publication-list-item :publication='publication' :key='publication.id'></publication-list-item>
    </template>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PublicationListItem from '@/components/PublicationListItem.vue';
import { PublicationInterface } from '@/interfaces';

@Component({
  components: {
    PublicationListItem,
  },
})
// почему publication-list, а не publications: https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential
export default class PublicationList extends Vue {
  // не уверен что computed для запроса внешних данных хорошая идея,
  // но с константными данными почему бы и нет
  get publications(): PublicationInterface[] {
    // использовать здесь API-вызовы
    return [
      {
        id: 1,
        text: 'something',
        currentStatus: 'scheduled',
        platformPosts: [],
        createdAt: '',
        updatedAt: '',
      },
      {
        id: 2,
        text: 'something',
        currentStatus: 'scheduled',
        platformPosts: [],
        createdAt: '',
        updatedAt: '',
      },
    ];
  }
}
</script>
