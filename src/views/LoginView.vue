<template>
  <div class="container">
    <user-auth-form @submitForm="loginUser">
      <template v-slot:title>Login</template>
      <template v-slot:btn_form>Login</template>
      <template v-slot:title__choice><router-link to="/signup" class="redirect_choice">or Sign up</router-link></template>
    </user-auth-form>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import UserAuthForm from "@/components/UserAuthForm";
export default {
  name: "LoginView",
  components: {UserAuthForm, MyButton, MyInput},
  data() {
    return {

    }
  },
  methods: {
    loginUser(userLog) {
        this.$store.dispatch("onLogin", {username: userLog.username, password: userLog.password});
    }
  },
  watch: {
    '$store.state.token': function (){
      this.$router.push("/");
    }
  }
}
</script>

<style scoped>
.container {
  margin-top: 10%;
}

.redirect_choice {
  margin-left: 15px;
  color: grey;
  font-size: 20px;
}
</style>