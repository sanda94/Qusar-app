<template>
  <q-page class="q-pa-md">
    <!-- Banner or Hero Section -->
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
      <!-- Action Buttons -->
      <q-banner-actions>
        <q-btn
          label="Get Started"
          color="white"
          text-color="primary"
          class="q-mr-sm"
        />
        <q-btn label="Learn More" color="white" text-color="primary" />
      </q-banner-actions>
    </q-banner>

    <!-- Featured Sections -->
    <div class="q-mt-xl q-px-md">
      <q-list>
        <q-item clickable tag="router-link" :to="{ path: '/profile' }">
          <q-item-section avatar>
            <q-icon name="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Profile</q-item-label>
            <q-item-label caption>Manage your profile details</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" :to="{ path: '/summary' }">
          <q-item-section avatar>
            <q-icon name="assessment" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Summary</q-item-label>
            <q-item-label caption>View your data summary</q-item-label>
          </q-item-section>
        </q-item>

        <q-item clickable tag="router-link" :to="{ path: '/devices' }">
          <q-item-section avatar>
            <q-icon name="devices" />
          </q-item-section>
          <q-item-section>
            <q-item-label>Devices</q-item-label>
            <q-item-label caption>Manage your devices</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
defineOptions({
  name: "HomePage",
});
</script>

<style scoped>
/* Additional home page styling */
.q-banner {
  border-radius: 8px;
}
</style>
