import Services from '../../config/_axios';
import API from '../../api';

const horses = {
    state: () => ({
        names: [],
        colors: [],
        horses: []
    }),
    mutations: {
        SET_NAMES(state, payload) {
            state.names = payload;
        },
        SET_COLORS(state, payload) {
            state.colors = payload;
        },
        SET_HORSES(state, payload) {
            state.horses = payload;
        }
    },
    actions: {
        async getHorseNames({ commit }) {
            try {
                const response = await Services.get(API.names);
                commit('SET_NAMES', response.data);
            } catch (error) {
                console.error('An arror occured during getting data', error);
            }
        },
        async getColors({ commit }) {
            try {
                const response = await Services.get(API.colors);
                commit('SET_COLORS', response.data);
            } catch (error) {
                console.error('An arror occured during getting data', error);
            }
        },
        generateHorseList({ commit, state }) {
            let availableNames = [...state.names];
            let availableColors = [...state.colors];
            const horseList = [];
            for (let i = 0; i < 20; i++) {
                const randomNameIndex = Math.floor(Math.random() * availableNames.length);
                const name = availableNames.splice(randomNameIndex, 1)[0];
                const randomColorIndex = Math.floor(Math.random() * availableColors.length);
                const color = availableColors.splice(randomColorIndex, 1)[0];
                let condition = Math.floor(Math.random() * 100) + 1;
                while (horseList.some(horse => horse.condition === condition)) {
                    condition = Math.floor(Math.random() * 100) + 1;
                }
                horseList.push({
                    name,
                    color,
                    condition
                });
            }
            commit('SET_HORSES', horseList);
        }
    },
    getters: {
        getHorses: (state) => state.horses,
    },
    namespaced: true
};

export default horses;