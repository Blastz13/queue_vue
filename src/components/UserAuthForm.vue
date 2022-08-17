<template>
  <div class="login_form">
    <h1><slot name="title"></slot></h1>
    <form @submit.prevent>
      <my-input class="input__login" placeholder="Username" v-model="userLog.username"/>
      <my-input class="input__login" placeholder="Password" v-model="userLog.password" type="password"/>
      <my-button class="btn__login" @click="submitForm"><slot name="btn_form"></slot></my-button>
      <slot name="title__choice"></slot>
    </form>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";

export default {
  name: "UserAuthForm",
  components: {MyButton, MyInput},
  data() {
    return {
      userLog: {
        username: "",
        password: ""
      }
    }
  },
  methods: {
    submitForm() {
      this.$emit("submitForm", this.userLog);
    }
  }
}
</script>

<style scoped>

h1 {
  text-align: center;
  color: #75d0ab;
  font-size: 60px;
  text-shadow: 2px 2px 2px #c0c0c0;
}

.login_form {
  padding: 15px;
  width: 500px;
  background: white;
  border-radius: 16px;
}

.input__login {
  margin-top: 10px;
  height: 60px;
  background-color: #f8f8f8;
  border: 2px solid #ccc !important;
}

.btn__login {
  font-size: 20px;
}

</style>