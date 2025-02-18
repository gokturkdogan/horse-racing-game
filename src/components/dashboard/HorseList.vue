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
        <span class="list__text">{{ horse.color }}</span>
      </div>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "HorseList",
  data() {
    return {
      horses: [
        { name: "Bolt", condition: 64, color: "white" },
        { name: "Scout", condition: 84, color: "green" },
        { name: "Bolt", condition: 72, color: "red" },
        { name: "Scout", condition: 72, color: "purple" },
        { name: "Bolt", condition: 51, color: "yellow" },
        { name: "Titan", condition: 74, color: "gold" },
        { name: "Titan", condition: 84, color: "green" },
        { name: "Max", condition: 83, color: "gold" },
        { name: "Whisper", condition: 84, color: "red" },
        { name: "King", condition: 83, color: "gray" },
        { name: "Buck", condition: 64, color: "white" },
        { name: "Flash", condition: 64, color: "red" },
        { name: "Shadow", condition: 51, color: "yellow" },
        { name: "Duke", condition: 83, color: "yellow" },
        { name: "Bolt", condition: 74, color: "green" },
        { name: "Bolt", condition: 74, color: "gold" },
        { name: "Titan", condition: 74, color: "white" },
        { name: "Rocket", condition: 51, color: "gold" },
        { name: "Dusty", condition: 75, color: "black" },
        { name: "Rex", condition: 72, color: "gray" },
      ],
    };
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
    background-color: rgb(73, 73, 73);
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
    background-color: rgb(158, 158, 158);
  }

  &__item {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    font-size: $small;

    &:hover {
      background-color: rgb(158, 158, 158);
    }
  }

  &__text {
    width: 100px;
    align-items: center;
  }
}
</style>
    