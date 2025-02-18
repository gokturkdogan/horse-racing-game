const horses = {
    state: () => ({
        programReady: false,
        selectedHorses: [],
        races: [],
        titles: [
            '1ST Lap - 1200m',
            '2ND Lap - 1400m',
            '3RD Lap - 1600m',
            '4TH Lap - 1800m',
            '5TH Lap - 2000m',
            '6TH Lap - 2200m'
        ],
        distances: [1200, 1400, 1600, 1800, 2000, 2200],
        activeRound: 1
    }),
    mutations: {
        SET_SELECTED_HORSES(state, payload) {
            state.selectedHorses = payload;
        },
        SET_RACES(state, payload) {
            state.races = payload;
        },
        SET_ACTIVE_ROUND(state, payload) {
            state.activeRound = payload;
        },
        SET_PROGRAM_READY(state, payload) {
            state.programReady = payload;
        }
    },
    actions: {
        selectHorses({ rootState }) {
            const horses = rootState.horses?.horses || [];
            if (horses.length === 0) return [];
            return [...horses].sort(() => Math.random() - 0.5).slice(0, 10);
        },
        async generateSchedule({ state, commit, dispatch }) {
            const races = state.titles.map((title, index) => {
                return {
                    title,
                    distance: state.distances[index],
                    horses: dispatch('selectHorses')
                };
            });
            const updatedRaces = await Promise.all(
                races.map(async (race) => {
                    race.horses = await race.horses;
                    return race;
                })
            );
            await commit('SET_RACES', updatedRaces);
            commit('SET_PROGRAM_READY', true);
        },
        setRaceOrder({ state, commit }, leaderboard) {
            const activeRoundIndex = state.activeRound - 1;
            const updatedRaces = [...state.races];
            updatedRaces[activeRoundIndex] = {
                ...updatedRaces[activeRoundIndex],
                leaderboard: leaderboard
            };
            commit('SET_RACES', updatedRaces);
        }
    },
    getters: {
        getSelectedHorses: (state) => state.selectedHorses,
        getRaces: (state) => state.races,
        getActiveRound: (state) => state.activeRound,
        getProgramReady: (state) => state.programReady
    },
    namespaced: true
};

export default horses;
