<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <!-- Left menu button -->
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />
        <q-toolbar-title>XPAC</q-toolbar-title>

        <!-- Spacer to push the Logout button to the right -->
        <div class="q-mr-md"></div>

        <!-- Logout button on the right -->
        <q-btn
          flat
          dense
          icon="logout"
          label="Logout"
          color="negative"
          @click="showLogoutDialog = true"
        />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header>XPAC</q-item-label>
        <EssentialLink
          v-for="link in linksList"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

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
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import EssentialLink from "components/EssentialLink.vue";

// State for left drawer
const leftDrawerOpen = ref(false);

// State for logout confirmation dialog
const showLogoutDialog = ref(false);

// Vue Router instance
const router = useRouter();

// Toggle the left drawer
function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}

// Handle logout confirmation
function confirmLogout() {
  // Perform logout actions (e.g., remove token, clear user data)
  localStorage.removeItem("isAuthenticated");

  // Close the dialog
  showLogoutDialog.value = false;

  // Redirect to login page
  router.push("/loginPage"); // Ensure this matches your login route
}

// Navigation links for the left drawer
const linksList = [
  { title: "Home", caption: "home", icon: "home", link: "/IndexPage" },
  {
    title: "Summary",
    caption: "navigate Summary",
    icon: "assessment",
    link: "/SummaryPage",
  },
  {
    title: "Profile",
    caption: "navigate Profile",
    icon: "person",
    link: "/ProfilePage",
  },
  {
    title: "Users",
    caption: "navigate Users",
    icon: "record_voice_over",
    link: "/UsersPage",
  },
  {
    title: "Device",
    caption: "navigate device",
    icon: "devices",
    link: "/DevicePage",
  },
  {
    title: "Rules",
    caption: "navigate rules",
    icon: "public",
    link: "/RulesPage",
  },
];
</script>

<style scoped>
/* Optional: Add any specific styling if needed */
</style>
