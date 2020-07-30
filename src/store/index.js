import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router/index'
import { firebase, auth, usersCollection } from '../firebase'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    color: "#5f0f40",
    userProfile: {},
    menuLists: [
      {
        icon: 'mdi-view-grid',
        text: 'Crud Operations',
        path: '/crud',
      },
    ],
    snackbar: false,
    snackbarColor: '',
    snackbarText: '',
    snackbarTimeout: '5000'
  },
  mutations: {
    setUserProfile(state, val) {
      state.userProfile = val
    },
    showSnackbar(state, val) {
      state.snackbar = true;
      state.snackbarText = val.msg;
      state.snackbarColor = val.value ? 'green' : 'red';
      setTimeout(() => {
        state.snackbar = false;
      }, state.snackbarTimeout)
    }
  },
  actions: {
    async login({ dispatch }, form) {
      var snackbarData = new Object();
      // sign user in
      const user = await auth.signInWithEmailAndPassword(form.email, form.password)
        .catch((err) => { snackbarData.value = false, snackbarData.msg = err.message, dispatch('snackbar', snackbarData) })

      // fetch user profile and set in state
      if (user) {
        snackbarData.value = true;
        snackbarData.msg = 'Logged in successfully';
        dispatch('fetchUserProfile', user.user);
        dispatch('snackbar', snackbarData);
      }

    },
    async fetchUserProfile({ commit }, user) {
      // fetch user profile
      const userProfile = await usersCollection.doc(user.uid).get()

      // set user profile in state
      commit('setUserProfile', userProfile.data())

      // change route to dashboard
      router.push("/crud").catch(err => { })
    },
    async signup({ dispatch }, form) {
      // sign user up
      const { user } = await auth.createUserWithEmailAndPassword(form.email, form.password)
        .then((d) => console.log(d, 'dsd'))
        .catch((err) => console.log(err, 'err'))
      // create user profile object in userCollections
      await usersCollection.doc(user.uid).set({
        username: form.name,
      })

      // fetch user profile and set in state
      dispatch('fetchUserProfile', user)
    },
    async logout({ dispatch, commit }) {
      var snackbarData = new Object();
      snackbarData.value = true;
      snackbarData.msg = 'Logged out successfully';
      await auth.signOut()

      // clear userProfile and redirect to /login
      commit('setUserProfile', {})
      dispatch('snackbar', snackbarData);
      router.push("/").catch(err => { })
    },
    async googleSignUp({ dispatch }) {
      var provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(function (result) {
          console.log(result);
          // This gives you a Google Access Token. You can use it to access the Google API.
          var token = result.credential.accessToken;
          console.log(token);
          // The signed-in user info.
          var user = result.user;
          console.log(user);
          // ...
        })
        .catch(function (error) {
          console.log(error);
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // The email of the user's account used.
          var email = error.email;
          // The firebase.auth.AuthCredential type that was used.
          var credential = error.credential;
          // ...
        });
    },
    snackbar({ commit }, data) {
      commit("showSnackbar", data);
    },
  },
  modules: {
  }
})
