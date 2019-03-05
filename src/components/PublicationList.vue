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
import { fetchPublications } from '../api';


@Component({
  components: {
    PublicationListItem,
  },
})
// почему publication-list, а не publications: https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential
export default class PublicationList extends Vue {
  public publications: PublicationInterface[] = [];

  public mounted() {
    this.updatePublications();
  }

  public async updatePublications() {
    this.publications = await fetchPublications();
  }
}
</script>
