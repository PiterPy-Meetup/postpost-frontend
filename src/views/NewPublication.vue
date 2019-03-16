<template>
  <div id=app>
    <v-app>
      <publication-form></publication-form>
    </v-app>
  </div>
</template>

<script lang='ts'>
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import PublicationForm from '@/components/PublicationForm.vue';

@Component({
  components: {
    PublicationForm,
  },
})
export default class NewPublication extends Vue {}
</script>
