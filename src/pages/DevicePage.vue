<template>
  <div class="q-pa-md">
    <q-btn
      label="Add New Device"
      color="primary"
      @click="showAddDeviceDialog = true"
    />

    <!-- Device List -->
    <q-list v-if="devices.length">
      <q-item v-for="(device, index) in devices" :key="index">
        <q-item-section avatar>
          <q-avatar size="50px" @click="showImage(device.image)">
            <img :src="device.image" alt="Device Image" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ device.title }}</q-item-label>
          <q-item-label caption
            >Part Number: {{ device.partNumber }}</q-item-label
          >
          <q-item-label caption
            >Customer Name: {{ device.customerName }}</q-item-label
          >
          <q-item-label caption>User Name: {{ device.userName }}</q-item-label>
        </q-item-section>

        <q-item-section side>
          <q-btn flat label="Edit" @click="editDevice(index)" />
          <q-btn
            flat
            label="Delete"
            color="red"
            @click="confirmDeleteDevice(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Add/Edit Device Dialog -->
    <q-dialog v-model="showAddDeviceDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? "Edit Device" : "Add New Device" }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="newDevice.title" label="Device Title" filled />
          <q-input v-model="newDevice.partNumber" label="Part Number" filled />
          <q-input
            v-model="newDevice.customerName"
            label="Customer Name"
            filled
          />

          <!-- User Selection Dropdown -->
          <q-select
            v-model="newDevice.userName"
            :options="userOptions"
            label="Select User"
            filled
          />

          <!-- Image Upload -->
          <q-avatar size="100px" class="q-mb-md">
            <img :src="newDevice.image" alt="Device Image" />
          </q-avatar>
          <input type="file" accept="image/*" @change="onFileChange" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" flat @click="closeDeviceDialog" />
          <q-btn label="Save" color="primary" @click="saveDevice" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Confirmation Dialog for Deletion -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Deletion</div>
          <div>Are you sure you want to delete this device?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" flat @click="closeDeleteDialog" />
          <q-btn label="Yes, Delete" color="red" @click="deleteDevice" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Image Pop-up -->
    <q-dialog v-model="showImageDialog" persistent>
      <q-card>
        <q-card-section>
          <img
            :src="selectedImage"
            alt="Device Image"
            style="width: 100%; max-width: 400px"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Close" @click="closeImageDialog" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const showAddDeviceDialog = ref(false);
const showDeleteDialog = ref(false);
const showImageDialog = ref(false);
const devices = ref([]);
const newDevice = ref({
  title: "",
  partNumber: "",
  customerName: "",
  userName: "", // Add userName to the device
  image: "",
});
const editMode = ref(false);
const deviceToEditIndex = ref(null);
const deviceToDeleteIndex = ref(null);
const selectedImage = ref("");
const userOptions = ref([]); // Options for the user dropdown

// Load devices and users from local storage when the component is mounted
onMounted(() => {
  loadDevices();
  loadUsers(); // Load user options as well
});

// Load devices from local storage
function loadDevices() {
  const storedDevices = JSON.parse(localStorage.getItem("devices") || "[]");
  devices.value = storedDevices;
}

// Load users from local storage or a predefined list
function loadUsers() {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  userOptions.value = storedUsers.map((user) => ({
    label: user.name,
    value: user.name,
  }));
}

// Function to save or edit a device
function saveDevice() {
  if (editMode.value) {
    devices.value[deviceToEditIndex.value] = { ...newDevice.value };
  } else {
    devices.value.push({ ...newDevice.value });
  }
  localStorage.setItem("devices", JSON.stringify(devices.value));
  closeDeviceDialog();
}

// Function to open the edit dialog
function editDevice(index) {
  newDevice.value = { ...devices.value[index] };
  deviceToEditIndex.value = index;
  editMode.value = true;
  showAddDeviceDialog.value = true;
}

// Function to open the delete confirmation dialog
function confirmDeleteDevice(index) {
  deviceToDeleteIndex.value = index;
  showDeleteDialog.value = true;
}

// Function to delete a device
function deleteDevice() {
  devices.value.splice(deviceToDeleteIndex.value, 1);
  localStorage.setItem("devices", JSON.stringify(devices.value));
  closeDeleteDialog();
}

// Function to close the delete dialog
function closeDeleteDialog() {
  showDeleteDialog.value = false;
  deviceToDeleteIndex.value = null;
}

// Function to close the add/edit dialog
function closeDeviceDialog() {
  showAddDeviceDialog.value = false;
  newDevice.value = {
    title: "",
    partNumber: "",
    customerName: "",
    userName: "", // Reset userName as well
    image: "",
  };
  editMode.value = false;
}

// Handle file selection and update image
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newDevice.value.image = e.target.result;
    };
    reader.readAsDataURL(file);
  }
}

// Function to show image in a pop-up
function showImage(imageSrc) {
  selectedImage.value = imageSrc;
  showImageDialog.value = true;
}

// Function to close the image dialog
function closeImageDialog() {
  showImageDialog.value = false;
  selectedImage.value = "";
}
</script>

<style scoped>
/* Add any additional styles here */
</style>
