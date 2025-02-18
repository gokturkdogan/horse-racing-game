<template>
  <div class="race">
    <div v-if="scheduleReady" class="race__acitons">
      <button class="race__button" @click="start">
        Start Round {{ activeRound }}
      </button>
      <button class="race__button -next" @click="next">Next Round</button>
    </div>
    <div v-for="(horse, index) in roundHorses" :key="index" class="race__line">
      <span class="race__number">{{ index + 1 }}</span>
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
      isMoved: false, // Başlangıçta atların hareket etmesi engelleniyor
      finishedHorses: 0,
      raceFinished: false,
      raceOrder: [],
      raceWidth: 0, // Tarayıcı genişliği
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
    start() {
      this.raceFinished = false;
      this.isMoved = true;
      this.finishedHorses = 0;
      this.raceOrder = [];
    },
    getHorseSpeed(horse) {
      const condition = horse.condition;
      const minSpeed = 1;
      const maxSpeed = 3;
      const speed = (maxSpeed - minSpeed) * (1 - condition / 100) + minSpeed;
      const moveDistance = (this.raceWidth / 100) * 90;
      const transformValue = this.isMoved
        ? `translateX(${moveDistance}px)`
        : `translateX(0)`;

      return {
        transitionDuration: `${speed}s`,
        transform: transformValue,
      };
    },
    onTransitionEnd(horse, index) {
      if (!this.raceFinished) {
        this.raceOrder.push({ name: horse.name, color: horse.color, index });
      }
      this.finishedHorses++;
      if (this.finishedHorses === this.roundHorses.length) {
        this.raceFinished = true;
        this.setRaceOrder();
      }
    },
    setRaceOrder() {
      this.$store.dispatch("race/setRaceOrder", this.raceOrder);
      console.log(this.raceOrder);
      this.$store.commit("SET_NOTIFY", {
        message: `${this.activeRound}. Round Tamamlandı`,
        isShow: true,
        type: "success",
      });
    },
    async next() {
      this.isMoved = false;
      await this.$store.commit("race/SET_ACTIVE_ROUND", this.activeRound + 1);
      this.$store.commit("SET_NOTIFY", { isShow: false });
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

  &__acitons {
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
