const horses = {
    state: () => ({
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
        activeRound: 1,
        scheduleReady: false,
        isHorsesMoved: false,
        isActiveRoundFinished: false,
        roundInProccess: false,
        statsModal: {
            isShow: false,
            horse: {}
        }
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
        SET_SCHEDULE_READY(state, payload) {
            state.scheduleReady = payload;
        },
        SET_IS_MOVED(state, payload) {
            state.isHorsesMoved = payload;
        },
        SET_ROUND_IN_PROCCESS(state, payload) {
            state.roundInProccess = payload;
        },
        SET_STATS_MODAL(state, payload) {
            state.statsModal = {
                ...state.statsModal,
                ...payload
            }
        }
    },
    actions: {
        selectHorses({ rootState }) {
            const horses = rootState.horses?.horses || [];
            if (horses.length === 0) return [];
            return [...horses].sort(() => Math.random() - 0.5).slice(0, 10);
        },
        async generateSchedule({ state, commit, dispatch }) {
            if (state.roundInProccess) {
                commit("SET_NOTIFY", { message: "Please Wait", isShow: true, type: "warning" }, {root: true});
                return false;
            }
            await commit('SET_IS_MOVED', false);
            await commit("SET_ACTIVE_ROUND", 1);
            const races = state.titles.map((title, index) => {
                return {
                    title,
                    distance: state.distances[index],
                    horses: dispatch('selectHorses'),
                    completed: false
                };
            });
            const updatedRaces = await Promise.all(
                races.map(async (race) => {
                    race.horses = await race.horses;
                    return race;
                })
            );
            await commit('SET_RACES', updatedRaces);
            commit('SET_SCHEDULE_READY', true);
        },
        startRound({ commit, state }) {
            let activeIndex = state.activeRound - 1;
            if (state.races[activeIndex]?.completed) {
                commit("SET_NOTIFY", { message: "Please Next Round", isShow: true, type: "warning" }, {root: true});
                return false;
            }
            if (state.roundInProccess) {
                commit("SET_NOTIFY", { message: "Please Wait", isShow: true, type: "warning" }, {root: true});
                return false;
            }
            commit('SET_IS_MOVED', true);
            commit('SET_ROUND_IN_PROCCESS', true);
            return true;
        },
        async finishRound({ state, commit }, leaderboard) {
            const activeRoundIndex = state.activeRound - 1;
            const updatedRaces = [...state.races];
            updatedRaces[activeRoundIndex] = {
                ...updatedRaces[activeRoundIndex],
                leaderboard: leaderboard,
                completed: true
            };
            await commit('SET_RACES', updatedRaces);
            commit("SET_NOTIFY", { message: `Round ${state.activeRound} Completed`, isShow: true, type: "success" }, {root: true});
            commit('SET_ROUND_IN_PROCCESS', false);
        },
        async nextRound({ commit, state }) {
            let activeIndex = state.activeRound - 1;
            if (!state.races[activeIndex]?.completed) {
                commit("SET_NOTIFY", { message: `Please Complete Round ${state.activeRound}`, isShow: true, type: "warning" }, {root: true});
                return;
            }
            commit('SET_IS_MOVED', false);
            commit('SET_ACTIVE_ROUND', state.activeRound + 1);
        }
    },
    getters: {
        getSelectedHorses: (state) => state.selectedHorses,
        getRaces: (state) => state.races,
        getActiveRound: (state) => state.activeRound,
        getScheduleReady: (state) => state.scheduleReady,
        getIsHorsesMoved: (state) => state.isHorsesMoved,
        getRoundInProccess: (state) => state.roundInProccess,
        getActiveRoundDistance: (state) => {
            const activeRoundIndex = state.activeRound - 1;
            return state.races[activeRoundIndex]?.distance
        },
        getStatsModal: (state) => state.statsModal,
    },
    namespaced: true
};

export default horses;
