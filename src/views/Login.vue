<template>
  <v-container>
    <v-layout>
      <v-spacer></v-spacer>
      <v-flex
        xs12
        sm8
        lg6
      >
        <login-form
          :loading="loading"
          :error="error"
          @change="signInUser"
        ></login-form>
      </v-flex>
      <v-spacer></v-spacer>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import LoginForm from '@/components/LoginForm.vue';
import { authorizeUser } from '@/api';

@Component({
  components: {
    LoginForm,
  },
})
export default class Login extends Vue {
  public loading: boolean = false;
  public error: string | null = null;

  public async signInUser(username: string, password: string) {
    this.loading = true;
    this.error = null;
    try {
      const authInfo = await authorizeUser(username, password);
      this.$store.commit('changeTokens', {
        accessToken: authInfo.access_token,
        refreshToken: authInfo.refresh_token,
      });
      this.$router.push({name: 'publications'});
    } catch (error) {
      this.error = error.response.data.error_description;
    }
    this.loading = false;
  }

}
</script>
