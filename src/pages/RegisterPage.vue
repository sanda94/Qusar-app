<template>
  <div class="register-page">
    <!-- Add the same image as login page for consistency -->
    <img src="~/assets/dd.png" alt="Register Image" class="register-image" />

    <h1>Create New Account</h1>
    <form @submit.prevent="register">
      <input
        type="text"
        v-model="form.fullName"
        placeholder="Enter your full name"
        required
      />
      <input
        type="email"
        v-model="form.email"
        placeholder="Enter your email"
        required
      />
      <input
        type="password"
        v-model="form.password"
        placeholder="Enter your password"
        required
      />
      <input
        type="password"
        v-model="form.confirmPassword"
        placeholder="Confirm your password"
        required
      />
      <button type="submit">Register</button>
    </form>
    <p @click="goToLogin">Already have an account? Login</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const form = ref({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
});

function register() {
  // Add validation
  if (form.value.password !== form.value.confirmPassword) {
    alert("Passwords don't match!");
    return;
  }

  // Here you would typically make an API call to register the user
  console.log("Registration form submitted:", form.value);

  // For demo purposes, just redirect to login
  router.push("/loginPage");
}

function goToLogin() {
  router.push("/loginPage");
}
</script>

<style scoped>
.register-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9;
  padding: 20px;
}

.register-image {
  width: 150px;
  margin-bottom: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
  max-width: 300px;
}

input {
  padding: 10px;
  width: 100%;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-top: 10px;
}

button:hover {
  background-color: #45a049;
}

p {
  margin-top: 20px;
  color: #007bff;
  cursor: pointer;
}

p:hover {
  text-decoration: underline;
}
</style>
