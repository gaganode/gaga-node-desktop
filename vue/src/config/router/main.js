export default [
  {
    path: "/",
    name: "desktop",
    component: () => import("../../pages/desktop/DesktopPage.vue"),
  },
  {
    path: "/:pathMatch(.*)*",
    name: "page not found",
    component: () => import("../../pages/main/notfound/NotfoundPage.vue"),
  },
];
