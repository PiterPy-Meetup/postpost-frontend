<template>
  <v-container>
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex
        xs12
        sm8
        lg6
      >
        <login-form></login-form>
      </v-flex>
      <v-spacer></v-spacer>
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
