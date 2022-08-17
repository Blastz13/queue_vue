<template>
    <router-view></router-view>
</template>

<script>
export default {

}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

a {
  text-decoration: none;
}

body{
  background: rgb(255,158,51);
  background: -moz-linear-gradient(90deg, rgba(255,158,51,1) 0%, rgba(110,250,212,1) 100%, rgba(60,242,226,1) 100%);
  background: -webkit-linear-gradient(90deg, rgba(255,158,51,1) 0%, rgba(110,250,212,1) 100%, rgba(60,242,226,1) 100%);
  background: linear-gradient(90deg, rgba(255,158,51,1) 0%, rgba(110,250,212,1) 100%, rgba(60,242,226,1) 100%);
  filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#ff9e33",endColorstr="#3cf2e2",GradientType=1);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.container{
  margin: 0 auto;
  max-width: 1200px;
  padding: 0px 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
</style>