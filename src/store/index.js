import { createStore } from 'vuex';
import horses from './modules/horses';
import race from './modules/race';

const store = createStore({
  state: {
    notify: {
      message: '',
      isShow: false,
      type: ''
    }
  },
  mutations: {
    SET_NOTIFY(state, payload) {
      state.notify = payload
    }
  },
  getters: {
    getNotify(state) {
      return state.notify
    }
  },
  modules: {
    horses: horses,
    race: race
  }
})

export default store;