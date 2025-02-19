<template>
  <div class="modal">
    <div class="modal__overlay">
      <div class="modal__wrapper">
        <div class="modal__header">
            <XIcon class="modal__icon" width="15" @click="$emit('close-modal')"/>
        </div>
        <div class="modal__body">
          <slot></slot>
        </div>
      </div>
    </div>
  </div>
</template>  
        
<script>
import XIcon from '../../assets/icons/x-mark.svg';
export default {
  name: "Modal",
  components: {
    XIcon
  }
};
</script>
    
<style lang="scss" scoped>
.modal {
    &__overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0, 0, 0, 0.452);
        height: 100vh;
    }

    &__wrapper {
        position: absolute;
        z-index: 1;
        top: 16%;
        left: 50%;
        transform: translateX(-50%);
        background-color: $white;
    }

    &__header {
        padding: 10px;
        display: flex;
        justify-content: flex-end;
    }

    &__icon {
        cursor: pointer;

        &:hover {
            fill: $grey;
        }
    }

    &__body {
        padding: 0 30px;
    }
}
</style>
        