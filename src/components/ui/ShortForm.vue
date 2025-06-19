<template>
  <div class="bg-white p-6 rounded-lg shadow-lg">
    <h4 class="text-xl font-semibold mb-4 text-gray-800">Get Updates</h4>
    <form @submit.prevent="handleSubmit" class="space-y-4">
      <div>
        <input
          v-model="email"
          type="email"
          placeholder="Enter your email"
          required
          class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
        />
      </div>
      <button
        type="submit"
        :disabled="isSubmitting"
        class="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
      >
        <span v-if="!isSubmitting">Subscribe</span>
        <span v-else>Subscribing...</span>
      </button>
      <p v-if="message" :class="messageClass" class="text-sm">
        {{ message }}
      </p>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const email = ref("");
const isSubmitting = ref(false);
const message = ref("");
const isSuccess = ref(false);

const messageClass = computed(() => ({
  "text-green-600": isSuccess.value,
  "text-red-600": !isSuccess.value,
}));

const handleSubmit = async () => {
  isSubmitting.value = true;
  message.value = "";

  try {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Here you would typically make an actual API call
    // const response = await fetch('/api/subscribe', { ... })

    message.value = "Successfully subscribed to updates!";
    isSuccess.value = true;
    email.value = "";
  } catch (error) {
    message.value = "Failed to subscribe. Please try again.";
    isSuccess.value = false;
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
/* Component-specific styles */
</style>
