<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation=""
    >
        <v-text-field
          v-model="input.username"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="input.password"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          color="success"
          @click="login"
        >Login</v-btn>
    </v-form>
</template>

<script lang="ts">
import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import { authorizeUser } from '@/api';
import { AuthorizeUserInterface } from '@/interfaces';

@Component
export default class LoginForm extends Vue {
    input: AuthorizeUserInterface = {
      username: "",
      password: "",
    }

    login () {
      const response = authorizeUser(this.input);
      console.log(response);
    }
}
</script>
