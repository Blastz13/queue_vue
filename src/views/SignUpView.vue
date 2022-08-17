<template>
  <div class="container">
    <user-auth-form @submitForm="signUpUser">
      <template v-slot:title>Sign up</template>
      <template v-slot:btn_form>Sign up</template>
      <template v-slot:title__choice><router-link to="/login" class="redirect_choice">or Login</router-link></template>
    </user-auth-form>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import UserAuthForm from "@/components/UserAuthForm";
export default {
  name: "SingInView",
  components: {MyButton, MyInput, UserAuthForm},
  data() {
    return {

    }
  },
  methods: {
    signUpUser(userLog) {
      this.$store.dispatch("onSignUp", {username: userLog.username, password: userLog.password});
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