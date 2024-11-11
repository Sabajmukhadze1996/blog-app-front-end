<template>
  <form @submit.prevent="handlePasswordRecovery" class="form-container">
    <h1 class="register-title">Recover Your Password</h1>
    <input
      v-model="formData.email"
      type="email"
      placeholder="Email"
      required
      class="input-field"
    />
    <button type="submit" class="submit-button">Recover Your Password</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const formData = ref({
  email: "",
});

const handlePasswordRecovery = async () => {
  try {
    const response = await axios.post(
      "http://localhost:5000/api/auth/recover",
      {
        email: formData.value.email,
      }
    );
    alert("Recovery instructions sent to your email.");
  } catch (error) {
    alert("Recovery failed: " + error.response.data.message);
  }
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
