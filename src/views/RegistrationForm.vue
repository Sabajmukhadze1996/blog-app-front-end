<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h1 class="register-title">Register</h1>

    <input
      v-model="formData.username"
      placeholder="Username..."
      required
      :class="['input-field', { 'input-error': formErrors.username }]"
    />
    <span v-if="formErrors.username" class="error-text">{{
      formErrors.username
    }}</span>

    <input
      v-model="formData.email"
      type="email"
      placeholder="Email..."
      required
      :class="['input-field', { 'input-error': formErrors.email }]"
    />
    <span v-if="formErrors.email" class="error-text">{{
      formErrors.email
    }}</span>

    <input
      v-model="formData.password"
      type="password"
      placeholder="Password..."
      required
      :class="['input-field', { 'input-error': formErrors.password }]"
    />
    <span v-if="formErrors.password" class="error-text">{{
      formErrors.password
    }}</span>

    <input
      v-model="formData.repeatPassword"
      type="password"
      placeholder="Repeat Password..."
      required
      :class="['input-field', { 'input-error': formErrors.repeatPassword }]"
    />
    <span v-if="formErrors.repeatPassword" class="error-text">{{
      formErrors.repeatPassword
    }}</span>

    <button type="submit" class="submit-button">Create Account</button>

    <Modal v-if="showModal" :message="modalMessage" @close="closeModal" />
  </form>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import axios from "axios";
import Modal from "../components/Modal.vue";

const formData = ref({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const formErrors = ref({
  username: null,
  email: null,
  password: null,
  repeatPassword: null,
});

const showModal = ref(false);
const modalMessage = ref("");

const router = useRouter();

const validateForm = () => {
  let valid = true;

  formErrors.value = {
    username: null,
    email: null,
    password: null,
    repeatPassword: null,
  };

  if (!formData.value.username) {
    formErrors.value.username = "Username is required.";
    valid = false;
  }

  if (!formData.value.email) {
    formErrors.value.email = "Email is required.";
    valid = false;
  } else if (!/\S+@\S+\.\S+/.test(formData.value.email)) {
    formErrors.value.email = "Please enter a valid email address.";
    valid = false;
  }

  if (!formData.value.password) {
    formErrors.value.password = "Password is required.";
    valid = false;
  } else if (formData.value.password.length < 8) {
    formErrors.value.password = "Password must be at least 8 characters.";
    valid = false;
  } else if (!/[A-Z]/.test(formData.value.password)) {
    formErrors.value.password =
      "Password must include at least one uppercase letter.";
    valid = false;
  } else if (!/[a-z]/.test(formData.value.password)) {
    formErrors.value.password =
      "Password must include at least one lowercase letter.";
    valid = false;
  } else if (!/\d/.test(formData.value.password)) {
    formErrors.value.password = "Password must include at least one number.";
    valid = false;
  }

  if (formData.value.password !== formData.value.repeatPassword) {
    formErrors.value.repeatPassword = "Passwords do not match.";
    valid = false;
  }

  return valid;
};

const handleSubmit = async () => {
  if (validateForm()) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.value.username,
          email: formData.value.email,
          password: formData.value.password,
        }
      );
      modalMessage.value = "Registration successful!";
      showModal.value = true;

      setTimeout(() => {
        router.push("/login");
      }, 1000);
    } catch (error) {
      modalMessage.value =
        "Registration failed: " +
        (error.response?.data?.message || "Unknown error.");
      showModal.value = true;
    }
  } else {
    modalMessage.value = "Please fix the errors before submitting.";
    showModal.value = true;
  }
};

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.form-container {
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.register-title {
  font-size: clamp(18px, 5vw, 30px);
  letter-spacing: 2px;
  text-align: center;
  margin-bottom: 2rem;
  color: #fff;
  border-bottom: 1px solid #ffffff74;
}

.input-field {
  width: 100%;
  border: 1px solid #ffffff74;
  border-radius: 8px;
  padding-left: 20px;
  margin-bottom: 30px !important;
  transition: border-color 0.3s ease;
  background-color: #333;
  color: #fff;
  padding-block: 20px !important;
  font-size: 16px;
}

.input-field::placeholder {
  font-style: italic;
}

.input-field.input-error {
  border-color: red;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
}

.error-text {
  color: red;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.submit-button {
  width: 100%;
  font-size: 18px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-block: 1.5rem;
}

.submit-button:hover {
  background-color: #0056b3;
}
</style>
