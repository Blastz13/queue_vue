<template>
  <div class="dialog" v-if="isShowDialog === true" @click="hideWindow">
    <div @click.stop class="dialog__content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "DialogWindow",
  props: {
    isShowDialog: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    hideWindow(){
      this.$emit('update:isShowDialog', false);
    }
  }
}
</script>

<style scoped>
.dialog{
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background: rgba(0,0,0,0.5);
  position: fixed;
  display: flex;
}
.dialog__content{
  margin: auto;
  background: white;
  border-radius: 16px;
  max-width: 700px;
  padding: 15px;
}
</style>
