const routes = [
  {
    path: "/",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/loginPage.vue") }],
  },
  {
    path: "/register",
    component: () => import("src/layouts/AuthLayout.vue"),
    children: [{ path: "", component: () => import("pages/registerPage.vue") }],
  },
  {
    path: "/home",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/books",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/BooksPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/authors",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AuthorsPage.vue") }],
    meta: { requiresAuth: true }
  },
  {
    path: "/get-authors",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/GetBooksAuthor.vue") }],
    meta: { requiresAuth: true }
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
