<template>
  <form @submit.prevent="handleProfileUpdate">
    <input v-model="profileData.username" placeholder="New Username" required />
    <input v-model="profileData.email" type="email" placeholder="New Email" />
    <input type="file" @change="handleProfileImageUpload" />
    <button type="submit">Update Profile</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const profileData = ref({
  username: "",
  email: "",
  image: null,
});

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
    await axios.put("http://localhost:5000/api/users/profile", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Profile updated successfully!");
  } catch (error) {
    alert("Failed to update profile: " + error.response.data.message);
  }
};
</script>

<style scoped></style>
