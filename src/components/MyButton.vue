<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "MyButton"
}
</script>

<style scoped>
button{
  background-color: #4CAF50; /* Green */
  border: none;
  color: white;
  padding: 12px 26px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 15px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  box-shadow: 0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);
}

button:hover {
  box-sizing: border-box;
  background-color: white;
  color: #4CAF50;
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);
  outline: 2px solid #4CAF50;
  border-radius: 15px;
}
</style>