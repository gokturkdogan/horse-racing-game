<template>
  <div class="list">
    <div class="list__header">Horse List (1-20)</div>
    <div class="list__heading">
      <span class="list__text">Name</span>
      <span class="list__text">Condition</span>
      <span class="list__text">Color</span>
    </div>
    <div class="list__body">
      <div v-for="(horse, index) in horses" :key="index" class="list__item">
        <span class="list__text">{{ horse.name }}</span>
        <span class="list__text">{{ horse.condition }}</span>
        <span class="list__text">
          <HorseIcon width="40" :fill="horse.color" />
        </span>
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
    horses: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.list {
  flex: 1;
  background-color: $white;

  &__header {
    text-align: center;
    font-size: $medium;
    padding: 30px 20px;
    color: $white;
    background-color: $grey;
  }

  &__body {
    max-height: calc(100vh - 400px);
    overflow-y: scroll;
  }

  &__heading {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
    background-color: $grey-100;
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-size: $small;

    &:hover {
      background-color: $grey-100;
    }
  }

  &__text {
    width: 100px;
    align-items: center;
  }
}
</style>
    