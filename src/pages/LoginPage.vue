<template>
  <div class="login-page">
    <h1>Login Page</h1>
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

const form = ref({
  email: "",
  password: "",
});

const router = useRouter();

function login() {
  // Mock login for demonstration
  if (form.value.email && form.value.password) {
    localStorage.setItem("isAuthenticated", "true");
    router.push("/"); // Redirect after login
  } else {
    alert("Please fill in the email and password.");
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
  height: 100vh; /* Full height to center */
}

h1 {
  margin-bottom: 20px;
}

input {
  margin-bottom: 10px;
  padding: 10px;
  width: 200px; /* Adjust width */
}

button {
  padding: 10px;
  background-color: blue;
  color: white;
  border: none;
  cursor: pointer;
}

button:hover {
  background-color: darkblue; /* Button hover effect */
}
</style>
