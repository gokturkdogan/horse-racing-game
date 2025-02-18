<template>
  <Layout>
    <div class="dashboard">
      <HorseList :horses="horses"/>
      <HorseList style="flex:3" :horses="horses"/>
      <HorseList :horses="horses"/>
    </div>
  </Layout>
</template>
  
<script>
import Layout from "../layout/Main.vue";
import HorseList from "../components/dashboard/HorseList.vue";

export default {
  name: "Dashboard",
  components: {
    Layout,
    HorseList
  },
  async created() {
    await this.$store.dispatch("horses/getHorseNames");
    await this.$store.dispatch("horses/getColors");
    this.$store.dispatch("horses/generateHorseList");
  },
  computed: {
   horses() {
    return this.$store.getters['horses/getHorses'];
   }
  }
};
</script>