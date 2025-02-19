<template>
  <div class="race">
    <div v-if="scheduleReady" class="race__actions">
      <button class="race__button" @click="start">
        Start Round {{ activeRound }}
      </button>
      <button class="race__button -next" @click="next">Next Round</button>
    </div>
    <div v-for="(horse, index) in roundHorses" :key="index" class="race__line">
      <span class="race__number">{{ index + 1 }}</span>
      <div
        class="race__horse"
        :class="{ '-moved': isMoved, '-finished': !roundInProccess }"
        :style="getPosition(horse)"
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
      finishedHorses: 0,
      raceOrder: [],
      raceWidth: 0,
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
    scheduleReady() {
      return this.$store.getters["race/getScheduleReady"];
    },
    isMoved() {
      return this.$store.getters["race/getIsHorsesMoved"];
    },
    roundInProccess() {
      return this.$store.getters["race/getRoundInProccess"];
    },
    activeRoundDistance() {
      return this.$store.getters["race/getActiveRoundDistance"];
    },
  },
  mounted() {
    this.getRaceWidth();
    window.addEventListener("resize", this.getRaceWidth);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.getRaceWidth);
  },
  methods: {
    getRaceWidth() {
      const raceElement = document.querySelector(".race");
      if (raceElement) {
        this.raceWidth = raceElement.offsetWidth;
      }
    },
    async start() {
      const result = await this.$store.dispatch("race/startRound");
      if (result === false) return;
      this.resetRoundData();
    },
    resetRoundData() {
      this.finishedHorses = 0;
      this.raceOrder = [];
    },
    getPosition(horse) {
      const { condition } = horse;
      const time = this.calculateFinishTime(condition);
      const transformValue = this.isMoved
        ? `translateX(${(this.raceWidth / 100) * 90}px)`
        : `translateX(0)`;
      return {
        transitionDuration: `${time}s`,
        transform: transformValue,
      };
    },
    calculateFinishTime(condition) {
      const minSpeed = 1;
      const maxSpeed = 3;
      const adjustedSpeed = (maxSpeed - minSpeed) * (1 - condition / 100) + minSpeed;
      const distanceImpact = this.activeRoundDistance;
      const finalSpeed = adjustedSpeed * (1 + distanceImpact / 1000);
      return finalSpeed / 0.7;
    },
    onTransitionEnd(horse, index) {
      if (this.roundInProccess) {
        const finishTime = this.calculateFinishTime(horse.condition);
        this.raceOrder.push({
          name: horse.name,
          color: horse.color,
          condition: horse.condition,
          index,
          finishTime,
        });
      }
      this.finishedHorses++;
      if (this.finishedHorses === this.roundHorses.length) {
        this.$store.dispatch("race/finishRound", this.raceOrder);
      }
    },
    next() {
      this.$store.dispatch("race/nextRound");
    },
  },
};
</script>

<style lang="scss" scoped>
.race {
  border-right: 3px solid $red;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  &__actions {
    display: flex;
    justify-content: center;
  }

  &__button {
    background-color: $green;
    padding: 10px 20px;
    border-radius: 15px;
    color: $white;

    &.-next {
      background-color: $red;
      margin-left: 10px;
    }
  }

  &__line {
    border-bottom: 2px dotted $black;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__number {
    background-color: $green;
    color: $white;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__horse {
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
