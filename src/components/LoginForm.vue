<template>
  <v-card class="pa-4">
    <v-form class="login-form">
      <v-text-field
        v-model="username"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        required
      ></v-text-field>

      <v-btn
        color="success"
        @click="signInUser"
        :loading="loading"
        :disabled="loading"
      >Login</v-btn>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { authorizeUser } from '@/api';


@Component
export default class LoginForm extends Vue {
  public username: string = '';
  public password: string = '';
  public loading: boolean = false;

  public async signInUser() {
    this.loading = true;
    try {
      const authInfo = await authorizeUser(this.username, this.password);
      this.$store.commit('changeTokens', {
        accessToken: authInfo.access_token,
        refreshToken: authInfo.refresh_token,
      });
      this.$router.push({'name': 'publications'});
    } catch (error) {
      // TODO: add error handling
    }
    this.loading = false;
  }
}
</script>

<style>
  .login-form {
    max-width: 500px;
  }
</style>
