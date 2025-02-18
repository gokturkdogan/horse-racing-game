<template>
  <div class="layout">
    <Header />
    <slot></slot>
  </div>
</template>
  
<script>
import Header from '../components/base/Header.vue';
export default {
  name: "MainLayout",
  components: {
    Header
  }
};
</script>
  