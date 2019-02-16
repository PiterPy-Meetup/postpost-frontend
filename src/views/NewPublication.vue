<template>
  <publication-form></publication-form>
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
