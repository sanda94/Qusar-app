<template>
  <div class="login-page">
    <!-- Add the image here -->
    <img src="~/assets/dd.png" alt="Login Image" class="login-image" />

    <h1>Login to Continue</h1>
    <form @submit.prevent="login">
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
      <button type="submit">Login</button>
    </form>
    <p @click="goToRegister">Don't have an account? Register</p>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Dummy credentials for demonstration
const validEmail = "test@example.com";
const validPassword = "password123";

const form = ref({
  email: "",
  password: "",
});

const router = useRouter();

function login() {
  // Check if the entered email and password match the valid credentials
  if (
    form.value.email === validEmail &&
    form.value.password === validPassword
  ) {
    // Store login state in localStorage
    localStorage.setItem("isAuthenticated", "true");

    // Redirect to home page after login
    router.push("/IndexPage"); // Change "/home" to your actual home page route
  } else {
    alert("Invalid email or password. Please try again.");
  }
}

function goToRegister() {
  router.push("/RegisterPage");
}
</script>

<style scoped>
.login-page {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: #f9f9f9; /* Light background */
  padding: 20px;
}

h1 {
  margin-bottom: 20px;
  font-size: 24px;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  width: 250px; /* Wider input fields */
  border-radius: 5px; /* Rounded corners */
  border: 1px solid #ccc;
  font-size: 16px;
}

button {
  padding: 10px 20px;
  background-color: #4caf50; /* Green button */
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #45a049; /* Darker green on hover */
}

p {
  margin-top: 10px;
  color: #007bff;
  cursor: pointer;
}

p:hover {
  text-decoration: underline;
}

.login-image {
  width: 150px; /* Adjust image size */
  margin-bottom: 20px;
}
</style>
