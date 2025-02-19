<template>
  <Modal v-if="statsModal.isShow">
    <div class="stats">
      <HorseIcon :fill="statsModal.horse.color"/>
      <div class="stats__info">
        <div class="stats__infoLine">
          <span class="stats__infoName">Name:</span>
          <span class="stats__infoValue">{{ statsModal.horse.name }}</span>
        </div>
        <div class="stats__infoLine">
          <span class="stats__infoName">Condition:</span>
          <span class="stats__infoValue">{{ statsModal.horse.condition }}</span>
        </div>
        <div class="stats__infoLine">
          <span class="stats__infoName">Finish Time:</span>
          <span class="stats__infoValue">{{ finishTime }}</span>
        </div>
      </div>
    </div>
  </Modal>
</template>
          
<script>
import Modal from "../base/Modal.vue";
import HorseIcon from "../../assets/icons/horse.svg";
import helpers from "../../mixins/helpers";
export default {
  name: "StatsModal",
  components: {
    Modal,
    HorseIcon
  },
  mixins: [helpers],
  computed: {
    statsModal() {
        return this.$store.getters['race/getStatsModal'];
    },
    finishTime() {
      return this.roundValue(this.statsModal.horse.finishTime, 2);
    }
  }
};
</script>

<style lang="scss" scoped>
.stats {
  padding: 20px 20px;
  min-width: 300px;
  &__info {
    margin-top: 30px;
  }

  &__infoLine {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  &__infoName {
    font-weight: $bold;
    font-size: $large;
  }

  &__infoValue {
    font-weight: $regular;
    font-size: $medium;
  }
}
</style>
