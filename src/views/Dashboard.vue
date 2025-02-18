<template>
  <Layout>
    <div class="dashboard">
        <HorseList />
    </div>
  </Layout>
</template>
  
<script>
import Layout from '../layout/Main.vue';
import HorseList from '../components/dashboard/HorseList.vue';

export default {
  name: "Dashboard",
  components: {
    Layout,
    HorseList
  }
};
</script>