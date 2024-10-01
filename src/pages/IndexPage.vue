<template>
  <q-page class="q-pa-md">
    <q-banner inline-actions class="bg-primary text-white">
      <template v-slot:avatar>
        <q-avatar size="56px" class="bg-white text-primary">
          <q-icon name="home" />
        </q-avatar>
      </template>
      <div class="text-h5 q-my-md">Welcome to the Home Page</div>
      <p class="text-body1">
        Discover the features of this application, explore, and enjoy a seamless
        experience!
      </p>
      <q-banner-actions class="row items-center">
        <q-btn
          label="Get Started"
          color="white"
          text-color="primary"
          class="q-mr-sm"
        />
        <q-btn label="Learn More" color="white" text-color="primary" />
        <!-- Move the Logout button to the right with q-ml-auto -->
        <q-btn
          label="Logout"
          color="negative"
          @click="showLogoutDialog = true"
          class="q-ml-auto"
        />
      </q-banner-actions>
    </q-banner>

    <div class="q-mt-xl q-px-md">
      <q-list>
        <q-item clickable tag="router-link" :to="{ path: '/summaryPage' }">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Summary</q-item-label>
            <q-item-label caption>View your data summary</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable tag="router-link" :to="{ path: '/profilePage' }">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Manage your profile details</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" :to="{ path: '/DevicePage' }">
          <q-item-section avatar>
            <q-icon name="devices" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Devices</q-item-label>
            <q-item-label caption>Manage your devices</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>

      <q-item clickable tag="router-link" :to="{ path: '/RulesPage' }">
        <q-item-section avatar>
          <q-icon name="public" />
        </q-item-section>
        <q-item-section>
          <q-item-label>Rules</q-item-label>
          <q-item-label caption>Manage your Rules</q-item-label>
        </q-item-section>
      </q-item>
    </div>

    <!-- Logout Confirmation Dialog -->
    <q-dialog v-model="showLogoutDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Proceed to Logout?</div>
          <p>Are you sure you want to log out?</p>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn label="No" flat @click="showLogoutDialog = false" />
          <q-btn label="Yes" color="negative" @click="confirmLogout" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

// Define the dialog state for logout confirmation
const showLogoutDialog = ref(false);

// Vue Router instance
const router = useRouter();

// Logout confirmation function
const confirmLogout = () => {
  // Perform logout actions
  console.log("Logging out...");
  localStorage.removeItem("isAuthenticated");
  showLogoutDialog.value = false; // Close the dialog
  router.push("/loginPage"); // Redirect to the login page
};
</script>

<style scoped>
.q-banner {
  border-radius: 8px;
}
</style>
