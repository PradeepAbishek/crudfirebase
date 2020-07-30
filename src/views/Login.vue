<template>
  <v-row align="center" justify="center">
    <v-col cols="12" sm="6" md="4" lg="3">
      <v-card elevation="12">
        <v-card-title>
          <v-sheet
            dark
            elevation="10"
            class="w-100 tc headingTop ttu"
            :color="color"
          >{{ newUser ? 'Sign up' : 'Login'}}</v-sheet>
          <div class="w-100 tc"></div>
        </v-card-title>
        <v-card-text v-if="!newUser">
          <v-text-field label="Email" type="email" v-model="loginForm.email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="loginForm.password"></v-text-field>
        </v-card-text>
        <v-card-text v-else>
          <v-text-field label="Name" type="text" v-model="signupForm.name"></v-text-field>
          <v-text-field label="Email" type="email" v-model="signupForm.email"></v-text-field>
          <v-text-field label="Password" type="password" v-model="signupForm.password"></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-col cols="12">
            <div v-if="!newUser">
              <v-btn dark block large color="success" @click="login">
                <v-icon class="mr-2">mdi-login</v-icon>Login
              </v-btn>
              <v-btn dark block large color="indigo" @click="newUser = !newUser" class="my-2">
                <v-icon class="mr-2">mdi-account</v-icon>New User ?
              </v-btn>
            </div>
            <div v-else>
              <v-btn dark block large color="primary" @click="signup">
                <v-icon class="mr-2">mdi-account-plus</v-icon>Sign up
              </v-btn>
              <h6 class="tc">-or-</h6>
              <v-btn dark block large color="red" @click="googleSignup">
                <v-icon class="mr-2">mdi-google</v-icon>Sign up with Google
              </v-btn>
              <div class="ma-2"></div>
              <v-btn dark block large color="success" @click="newUser = !newUser">
                <v-icon class="mr-2">mdi-chevron-left</v-icon>Login
              </v-btn>
            </div>
          </v-col>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
<script>
export default {
  name: "Login",
  data: () => ({
    newUser: true,
    loginForm: {
      email: "",
      password: "",
    },
    signupForm: {
      name: "",
      password: "",
      email: "",
    },
  }),
  methods: {
    login() {
      this.$store.dispatch("login", {
        email: this.loginForm.email,
        password: this.loginForm.password,
      });
    },
    signup() {
      this.$store.dispatch("signup", {
        email: this.signupForm.email,
        password: this.signupForm.password,
        name: this.signupForm.name,
      });
    },
    googleSignup() {
      this.$store.dispatch("googleSignUp");
    },
  },
  computed: {
    color() {
      return this.$store.state.color;
    }
  }
};
</script>