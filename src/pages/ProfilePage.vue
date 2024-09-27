<template>
  <div class="q-pa-md">
    <q-page class="q-mt-md">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="row no-wrap">
            <!-- User Avatar -->
            <q-avatar size="100px" class="q-mr-md" @click="openImageDialog">
              <img :src="user.avatar" alt="User Avatar" />
            </q-avatar>

            <div>
              <!-- User Name -->
              <h2>{{ user.name }}</h2>
              <!-- User Role/Title -->
              <p class="text-subtitle2 text-grey">{{ user.role }}</p>
              <!-- User Contact Info -->
              <p><q-icon name="email" class="q-mr-sm" /> {{ user.email }}</p>
              <p><q-icon name="phone" class="q-mr-sm" /> {{ user.phone }}</p>
            </div>
          </div>
        </q-card-section>

        <!-- Additional User Details -->
        <q-card-section>
          <q-list separator>
            <q-item>
              <q-item-section>
                <q-item-label caption>Address</q-item-label>
                <q-item-label>{{ user.address }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Joined</q-item-label>
                <q-item-label>{{ user.joinedDate }}</q-item-label>
              </q-item-section>
            </q-item>

            <q-item>
              <q-item-section>
                <q-item-label caption>Skills</q-item-label>
                <q-item-label>{{ user.skills }}</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>

        <!-- Action Buttons -->
        <q-card-actions align="right">
          <q-btn label="Edit Profile" color="primary" @click="openEditDialog" />
          <q-btn
            label="Change Password"
            color="secondary"
            @click="showPasswordDialog = true"
          />
        </q-card-actions>
      </q-card>

      <!-- Edit Profile Dialog -->
      <q-dialog v-model="editDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Edit Profile</div>
          </q-card-section>

          <q-card-section>
            <!-- Edit Avatar with Image Upload -->
            <q-avatar size="100px" class="q-mb-md">
              <img :src="form.avatar" alt="Edit User Avatar" />
            </q-avatar>
            <input type="file" accept="image/*" @change="onFileChange" />

            <!-- Edit Name -->
            <q-input v-model="form.name" label="Name" />

            <!-- Edit Email -->
            <q-input v-model="form.email" label="Email" />

            <!-- Edit Phone -->
            <q-input v-model="form.phone" label="Phone" />

            <!-- Edit Address -->
            <q-input v-model="form.address" label="Address" />

            <!-- Edit Skills -->
            <q-input v-model="form.skills" label="Skills" />
          </q-card-section>

          <!-- Dialog Action Buttons -->
          <q-card-actions align="right">
            <q-btn label="Cancel" flat @click="closeEditDialog" />
            <q-btn label="Save" color="primary" @click="saveProfile" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Change Password Dialog -->
      <q-dialog v-model="showPasswordDialog" persistent>
        <q-card>
          <q-card-section>
            <div class="text-h6">Change Password</div>
          </q-card-section>

          <q-card-section>
            <q-input
              v-model="newPassword"
              type="password"
              label="New Password"
              filled
              lazy-rules
              :rules="[
                (val) =>
                  val.length >= 6 ||
                  'Password must be at least 6 characters long',
              ]"
            />
            <q-input
              v-model="confirmPassword"
              type="password"
              label="Confirm Password"
              filled
              lazy-rules
              :rules="[
                (val) => val === newPassword || 'Passwords do not match',
              ]"
            />
          </q-card-section>

          <!-- Password Dialog Action Buttons -->
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              @click="showPasswordDialog = false"
            />
            <q-btn label="Change" color="primary" @click="changePassword" />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <!-- Image Dialog -->
      <q-dialog v-model="imageDialog" persistent>
        <q-card>
          <q-card-section class="q-pa-md">
            <img :src="user.avatar" alt="User Avatar" style="width: 100%" />
          </q-card-section>
          <q-card-actions>
            <q-btn label="Close" color="primary" @click="imageDialog = false" />
          </q-card-actions>
        </q-card>
      </q-dialog>
    </q-page>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

// Initial profile data
const user = ref({
  avatar: "https://cdn.quasar.dev/img/avatar.png",
  name: "Sandaruwan",
  role: "Software Engineer",
  email: "lsandaruwan388@gmail.com",
  phone: "828287297",
  address: "Blk 123 Bishan Street",
  joinedDate: "January 1, 1994",
  skills: "JavaScript, Vue.js, Quasar Framework, MongoDB, React Native",
});

// Edit Dialog State
const editDialog = ref(false);

// Password Change Dialog State
const showPasswordDialog = ref(false);
const newPassword = ref("");
const confirmPassword = ref("");

// Form Data for Editing Profile
const form = ref({ ...user.value });

// Image Dialog State
const imageDialog = ref(false);

// Save user data to local storage key
const STORAGE_KEY = "userProfile";

// Load user data from local storage on page load
onMounted(() => {
  const savedUser = localStorage.getItem(STORAGE_KEY);
  if (savedUser) {
    user.value = JSON.parse(savedUser); // Load from local storage
  }
});

// Open the dialog and copy user data to form
function openEditDialog() {
  form.value = { ...user.value }; // Copy user data into form
  editDialog.value = true;
}

// Close the dialog
function closeEditDialog() {
  editDialog.value = false;
}

// Save profile changes back to user object and store in local storage
function saveProfile() {
  user.value = { ...form.value }; // Save form data to user object
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user.value)); // Save to local storage
  closeEditDialog();
}

// Handle file selection and update avatar
function onFileChange(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      form.value.avatar = e.target.result; // Set the image source to the file's data URL
    };
    reader.readAsDataURL(file); // Convert the file to a data URL
  }
}

// Handle password change
function changePassword() {
  if (newPassword.value && newPassword.value === confirmPassword.value) {
    console.log("Password successfully changed:", newPassword.value);
    showPasswordDialog.value = false;
  } else {
    console.log("Passwords do not match or are invalid");
  }
}

// Open the image dialog
function openImageDialog() {
  imageDialog.value = true;
}
</script>

<style scoped>
/* Add any specific styles for the Profile page here */
</style>
