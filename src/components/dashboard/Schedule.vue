<template>
  <div class="schedule">
    <div class="schedule__header">Program</div>
    <div class="schedule__body">
      <div class="schedule__item" v-for="(race, index) in races" :key="index">
        <div class="schedule__heading">
          {{ race.title }}
        </div>
        <div class="schedule__content" v-for="(horse, index) in race.horses" :key="index">
          <span class="schedule__name">
            {{ horse.name }}
          </span>
          <span class="schedule__name">
            <HorseIcon width="25" :fill="horse.color"/>
          </span>
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
      