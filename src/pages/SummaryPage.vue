<template>
  <div class="q-pa-md">
    <h1>Summary Page</h1>
    <q-list v-if="users.length">
      <q-item v-for="(user, index) in users" :key="index">
        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>

          <q-item-label caption>
            <strong>Devices:</strong>
            <ul>
              <li
                v-for="(device, idx) in getDevicesForUser(user.name)"
                :key="idx"
              >
                {{ device.title }} - Part Number: {{ device.partNumber }}
              </li>
            </ul>
            <span v-if="getDevicesForUser(user.name).length === 0"
              >No devices assigned</span
            >
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <div v-else>No users found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);
const devices = ref([]);

onMounted(() => {
  loadUsers();
  loadDevices();
});

function loadUsers() {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  users.value = storedUsers;
}

function loadDevices() {
  const storedDevices = JSON.parse(localStorage.getItem("devices") || "[]");
  devices.value = storedDevices;
}

// Get all devices assigned to a user
function getDevicesForUser(userName) {
  return devices.value.filter((device) => device.customerName === userName);
}
</script>

<style scoped>
/* You can customize the styles here */
</style>
