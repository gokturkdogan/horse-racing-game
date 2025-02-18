<template>
  <div class="race">
    <div class="race__acitons">
      <button class="race__button" @click="start">
        Start Round {{ activeRound }}
      </button>
      <button class="race__button -next" @click="next">next</button>
    </div>
    <div v-for="(horse, index) in roundHorses" :key="index" class="race__line">
      <div
        class="race__horse"
        :class="{ '-moved': isMoved, '-finished': raceFinished }"
        :style="getHorseSpeed(horse)"
        @transitionend="onTransitionEnd(horse, index)"
      >
        <HorseIcon width="40" :fill="horse.color" />
      </div>
    </div>
  </div>
</template>

<script>
import HorseIcon from "../../assets/icons/horse-race.svg";

export default {
  data() {
    return {
      isMoved: false,
      finishedHorses: 0,
      raceFinished: false,
      raceOrder: [],
    };
  },
  components: {
    HorseIcon,
  },
  computed: {
    roundHorses() {
      const races = this.$store.getters["race/getRaces"];
      return races?.[this.activeRound - 1]?.horses || [];
    },
    activeRound() {
      return this.$store.getters["race/getActiveRound"];
    },
  },
  methods: {
    async start() {
      this.isMoved = true;
      this.finishedHorses = 0;
      this.raceOrder = [];
    },
    onTransitionEnd(horse, index) {
      this.raceOrder.push({ horse, index });
      this.finishedHorses++;
      if (this.finishedHorses === this.roundHorses.length) {
        //this.raceFinished = true;
        this.setRaceOrder();
      }
    },
    setRaceOrder() {
      this.$store.dispatch("race/setRaceOrder", this.raceOrder);
    },
    getHorseSpeed(horse) {
      const condition = horse.condition;
      const minSpeed = 1;
      const maxSpeed = 3;
      const speed = (maxSpeed - minSpeed) * (condition / 100) + minSpeed;
      return {
        transitionDuration: `${speed}s`,
      };
    },
    async next() {
      this.isMoved = false;
      await this.$store.commit('race/SET_ACTIVE_ROUND', this.activeRound + 1);
    },
  },
};
</script>

<style lang="scss" scoped>
.race {
  border-right: 3px solid red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__acitons {
    display: flex;
    justify-content: center;
  }

  &__button {
    background-color: green;
    padding: 10px 20px;
    border-radius: 15px;
    color: $white;

    &.-next {
      background-color: red;
      margin-left: 10px;
    }
  }

  &__line {
    border-bottom: 2px dotted black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__horse {
    position: relative;
    transition: transform ease;

    &.-moved {
      transform: translateX(500px);
    }

    &.-finished {
      transition: none;
    }
  }
}
</style>
