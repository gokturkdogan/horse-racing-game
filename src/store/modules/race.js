const horses = {
    state: () => ({
        selectedHorses: [],
        races: [],
        titles: ['1ST Lap - 1200m', '2ND Lap - 1400m', '3RD Lap - 1600m', '4TH Lap - 1800m', '5TH Lap - 2000m', '6TH Lap - 2200m'],
        distances: [1200, 1400, 1600, 1800, 2000, 2200]
    }),
    mutations: {
        SET_SELECTED_HORSES(state, payload) {
            state.selectedHorses = payload;
        },
        SET_RACES(state, payload) {
            state.races = payload;
        }
    },
    actions: {
        selectHorses({ rootState }) {
            const horses = rootState.horses?.horses || [];
            if (horses.length === 0) return [];
            return [...horses].sort(() => Math.random() - 0.5).slice(0, 10);
        },
        generateSchedule({ state, commit, dispatch }) {
            const races = state.titles.map((title, index) => {
                return {
                    title,
                    distance: state.distances[index],
                    horses: dispatch('selectHorses')
                };
            });
            Promise.all(races.map(async (race) => {
                race.horses = await race.horses;
                return race;
            })).then((updatedRaces) => {
                console.log(updatedRaces);
                commit('SET_RACES', updatedRaces);
            });
        }
    },
    getters: {
        getSelectedHorses: (state) => state.selectedHorses,
        getRaces: (state) => state.races
    },
    namespaced: true
};

export default horses;
