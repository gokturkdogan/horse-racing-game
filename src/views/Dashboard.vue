<template>
  <Layout>
    <div class="dashboard">
      <HorseList style="flex:1" :horses="horses"/>
      <RaceView style="flex:3" :horses="horses"/>
      <HorseList style="flex:2" :horses="horses"/>
    </div>
  </Layout>
</template>
  
<script>
import Layout from "../layout/Main.vue";
import HorseList from "../components/dashboard/HorseList.vue";
import RaceView from "../components/dashboard/RaceView.vue";

export default {
  name: "Dashboard",
  components: {
    Layout,
    HorseList,
    RaceView
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