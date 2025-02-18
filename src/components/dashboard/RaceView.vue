<template>
  <div class="race">
    <div
      v-for="(horse, index) in selectedHorses"
      :key="index"
      class="race__line"
    >
      <span class="race__number">1</span>
      <HorseIcon width="40" :fill="horse.color" />
    </div>
  </div>
</template>
      
<script>
import HorseIcon from "../../assets/icons/horse-race.svg";
export default {
  name: "RaceView",
  components: {
    HorseIcon,
  },
  computed: {
    selectedHorses() {
      return this.$store.getters["race/getSelectedHorses"];
    },
  },
};
</script>
  
<style lang="scss" scoped>
.race {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-right: 3px solid red;

  &__line {
    display: flex;
    height: 100%;
    border-bottom: 2px dotted black;
  }

  &__number {
    color: $white;
    font-size: $large;
    padding: 10px;
    background-color: green;
    display: flex;
    align-items: center;
  }
}
</style>
      