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
};
</script>
  
<style lang="scss" scoped>
.notify {
  position: absolute;
  right: 100px;
  top: 100px;
  background-color: $white;
  padding: 20px 100px;

  &.success {
    color: green;
    border-left: 10px solid green;
  }

  &.error {
    color: red;
    border-left: 10px solid red;
  }

  &.warning {
    color: orange;
    border-left: 10px solid orange;
  }
}
</style>
      