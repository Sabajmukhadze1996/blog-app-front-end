<template>
  <form @submit.prevent="handleLogin" class="form-container">
    <h1 class="register-title">Login</h1>
    <input
      v-model="formData.username"
      placeholder="Username..."
      required
      class="input-field"
    />
    <input
      v-model="formData.password"
      type="password..."
      placeholder="Password"
      required
      class="input-field"
    />
    <button type="submit" class="submit-button">Login Into Your Account</button>
  </form>

  <Modal v-if="showModal" :message="modalMessage" @close="closeModal" />
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import Modal from "../components/Modal.vue";

const formData = ref({
  username: "",
  password: "",
});

const showModal = ref(false);
const modalMessage = ref("");

const handleLogin = async () => {
  try {
    const response = await axios.post("http://localhost:5000/api/auth/login", {
      username: formData.value.username,
      password: formData.value.password,
    });
    localStorage.setItem("token", response.data.token);
    modalMessage.value = "Login successful!";
    showModal.value = true;

    setTimeout(() => {
      window.location.href = "/profile";
    }, 1000);
  } catch (error) {
    modalMessage.value =
      "Login failed: " + (error.response?.data?.message || "Unknown error.");
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
  background-color: #33a270;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-block: 1.5rem;
}

.submit-button:hover {
  background-color: #117347;
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
