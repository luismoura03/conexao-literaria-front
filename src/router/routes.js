const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/books",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/BooksPage.vue") }],
  },
  {
    path: "/authors",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/AuthorsPage.vue") }],
  },
  {
    path: "/get-authors",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/GetBooksAuthor.vue") }],
  },
  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
