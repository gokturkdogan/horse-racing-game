<template>
  <div v-if="notify.isShow" class="notify" :class="notify.type">
    {{ notify.message }}
  </div>
</template>  
      
<script>
export default {
  name: "Notify",
  computed: {
    notify() {
      return this.$store.getters["getNotify"];
    },
  },
  watch: {
    "notify.isShow"(newVal) {
      if (newVal) {
        setTimeout(() => {
          this.$store.commit("SET_NOTIFY", { isShow: false });
        }, 2000);
      }
    },
  },
};
</script>
  
<style lang="scss" scoped>
.notify {
  position: fixed;
  right: 100px;
  top: 100px;
  background-color: $white;
  padding: 20px 100px;
  z-index: 100;

  @include medium() {
    flex-direction: column;
    right: 20px;
    top: 20px;
    padding: 20px;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  }

  &.success {
    color: $green;
    border-left: 10px solid $green;
  }

  &.error {
    color: $red;
    border-left: 10px solid $red;
  }

  &.warning {
    color: $orange;
    border-left: 10px solid $orange;
  }
}
</style>
      