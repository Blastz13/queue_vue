import { createStore } from 'vuex'
import axios from "axios";


export default createStore({
  state: {
    token: localStorage.getItem("token") || null
  },
  getters: {
    getToken: (state) => localStorage.getItem("token"),
  },
  mutations: {
    setToken(state, payload){
      state.token = payload;
      localStorage.setItem('token', payload);
    },
    deleteToken(state){
      state.token = null;
      localStorage.removeItem("token");
    }
  },
  actions: {
    onSignUp({commit}, {username, password}){
      axios.post("http://127.0.0.1:8000/auth/signup", {username: username, password: password}).then(r => {
        commit('setToken', r.data.access_token);
      });
    },
    onLogin({commit}, {username, password}){
      axios.post("http://127.0.0.1:8000/auth/login", {username: username, password: password}).then(r => {
            commit('setToken', r.data.access_token);
          });
    },
    onLogout({commit}){
      commit('deleteToken');
    }
  },
  modules: {
  }
})
