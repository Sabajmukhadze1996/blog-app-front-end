<template>
  <form @submit.prevent="handleSubmit" class="form-container">
    <h1 class="register-title">Register</h1>
    <input
      v-model="formData.username"
      placeholder="Username..."
      required
      class="input-field"
    />
    <input
      v-model="formData.email"
      type="email"
      placeholder="Email..."
      required
      class="input-field"
    />
    <input
      v-model="formData.password"
      type="password"
      placeholder="Password..."
      required
      class="input-field"
    />
    <input
      v-model="formData.repeatPassword"
      type="password"
      placeholder="Repeat Password..."
      required
      class="input-field"
    />
    <button type="submit" class="submit-button">Create Account</button>
    <Modal
      v-if="showModal"
      :message="'Passwords do not match!'"
      @close="closeModal"
    />
  </form>
</template>

<script setup>
import { ref, watch } from "vue";
import axios from "axios";
import Modal from "../components/Modal.vue";

const formData = ref({
  username: "",
  email: "",
  password: "",
  repeatPassword: "",
});

const showModal = ref(false);

watch(
  () => [formData.value.password, formData.value.repeatPassword],
  ([newPassword, newRepeatPassword]) => {
    if (newPassword !== newRepeatPassword) {
      showModal.value = true;
    } else {
      showModal.value = false;
    }
  },
  { immediate: true }
);

const handleSubmit = async () => {
  if (formData.value.password === formData.value.repeatPassword) {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username: formData.value.username,
          email: formData.value.email,
          password: formData.value.password,
        }
      );
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed: " + error.response.data.message);
    }
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
  margin-bottom: 4rem;
  padding-bottom: 1rem;
  color: #fff;
  border-bottom: 1px solid #ffffff74;
}

.input-field {
  width: 100%;
  font-size: 16px;
  border: 1px solid #ffffff74;
  border-radius: 8px;
  margin-bottom: 30px !important;
  transition: all 0.3s ease;
  background-color: transparent !important;
  padding-block: 20px !important;
}

.input-field:focus {
  border-color: #007bff;
  outline: none;
  color: #fff !important;
}

.input-field:focus::placeholder {
  color: #fff !important;
}

.input-field {
  background-color: #333;
  color: #fff;
  border-radius: 4px;
  padding: 10px;
  transition: all 0.3s ease;
  padding-left: 25px;
}

.input-field::placeholder {
  color: #aaa;
}

.input-wrapper:focus-within .input-field {
  color: #fff !important;
  border-color: #007bff;
}

.input-field:hover {
  border-color: #007bff;
}

.input-field::placeholder {
  color: #fff !important;
  font-style: italic;
}

.submit-button {
  width: 100%;
  font-size: 18px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-block: 1.5rem;
}

.submit-button:hover {
  background-color: #0056b3;
}

@media (max-width: 600px) {
  .form-container {
    padding: 20px;
  }

  .input-field {
    padding: 12px;
    font-size: 14px;
  }

  .submit-button {
    padding: 12px;
    font-size: 16px;
  }
}
</style>
