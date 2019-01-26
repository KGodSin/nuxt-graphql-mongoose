import axios from "axios";
import query from "../queries/index";

export const state = () => ({
  user: null
});

export const mutations = {
  SET_USER: function (state, user) {
    state.user = user;
  }
};

export const actions = {
  // nuxtServerInit is called by Nuxt.js before server-rendering every page
  nuxtServerInit({ commit }, { req }) {
    if (req.session && req.session.user) {
      commit('SET_USER', req.session.user)
    }
  },
  async login({ commit }, { email, password }) {
    try {
      const data = await axios.post(query.URL, {
        query: query.LOGIN,
        variables: {
          email: email,
          password: password
        }
      });
      commit('SET_USER', data)
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Bad credentials')
      }
      throw error
    } 
  },

  async logout({ commit }) {
    await axios.post('/api/logout')
    commit('SET_USER', null)
  }
}
