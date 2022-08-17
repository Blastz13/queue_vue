<template>
  <div class="wrap_message_block">
    <div :class="{my_message_block: item.is_own_message, message_block: item.is_own_message == false}">
      <p style="margin-bottom: 2px;">{{ item.username }}</p>
      <p style="font-weight: 700; font-size: 20px;">{{ item.message }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "ItemMessageChat",
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.message_block {
  background: rgb(169,255,138);
  background: -moz-linear-gradient(234deg, rgb(138, 255, 214) 0%, rgb(245, 188, 37) 100%);
  background: -webkit-linear-gradient(234deg, rgb(138, 255, 214) 0%, rgb(245, 188, 37) 100%);
  background: linear-gradient(234deg, rgb(138, 255, 214) 0%, rgb(245, 188, 37) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#a9ff8a",endColorstr="#f7b400",GradientType=1);
  margin-bottom: 10px;
  min-width: 150px;
  max-width: 330px;
  word-wrap: normal;
  padding: 15px;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 30px -20px rgba(34, 60, 80, 0.7);
  -moz-box-shadow: 0px 0px 30px -20px rgba(34, 60, 80, 0.7);
  box-shadow: 0px 0px 30px -20px rgba(34, 60, 80, 0.7);
}

.my_message_block {
  background: rgb(213,89,230);
  background: -moz-linear-gradient(204deg, rgba(66,255,204,1) 10%, rgba(182,245,239,1) 50%, rgba(213,89,230,1) 100%);
  background: -webkit-linear-gradient(204deg, rgba(66,255,204,1) 10%, rgba(182,245,239,1) 50%, rgba(213,89,230,1) 100%);
  background: linear-gradient(204deg, rgba(66,255,204,1) 10%, rgba(182,245,239,1) 50%, rgba(213,89,230,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#d559e6",endColorstr="#b6f5ef",GradientType=1);
  margin-bottom: 10px;
  margin-left: auto;
  min-width: 150px;
  max-width: 330px;
  word-wrap: normal;
  padding: 15px;
  border-radius: 25px;
  -webkit-box-shadow: 0px 0px 30px -20px rgba(34, 60, 80, 0.7);
  -moz-box-shadow: 0px 0px 30px -20px rgba(34, 60, 80, 0.7);
  box-shadow: 0px 0px 30px -20px rgba(34, 60, 80, 0.7);
}
</style>