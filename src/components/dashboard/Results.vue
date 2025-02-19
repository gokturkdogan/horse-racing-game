<template>
  <div class="schedule">
    <div class="schedule__header">Results</div>
    <div class="schedule__body">
      <div class="schedule__item" v-for="(race, index) in races" :key="index">
        <div v-if="race.leaderboard" class="schedule__heading">
          {{ race.title }}
        </div>
        <div @click="openStats(horse)" class="schedule__content -result" v-for="(horse, index) in race.leaderboard" :key="index">
          <span class="schedule__name"> # {{ index + 1 }} </span>
          <span class="schedule__name">
            {{ horse.name }}
          </span>
          <span class="schedule__name">
            <HorseIcon width="25" :fill="horse.color" />
          </span>
        </div>
      </div>
    </div>
    <StatsModal @close-modal="closeStats"/>
  </div>
</template>
        
<script>
import HorseIcon from "../../assets/icons/horse.svg";
import StatsModal from "./StatsModal.vue";
import helpers from "../../mixins/helpers";
export default {
  name: "HorseList",
  components: {
    HorseIcon,
    StatsModal
  },
  props: {
    races: {
      type: Array,
      required: true,
    },
  },
  mixins: [helpers],
  methods: {
    openStats(horse) {
      this.scrollToTop();
      this.toggleScroll();
      this.$store.commit('race/SET_STATS_MODAL', { isShow: true, horse: horse });
    },
    closeStats() {
      this.toggleScroll(false);
      this.$store.commit('race/SET_STATS_MODAL', { isShow: false, horse: null });
    }
  }
};
</script>
        