<template>
  <form @submit.prevent="handleCommentSubmit">
    <textarea
      v-model="commentData.text"
      placeholder="Add a comment..."
      required
    ></textarea>
    <button type="submit">Submit Comment</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const commentData = ref({
  text: "",
});

const handleCommentSubmit = async () => {
  try {
    const token = localStorage.getItem("token");
    await axios.post("http://localhost:5000/api/comments", commentData.value, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    alert("Comment added successfully!");
  } catch (error) {
    alert("Failed to add comment: " + error.response.data.message);
  }
};
</script>

<style scoped></style>
