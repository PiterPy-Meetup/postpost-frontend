<docs>
Hey **hello**
</docs>

<template>
  <v-card class='publication-list-item'>
    <v-card-title primary-title>
      <div class='headline'>{{ text }}</div>
    </v-card-title>
  </v-card>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Prop, Component } from 'vue-property-decorator';

@Component
// почему publication-list-item, а не publication:
// https://vuejs.org/v2/style-guide/#Multi-word-component-names-essential
// https://vuejs.org/v2/style-guide/#Tightly-coupled-component-names-strongly-recommended
export default class PublicationListItem extends Vue {
  @Prop({ type: Number })
  public id!: number;

  @Prop({ type: String })
  public text!: string;

  @Prop({ type: String })
  public createdAt!: string;

  @Prop({ type: Number })
  public platformCount!: number;

  @Prop({ type: Number })
  public attachmentCount!: number;

  @Prop({ type: String })
  public status!: string;
}
</script>

<style scoped>
.publication-list-item {
  max-width: 200px;
}
</style>
