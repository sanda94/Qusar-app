<template>
  <q-item clickable tag="router-link" :to="link">
    <q-item-section v-if="icon" avatar>
      <q-icon :name="icon" />
    </q-item-section>

    <q-item-section>
      <q-item-label>{{ props.title }}</q-item-label>
      <q-item-label caption>{{ props.caption }}</q-item-label>
    </q-item-section>
  </q-item>
</template>

<script setup>
defineOptions({
  name: "EssentialLink",
});

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    default: "",
  },
  link: {
    type: [String, Object], // Allow both string and object for paths
    default: "#",
  },
  icon: {
    type: String,
    default: "",
  },
});
</script>

<style scoped>
/* Add any specific styles for the link here */
</style>
