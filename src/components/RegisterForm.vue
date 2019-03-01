<template>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation=""
    >
        <v-text-field
          v-model="email"
          label="Email"
          required
        ></v-text-field>

        <v-text-field
          v-model="username"
          label="Username"
          required
        ></v-text-field>

        <v-text-field
          v-model="password"
          label="Password"
          required
        ></v-text-field>

        <v-btn
          color="success"
          @click="submit"
        >Login</v-btn>
    </v-form>
</template>
