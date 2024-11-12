<template>
  <div class="modal-overlay" v-if="isVisible">
    <div class="modal">
      <h2>{{ message }}</h2>
      <button @click="closeModal" class="modal-close-btn">Close</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const props = defineProps({
  message: String,
});

const emit = defineEmits(["close"]);
const isVisible = ref(true);

const closeModal = () => {
  isVisible.value = false;
  emit("close");
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background-color: #333;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  color: #fff;
  max-width: 400px;
  width: 100%;
}

.modal h2 {
  font-size: 1.5rem;
}

.modal-close-btn {
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.modal-close-btn:hover {
  background-color: #0056b3;
}
</style>
