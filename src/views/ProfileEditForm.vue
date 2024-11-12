<template>
  <h1 class="profile-title">User Profile</h1>
  <form @submit.prevent="handleProfileUpdate">
    <div class="user-info-container" v-if="userInfo">
      <p><strong>Username:</strong> {{ userInfo.username }}</p>
      <p><strong>Email:</strong> {{ userInfo.email }}</p>
      <p>
        <strong>Registration Date:</strong>
        {{ userInfo.createdAt | formatDate }}
      </p>
      <div v-if="userInfo.profileImage">
        <p><strong>Profile Image:</strong></p>
        <img
          :src="`http://localhost:5000/${userInfo.profileImage}`"
          alt="Profile Image"
          class="profile-image"
        />
      </div>
    </div>
    <div class="form">
      <input
        class="input-field"
        v-model="profileData.username"
        placeholder="New Username"
        required
      />
      <input
        class="input-field"
        v-model="profileData.email"
        type="email"
        placeholder="New Email"
      />
      <input
        class="input-field"
        type="file"
        @change="handleProfileImageUpload"
      />
      <button class="submit-button" type="submit">Update Profile</button>
    </div>
  </form>

  <Modal v-if="showModal" :message="modalMessage" @close="closeModal" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import Modal from "../components/Modal.vue";

import { format } from "date-fns";

const profileData = ref({
  username: "",
  email: "",
  image: null,
});

const userInfo = ref(null);

const showModal = ref(false);
const modalMessage = ref("");

const formatDate = (date) => {
  return format(new Date(date), "MM/dd/yyyy");
};

const fetchUserProfile = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      "http://localhost:5000/api/users/profile",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    userInfo.value = response.data;
    profileData.value.username = userInfo.value.username;
    profileData.value.email = userInfo.value.email;
  } catch (error) {
    modalMessage.value =
      "Failed to fetch user profile: " + error.response.data.message;
    showModal.value = true;
  }
};

const handleProfileImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    profileData.value.image = file;
  }
};

const handleProfileUpdate = async () => {
  const formData = new FormData();
  formData.append("username", profileData.value.username);
  if (profileData.value.email)
    formData.append("email", profileData.value.email);
  if (profileData.value.image)
    formData.append("image", profileData.value.image);

  try {
    const token = localStorage.getItem("token");
    const response = await axios.put(
      "http://localhost:5000/api/users/profile",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    modalMessage.value = "Profile updated successfully!";
    showModal.value = true;
    userInfo.value = response.data;
    profileData.value.username = userInfo.value.username;
    profileData.value.email = userInfo.value.email;
  } catch (error) {
    modalMessage.value =
      "Failed to update profile: " + error.response.data.message;
    showModal.value = true;
  }
};

onMounted(fetchUserProfile);

const closeModal = () => {
  showModal.value = false;
};
</script>

<style scoped>
.profile-title {
  text-align: center;
  font-size: clamp(32px, 4vw, 40px);
  margin-top: 20px;
}
.form {
  padding-top: 2rem;
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

.submit-button {
  width: 100%;
  font-size: 18px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  padding-block: 1.5rem;
}

.submit-button:hover {
  background-color: #c21d2d;
}

.user-info-container p {
  font-size: clamp(14px, 3.5vw, 22px) !important;
}
</style>
