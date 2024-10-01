<template>
  <div class="q-pa-md">
    <q-btn
      label="Add New User"
      color="primary"
      @click="showAddUserDialog = true"
    />

    <!-- User List -->
    <q-list v-if="users.length">
      <q-item v-for="(user, index) in users" :key="index">
        <q-item-section avatar>
          <q-avatar size="50px" @click="showImage(user.avatar)">
            <img :src="user.avatar" alt="User Avatar" />
          </q-avatar>
        </q-item-section>

        <q-item-section>
          <q-item-label>{{ user.name }}</q-item-label>
          <q-item-label caption>Email: {{ user.email }}</q-item-label>
          <q-item-label caption>Contact: {{ user.contactNumber }}</q-item-label>
          <q-item-label caption>Area: {{ user.area }}</q-item-label>

          <!-- Devices Assigned to User -->
          <q-item-label caption>
            <strong>Assigned Devices:</strong>
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

        <q-item-section side>
          <q-btn flat label="Edit" @click="editUser(index)" />
          <q-btn
            flat
            label="Delete"
            color="red"
            @click="confirmDeleteUser(index)"
          />
        </q-item-section>
      </q-item>
    </q-list>

    <!-- Add/Edit User Dialog -->
    <q-dialog v-model="showAddUserDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">
            {{ editMode ? "Edit User" : "Add New User" }}
          </div>
        </q-card-section>
        <q-card-section>
          <q-input v-model="newUser.name" label="Name" filled />
          <q-input v-model="newUser.email" label="Email" filled />
          <q-input
            v-model="newUser.contactNumber"
            label="Contact Number"
            filled
          />
          <q-input v-model="newUser.area" label="Area" filled />

          <!-- Image Upload -->
          <q-avatar size="100px" class="q-mb-md">
            <img :src="newUser.avatar" alt="User Avatar" />
          </q-avatar>
          <input type="file" accept="image/*" @change="onFileChange" />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" flat @click="closeUserDialog" />
          <q-btn label="Save" color="primary" @click="saveUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Confirmation Dialog for Deletion -->
    <q-dialog v-model="showDeleteDialog" persistent>
      <q-card>
        <q-card-section>
          <div class="text-h6">Confirm Deletion</div>
          <div>Are you sure you want to delete this user?</div>
        </q-card-section>
        <q-card-actions align="right">
          <q-btn label="Cancel" flat @click="closeDeleteDialog" />
          <q-btn label="Yes, Delete" color="red" @click="deleteUser" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Image Pop-up -->
    <q-dialog v-model="showImageDialog" persistent>
      <q-card>
        <q-card-section>
          <img
            :src="selectedImage"
            alt="User Avatar"
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

const showAddUserDialog = ref(false);
const showDeleteDialog = ref(false);
const showImageDialog = ref(false);
const users = ref([]);
const newUser = ref({
  name: "",
  email: "",
  contactNumber: "",
  area: "",
  avatar: "",
});
const editMode = ref(false);
const userToEditIndex = ref(null);
const userToDeleteIndex = ref(null);
const selectedImage = ref("");
const devices = ref([]); // Add a devices ref

// Load users and devices from local storage when the component is mounted
onMounted(() => {
  loadUsers();
  loadDevices(); // Load devices as well
});

// Load users from local storage
function loadUsers() {
  const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
  users.value = storedUsers;
}

// Load devices from local storage
function loadDevices() {
  const storedDevices = JSON.parse(localStorage.getItem("devices") || "[]");
  devices.value = storedDevices;
}

// Get all devices assigned to a user
function getDevicesForUser(userName) {
  return devices.value.filter((device) => device.customerName === userName);
}

// Function to save or edit a user
function saveUser() {
  if (editMode.value) {
    users.value[userToEditIndex.value] = { ...newUser.value };
  } else {
    users.value.push({ ...newUser.value });
  }
  localStorage.setItem("users", JSON.stringify(users.value));
  closeUserDialog();
}

// Function to open the edit dialog
function editUser(index) {
  newUser.value = { ...users.value[index] };
  userToEditIndex.value = index;
  editMode.value = true;
  showAddUserDialog.value = true;
}

// Function to open the delete confirmation dialog
function confirmDeleteUser(index) {
  userToDeleteIndex.value = index;
  showDeleteDialog.value = true;
}

// Function to delete a user
function deleteUser() {
  users.value.splice(userToDeleteIndex.value, 1);
  localStorage.setItem("users", JSON.stringify(users.value));
  closeDeleteDialog();
}

// Function to close the delete dialog
function closeDeleteDialog() {
  showDeleteDialog.value = false;
  userToDeleteIndex.value = null;
}

// Function to close the add/edit dialog
function closeUserDialog() {
  showAddUserDialog.value = false;
  newUser.value = {
    name: "",
    email: "",
    contactNumber: "",
    area: "",
    avatar: "",
  };
  editMode.value = false;
}

// Handle file selection and update avatar
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      newUser.value.avatar = e.target.result;
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
