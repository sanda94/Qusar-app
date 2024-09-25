<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title> XPAC </q-toolbar-title>

        <div></div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> XPAC</q-item-label>

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
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import EssentialLink from "components/EssentialLink.vue";

defineOptions({
  name: "MainLayout",
});

const linksList = [
  {
    title: "Home",
    caption: "home",
    icon: "home",
    link: "/Index",
  },
  {
    title: "Summary",
    caption: "navigate Summary ",
    icon: "summarize",
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
    caption: "navigate Users ",
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

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>
