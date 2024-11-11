<template>
  <form @submit.prevent="handlePasswordReset">
    <input
      v-model="formData.password"
      type="password"
      placeholder="New Password"
      required
    />
    <input
      v-model="formData.repeatPassword"
      type="password"
      placeholder="Repeat New Password"
      required
    />
    <button type="submit">Reset Password</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRoute } from "vue-router";

const route = useRoute();
const formData = ref({
  password: "",
  repeatPassword: "",
});

const handlePasswordReset = async () => {
  if (formData.value.password !== formData.value.repeatPassword) {
    alert("Passwords do not match!");
    return;
  }

  try {
    const response = await axios.post(
      `http://localhost:5000/api/auth/reset/${route.params.token}`,
      {
        password: formData.value.password,
      }
    );
    alert("Password reset successful!");
  } catch (error) {
    alert("Password reset failed: " + error.response.data.message);
  }
};
</script>

<style scoped></style>
