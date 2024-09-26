<template>
  <q-page class="q-pa-md">
    <div class="q-gutter-md" style="max-width: 400px; margin: auto">
      <q-card>
        <q-card-section>
          <div class="text-h6">Login to Your Account</div>
        </q-card-section>

        <q-card-section>
          <q-form @submit.prevent="login">
            <q-input v-model="form.email" label="Email" type="email" required />
            <q-input
              v-model="form.password"
              label="Password"
              type="password"
              required
              class="q-mt-md"
            />
            <q-btn
              label="Login"
              type="submit"
              color="primary"
              class="full-width q-mt-md"
            />
          </q-form>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Login form data
const form = ref({
  email: "",
  password: "",
});

// Router for navigation
const router = useRouter();

// Mock login function (can be replaced by actual API call)
function login() {
  // For demonstration purposes, we validate a hardcoded email/password
  if (
    form.value.email === "admin@example.com" &&
    form.value.password === "password"
  ) {
    // Navigate to the dashboard after successful login
    router.push("/dashboard");
  } else {
    alert("Incorrect email or password.");
  }
}
</script>

<style scoped>
/* Add any login-specific styles here */
</style>
