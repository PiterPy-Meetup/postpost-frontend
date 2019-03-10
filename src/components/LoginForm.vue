<docs>
Use between two v-spacer for looking good.

Receive current state props: `error` and `loading`.

Emit `change` event when button was clicked.
</docs>

<template>
  <v-card
    class="pa-4 login-form text-xs-center"
  >
    <v-form
      @submit.prevent="submitLoginForm"
    >
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
        type="submit"
        :loading="loading"
        :disabled="loading"
      >Login</v-btn>

      <v-alert
        type="error"
        :value="error"
        :outline="true"
      >
        {{ error }}
      </v-alert>
    </v-form>
  </v-card>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component, Prop } from 'vue-property-decorator';


@Component
export default class LoginForm extends Vue {
  @Prop({
    type: Boolean,
    default: false,
  })
  public loading!: boolean;
  @Prop({
    type: String,
    default: null,
  })
  public error?: string | null;

  public username: string = '';
  public password: string = '';

  public submitLoginForm() {
    this.$emit('change', this.username, this.password);
  }
}
</script>

<style>
  .login-form {
    max-width: 600px;
  }
</style>
