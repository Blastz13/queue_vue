<template>
  <input type="text"
         :value="modelValue"
         @input="updateInput">
</template>

<script>
export default {
  name: "MyInput",
  props: {
    modelValue: [String, Number]
  },
  methods: {
    updateInput(event){
      this.$emit("update:modelValue", event.target.value);
    }
  }
}
</script>

<style scoped>
input{
  width: 100%;
  height: 40px;
  border-radius: 15px;
  border: none;
  margin-bottom: 15px;
  font-size: 20px;
  text-indent: 15px;
  font-family: Avenir;
  font-weight: bold;
}
</style>