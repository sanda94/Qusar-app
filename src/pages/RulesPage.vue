<template>
  <div class="q-pa-md">
    <q-page class="q-mt-md">
      <q-card class="q-pa-md q-mb-lg assignment-card">
        <!-- User Selection -->
        <q-select
          v-model="selectedUser"
          :options="users"
          option-label="name"
          option-value="name"
          label="Select User"
          filled
          dense
          class="q-mb-md"
        />

        <!-- Device Selection -->
        <q-select
          v-model="selectedDevice"
          :options="devices"
          option-label="title"
          option-value="title"
          label="Select Device"
          filled
          dense
          class="q-mb-md"
        />

        <!-- Assign Button -->
        <q-btn
          label="Assign Device"
          color="primary"
          @click="assignDeviceToUser"
          class="full-width"
          :disable="!selectedUser || !selectedDevice"
        />
      </q-card>

      <!-- Table of Assigned Devices -->
      <div v-if="assignedDevices.length">
        <q-table
          :rows="assignedDevices"
          :columns="columns"
          row-key="index"
          title="Assigned Devices"
          flat
          separator="horizontal"
          class="q-mt-md"
        >
          <!-- Action column slot for removing assignments -->
          <template v-slot:body-cell-action="props">
            <q-td :props="props">
              <q-btn
                icon="delete"
                color="negative"
                flat
                round
                @click="removeAssignment(props.row)"
              />
            </q-td>
          </template>
        </q-table>
      </div>
      <p v-else class="text-center q-mt-lg">
        No devices have been assigned yet.
      </p>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Variables to store user and device data
const users = ref([]);
const devices = ref([]);
const assignedDevices = ref([]);
const selectedUser = ref(null);
const selectedDevice = ref(null);

// Define columns for the assignment table
const columns = [
  { name: "index", label: "#", align: "left", field: "index" },
  { name: "user", label: "User", align: "left", field: "user" },
  { name: "device", label: "Device", align: "left", field: "device" },
  { name: "action", label: "Action", align: "center" },
];

// Load users and devices from local storage
onMounted(() => {
  loadUsers();
  loadDevices();
  loadAssignments();
});

// Load users from local storage
function loadUsers() {
  users.value = JSON.parse(localStorage.getItem("users") || "[]");
}

// Load devices from local storage
function loadDevices() {
  devices.value = JSON.parse(localStorage.getItem("devices") || "[]");
}

// Load previously assigned devices
function loadAssignments() {
  assignedDevices.value = JSON.parse(
    localStorage.getItem("assignedDevices") || "[]"
  );
}

// Assign the selected device to the selected user
function assignDeviceToUser() {
  if (selectedUser.value && selectedDevice.value) {
    assignedDevices.value.push({
      index: assignedDevices.value.length + 1,
      user: selectedUser.value,
      device: selectedDevice.value,
    });

    // Save assignments to local storage
    localStorage.setItem(
      "assignedDevices",
      JSON.stringify(assignedDevices.value)
    );

    // Clear selection
    selectedUser.value = null;
    selectedDevice.value = null;
  }
}

// Remove an assignment from the list
function removeAssignment(row) {
  const index = assignedDevices.value.indexOf(row);
  if (index !== -1) {
    assignedDevices.value.splice(index, 1);
    localStorage.setItem(
      "assignedDevices",
      JSON.stringify(assignedDevices.value)
    );
  }
}
</script>

<style scoped>
.assignment-card {
  max-width: 500px;
  margin: 0 auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.full-width {
  width: 100%;
}

.q-mt-md {
  margin-top: 16px;
}

.q-mb-md {
  margin-bottom: 16px;
}

.q-mb-lg {
  margin-bottom: 32px;
}

.text-center {
  text-align: center;
}
</style>
