const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "IndexPage", component: () => import("pages/IndexPage.vue") },
      { path: "SummaryPage", component: () => import("pages/SummaryPage.vue") },
      { path: "ProfilePage", component: () => import("pages/ProfilePage.vue") },
      { path: "UsersPage", component: () => import("pages/UsersPage.vue") },
      { path: "DevicePage", component: () => import("pages/DevicePage.vue") },
      { path: "RulesPage", component: () => import("pages/RulesPage.vue") },
    ],
  },
  {
    path: "/loginPage",
    component: () => import("src/pages/LoginPage.vue"),
  },
  {
    path: "/RegisterPage", // Add this route
    component: () => import("src/pages/RegisterPage.vue"),
  },
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
