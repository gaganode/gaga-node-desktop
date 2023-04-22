export default [
  {
    path: "/example/adminv",
    component: () => import("../../pages/example/admin/AdminVisablePage.vue"),
  },
  //
  {
    path: "/example/tippy",
    component: () => import("../../pages/example/tippy/TippyPage.vue"),
  },
  //form
  {
    path: "/example/form/form",
    component: () => import("../../pages/example/form/FormPage.vue"),
  },
  //select
  {
    path: "/example/select/select",
    component: () => import("../../pages/example/select/SelectPage.vue"),
  },
  //input
  {
    path: "/example/input/simple",
    component: () => import("../../pages/example/input/SimplePage.vue"),
  },
  {
    path: "/example/input/validator",
    component: () => import("../../pages/example/input/ValidatorPage.vue"),
  },
  {
    path: "/example/input/checkbox",
    component: () => import("../../pages/example/input/CheckBoxPage.vue"),
  },
  {
    path: "/example/input/radio",
    component: () => import("../../pages/example/input/RadioPage.vue"),
  },
  {
    path: "/example/input/datetime",
    component: () => import("../../pages/example/input/DateTimePage.vue"),
  },
  {
    path: "/example/input/switch",
    component: () => import("../../pages/example/input/SwitchPage.vue"),
  },
  //button
  {
    path: "/example/button/main",
    component: () => import("../../pages/example/button/MainButtonPage.vue"),
  },
  //button
  {
    path: "/example/badge/badge",
    component: () => import("../../pages/example/badge/BadgePage.vue"),
  },
  //modal
  {
    path: "/example/modal/simple",
    component: () => import("../../pages/example/modal/ModalSimplePage.vue"),
  },
  {
    path: "/example/modal/dynamic",
    component: () => import("../../pages/example/modal/DynamicPage.vue"),
  },
  //toast
  {
    path: "/example/toast/simple",
    component: () => import("../../pages/example/toast/SimplePage.vue"),
  },
  //card
  {
    path: "/example/card/simple",
    component: () => import("../../pages/example/card/SimpleCardPage.vue"),
  },
  {
    path: "/example/card/gridstyle1",
    component: () => import("../../pages/example/card/GridCardStyle1Page.vue"),
  },
  {
    path: "/example/card/gridstyle2",
    component: () => import("../../pages/example/card/GridCardStyle2Page.vue"),
  },
  {
    path: "/example/card/gridstyle3",
    component: () => import("../../pages/example/card/GridCardStyle3Page.vue"),
  },
  //icon
  {
    path: "/example/icon/outline",
    component: () => import("../../pages/example/icon/OutlineIconPage.vue"),
  },
  {
    path: "/example/icon/solid",
    component: () => import("../../pages/example/icon/SolidIconPage.vue"),
  },
  {
    path: "/example/icon/custom",
    component: () => import("../../pages/example/icon/CustomPage.vue"),
  },
  {
    path: "/example/icon/color",
    component: () => import("../../pages/example/icon/ColorIconPage.vue"),
  },
  //tab
  {
    path: "/example/tab/style1",
    component: () => import("../../pages/example/tab/Style1Page.vue"),
  },
  {
    path: "/example/tab/modal",
    component: () => import("../../pages/example/tab/ModalTabPage.vue"),
  },
  {
    path: "/example/tab/step",
    component: () => import("../../pages/example/tab/StepPage.vue"),
  },
  //table
  {
    path: "/example/table/local",
    component: () => import("../../pages/example/table/LocalTablePage.vue"),
  },
  {
    path: "/example/table/remote",
    component: () => import("../../pages/example/table/RemoteTablePage.vue"),
  },
  //chart
  {
    path: "/example/chart/bar",
    component: () => import("../../pages/example/chart/BarChartPage.vue"),
  },
  {
    path: "/example/chart/line",
    component: () => import("../../pages/example/chart/LineChartPage.vue"),
  },
  //
  {
    path: "/example/progress/progress",
    component: () => import("../../pages/example/progress/ProgressPage.vue"),
  },
  {
    path: "/example/loader/loader",
    component: () => import("../../pages/example/loader/LoaderPage.vue"),
  },
  //
  {
    path: "/example/code/code",
    component: () => import("../../pages/example/code/CodePage.vue"),
  },
  //
  {
    path: "/example/list/simple",
    component: () => import("../../pages/example/list/SimpleListPage.vue"),
  },
];
