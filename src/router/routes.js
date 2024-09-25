const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },
      { path: "Index", component: () => import("pages/IndexPage.vue") },
      {
        path: "SummaryPage",
        component: () => import("src/pages/SummaryPage.vue"),
      },
      {
        path: "ProfilePage",
        component: () => import("src/pages/ProfilePage.vue"),
      },
      { path: "UsersPage", component: () => import("src/pages/UsersPage.vue") },
      {
        path: "devicePage",
        component: () => import("src/pages/DevicePage.vue"),
      },
      { path: "RulesPage", component: () => import("src/pages/RulesPage.vue") },
    ],
  },

  // Catch-all route for undefined paths (error page)
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
