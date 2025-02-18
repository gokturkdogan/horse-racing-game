<template>
  <div class="schedule">
    <div class="schedule__header">Program</div>
    <div class="schedule__body">
      <div class="schedule__item" v-for="(race, index) in races" :key="index">
        <div class="schedule__heading">
          {{ race.title }}
        </div>
        <div class="schedule__content" v-for="(horse, index) in race.horses" :key="index">
          {{ horse.name }}
        </div>
      </div>
    </div>
  </div>
</template>
      
  <script>
import HorseIcon from "../../assets/icons/horse.svg";
export default {
  name: "HorseList",
  components: {
    HorseIcon,
  },
  props: {
    races: {
      type: Array,
      required: true,
    },
  },
};
</script>
  
<style lang="scss" scoped>
.schedule {
  flex: 1;
  background-color: $white;

  &__header {
    text-align: center;
    font-size: $medium;
    padding: 30px 20px;
    color: $white;
    background-color: rgb(73, 73, 73);
  }

  &__body {
    max-height: calc(100vh - 350px);
    overflow-y: scroll;
  }

  &__heading {
    background-color: green;
    text-align: center;
    color: $white;
    padding: 10px;
  }

  &__content {
    padding: 10px;

    &:hover {
      color: $white;
      background-color: green;
    }
  }
}
</style>
      