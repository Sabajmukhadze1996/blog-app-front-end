<template>
  <form @submit.prevent="handleBlogSubmit">
    <input v-model="blogData.title" placeholder="Title" required />
    <textarea
      v-model="blogData.description"
      placeholder="Description"
      required
    ></textarea>
    <input type="file" @change="handleImageUpload" />
    <button type="submit">Submit Blog</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const blogData = ref({
  title: "",
  description: "",
  image: null,
});

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    blogData.value.image = file;
  }
};

const handleBlogSubmit = async () => {
  const formData = new FormData();
  formData.append("title", blogData.value.title);
  formData.append("description", blogData.value.description);
  if (blogData.value.image) {
    formData.append("image", blogData.value.image);
  }

  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/blogs", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });
    alert("Blog created successfully!");
  } catch (error) {
    alert("Failed to create blog: " + error.response.data.message);
  }
};
</script>

<style scoped></style>
