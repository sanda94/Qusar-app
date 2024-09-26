const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      // Redirect to login if no path is provided
      { path: "", redirect: "/login" },
      // Index Page
      { path: "Index", component: () => import("pages/IndexPage.vue") },
      // Summary Page
      {
        path: "SummaryPage",
        component: () => import("src/pages/SummaryPage.vue"),
      },
      // Profile Page
      {
        path: "ProfilePage",
        component: () => import("src/pages/ProfilePage.vue"),
      },
      // Users Page
      { path: "UsersPage", component: () => import("src/pages/UsersPage.vue") },
      // Device Page
      {
        path: "DevicePage",
        component: () => import("src/pages/DevicePage.vue"),
      },
      // Rules Page
      { path: "RulesPage", component: () => import("src/pages/RulesPage.vue") },
      // Dashboard Page after login
      { path: "dashboard", component: () => import("pages/DashboardPage.vue") },
    ],
  },
  // Login Page
  {
    path: "/login",
    component: () => import("pages/LoginPage.vue"),
  },
  // Catch-all route for undefined paths (error page)
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
