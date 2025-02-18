const horses = {
  state: () => ({
    selectedHorses: []
  }),
  mutations: {
    SET_SELECTED_HORSES(state, payload) {
        state.selectedHorses = payload;
    }
  },
  actions: {
    selectHorses({ rootState, commit }) {
      const horses = [...rootState.horses.horses];
      const selectedHorses = horses.sort(() => Math.random() - 0.5).slice(0, 10);
      commit('SET_SELECTED_HORSES', selectedHorses);
    }
  },
  getters: {
    getSelectedHorses: (state) => state.selectedHorses,
  },
  namespaced: true
};

export default horses;
