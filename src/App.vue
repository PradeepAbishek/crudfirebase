<template>
  <v-app>
    <v-navigation-drawer
      dark
      app
      :expand-on-hover="sideBar"
      :mini-variant="sideBar"
      :color="color"
      v-if="userLogged"
    >
      <v-list nav>
        <v-list-item-group>
          <v-list-item v-for="(item, i) in menuLists" :key="i" :to="item.path" class="ttu fw5">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app :color="color" dark>
      <h3>Welcome {{ userLogged ? userName: ''}}</h3>
      <v-spacer></v-spacer>
      <v-btn large outlined @click="logout" v-if="userLogged">
        <v-icon class="ml-2">mdi-logout</v-icon>Logout
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-snackbar
        outlined
        :value="snackbar"
        :color="snackbarColor"
        top
        right
        :timeout="snackbarTimeout"
        elevation="12"
      >
        <div class="tc">{{ snackbarText }}</div>
      </v-snackbar>
      <router-view style="height: calc(100vh - 64px)"></router-view>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    sideBar: true,
  }),
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
  },
  computed: {
    menuLists() {
      return this.$store.state.menuLists;
    },
    userLogged() {
      return Object.keys(this.$store.state.userProfile).length > 0
        ? true
        : false;
    },
    color() {
      return this.$store.state.color;
    },
    snackbar() {
      return this.$store.state.snackbar;
    },
    snackbarColor() {
      return this.$store.state.snackbarColor;
    },
    snackbarText() {
      return this.$store.state.snackbarText;
    },
    snackbarTimeout() {
      return this.$store.state.snackbarTimeout;
    },
    userName() {
      return this.$store.state.userProfile.username;
    }
  },
};
</script>
