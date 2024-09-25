<template>
  <div class="q-pa-md">
    <q-page class="q-mt-md">
      <q-card class="q-pa-md">
        <q-card-section>
          <div class="row no-wrap">
            <!-- User Avatar -->
            <q-avatar size="100px" class="q-mr-md">
              <img
                src="https://cdn.quasar.dev/img/avatar.png"
                alt="User Avatar"
              />
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
          <q-btn label="Edit Profile" color="primary" />
          <q-btn label="Change Password" color="secondary" />
        </q-card-actions>
      </q-card>
    </q-page>
  </div>
</template>

<script setup>
// Profile data
const user = {
  name: "John Doe",
  role: "Software Engineer",
  email: "john.doe@example.com",
  phone: "+123 456 789",
  address: "1234 Street Name, City, Country",
  joinedDate: "January 1, 2020",
  skills: "JavaScript, Vue.js, Quasar Framework",
};
</script>

<style scoped>
/* Add any specific styles for the Profile page here */
</style>
