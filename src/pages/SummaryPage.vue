<template>
  <div class="q-pa-md">
    <q-table
      v-if="users.length"
      :rows="formattedUsers"
      :columns="columns"
      row-key="name"
    >
      <template v-slot:body-cell-devices="props">
        <ul v-if="props.row.devices.length">
          <li v-for="(device, idx) in props.row.devices" :key="idx">
            {{ device.title }} - Part Number: {{ device.partNumber }}
          </li>
        </ul>
        <span v-else>No devices assigned</span>
      </template>
    </q-table>
    <div v-else>No users found.</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const users = ref([]);
const devices = ref([]);
const formattedUsers = ref([]);

onMounted(() => {
  loadUsers();
  loadDevices();
  formatUserDeviceData();
});

function loadUsers() {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  users.value = storedUsers;
}

function loadDevices() {
  const storedDevices = JSON.parse(localStorage.getItem("devices") || "[]");
  devices.value = storedDevices;
}

function formatUserDeviceData() {
  formattedUsers.value = users.value.map((user) => {
    const userDevices = devices.value.filter(
      (device) => device.customerName === user.name
    );
    return {
      name: user.name,
      email: user.email || "N/A",
      devices: userDevices,
    };
  });
}

const columns = [
  {
    name: "name",
    required: true,
    label: "User Name",
    align: "left",
    field: "name",
  },
  {
    name: "email",
    label: "Email",
    align: "left",
    field: "email",
  },
  {
    name: "devices",
    label: "Devices Assigned",
    align: "left",
    field: "devices",
  },
];
</script>

<style scoped>
h1 {
  margin-bottom: 20px;
}
.q-table {
  width: 100%;
}
</style>
