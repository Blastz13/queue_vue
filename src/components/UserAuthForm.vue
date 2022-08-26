<template>
  <div class="login_form">
    <h1>
      <slot name="title"></slot>
    </h1>
    <form @submit.prevent>
      <my-input :class="['input__login', {'error':usernameValidationError}]" placeholder="Username" v-model="v$.userLog.username.$model"/>
      <p class="error_message" v-if="!v$.userLog.username.$error"></p>
      <p class="error_message" v-for="error in v$.userLog.username.$errors">{{ error.$message }}</p>
      <my-input :class="['input__login', {'error':passwordValidationError}]" placeholder="Password" v-model="v$.userLog.password.$model" type="password"/>
      <p class="error_message" v-if="!v$.userLog.password.$error"></p>
      <p class="error_message" v-for="error in v$.userLog.password.$errors">{{ error.$message }}</p>
      <my-button class="btn__login" @click="submitForm">
        <slot name="btn_form"></slot>
      </my-button>
      <slot name="title__choice"></slot>
    </form>
  </div>
</template>

<script>
import MyInput from "@/components/MyInput";
import MyButton from "@/components/MyButton";
import useVuelidate from '@vuelidate/core'
import {minLength, required} from '@vuelidate/validators'

export default {
  name: "UserAuthForm",
  components: {MyButton, MyInput},
  setup() {
    return {v$: useVuelidate()}
  },
  data() {
    return {
      userLog: {
        username: "",
        password: ""
      },
      passwordValidationError: false,
      usernameValidationError: false
    }
  },
  methods: {
    submitForm() {
      if (this.v$.$invalid) {
        this.usernameValidationError = this.v$.userLog.username.$error;
        this.passwordValidationError = this.v$.userLog.password.$error;
        return
      }

      this.$emit("submitForm", this.userLog);
    }
  },
  validations() {
    return {
      userLog: {
        username: {required, minLength: minLength(6)},
        password: {required, minLength: minLength(10)},
      }
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
  margin-bottom: 5px;
  height: 60px;
  background-color: #f8f8f8;
  border: 2px solid #ccc !important;
}

.btn__login {
  margin-top: 10px;
  font-size: 20px;
}

.error_message {
  height: 10px;
  margin-left: 18px;
  color: red;
}
.error{
  border: 2px solid red !important;
  background-color: #fff0f0;
}
</style>