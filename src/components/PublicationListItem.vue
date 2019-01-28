<template>
  <v-card>
    <v-card-title primary-title>
      <div>
        <div class='headline'>Публикация №{{ publication.id }}</div>
      </div>
    </v-card-title>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';
import { PublicationInterface } from '@/interfaces.ts';

@Component
// почему publication-list-item, а не publication:
// https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential
// https://vuejs.org/v2/style-guide/#Tightly-coupled-component-names-strongly-recommended
export default class PublicationListItem extends Vue {
  @Prop({ type: Object as () => PublicationInterface })
  public publication!: PublicationInterface;
}
</script>

<style>
</style>
