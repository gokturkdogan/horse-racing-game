<template>
  <div class="header">
    <div class="header__title">Horse Racing</div>
    <div class="header__actions">
      <button @click="generate()" class="header__button">Generate Program</button>
    </div>
  </div>
</template>
    
<script>
export default {
  name: "Header",
  methods: {
    generate() {
      this.$store.dispatch('race/generateSchedule');
    },
    start() {
      this.$store.dispatch('race/startRace');
    }
  }
};
</script>

<style lang="scss" scoped>
.header {
  background-color: $header;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 100px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  &__title {
    font-size: $x-large;
    letter-spacing: 1px;
    font-weight: $semi-bold;
  }

  &__acitons {
    display: flex;
    align-items: center;
  }

  &__button {
    color: $white;
    padding: 10px 20px;
    background-color: $orange;
    border-radius: 10px;
    transition: 0.5s;
    font-size: $large;

    &:hover {
      background-color: $red;
    }

    &.-start {
      margin-left: 25px;
      background-color: $green;
    }
  }
}
</style>
    