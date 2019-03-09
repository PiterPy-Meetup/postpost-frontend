<template>
  <v-container>
    <v-layout>
      <v-flex offset-xs4 xs4>
        <login-form></login-form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { Component } from 'vue-property-decorator';
  import LoginForm from '@/components/LoginForm.vue';

  @Component({
    components: {
      LoginForm,
    },
  })
  export default class Login extends Vue {}
</script>
