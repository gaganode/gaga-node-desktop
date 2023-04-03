import { TagIcon, ListBulletIcon, CodeBracketIcon, ArrowsPointingOutIcon, ViewColumnsIcon, TableCellsIcon, ChartBarIcon, FlagIcon, AdjustmentsHorizontalIcon, ChevronDoubleRightIcon, PlayIcon, WindowIcon, ChatBubbleLeftIcon, PhotoIcon, InformationCircleIcon, StopIcon, ViewfinderCircleIcon, CommandLineIcon, FolderIcon, ClipboardDocumentListIcon } from "@heroicons/vue/24/outline";

let example = [
  {
    name: "examples",
    icon: FolderIcon,
    open: true,
    children: [
      {
        name: "Admin Visable",
        icon: FlagIcon,
        open: false,
        href: "/example/adminv",
        auth: function (user) {
          return user.roles.includes("admin");
        },
      },
      {
        name: "Tippy",
        icon: InformationCircleIcon,
        open: false,
        href: "/example/tippy",
      },
      {
        name: "Select",
        icon: ViewfinderCircleIcon,
        open: false,
        children: [
          { name: "single", href: "/example/select/single_select" },
          { name: "multi", href: "/example/select/multi_select" },
        ],
      },
      {
        name: "Input",
        icon: CommandLineIcon,
        open: false,
        children: [
          { name: "simple", href: "/example/input/simple" },
          { name: "validator", href: "/example/input/validator" },
          { name: "checkbox", href: "/example/input/checkbox" },
          { name: "radio", href: "/example/input/radio" },
          { name: "date_time", href: "/example/input/datetime" },
          { name: "switch", href: "/example/input/switch" },
        ],
      },
      {
        name: "Form",
        icon: ClipboardDocumentListIcon,
        open: false,
        children: [{ name: "form", href: "/example/form/form" }],
      },
      {
        name: "List",
        icon: ListBulletIcon,
        open: false,
        children: [{ name: "list", href: "/example/list/simple" }],
      },
      {
        name: "Buttons",
        icon: PlayIcon,
        open: false,
        children: [{ name: "main_style", href: "/example/button/main" }],
      },
      {
        name: "Badge",
        icon: TagIcon,
        open: false,
        children: [{ name: "badge", href: "/example/badge/badge" }],
      },
      {
        name: "Modals",
        icon: WindowIcon,
        open: false,
        children: [
          { name: "simple", href: "/example/modal/simple" },
          { name: "dynamic", href: "/example/modal/dynamic" },
        ],
      },
      {
        name: "Toast",
        icon: ChatBubbleLeftIcon,
        open: false,
        children: [{ name: "simple", href: "/example/toast/simple" }],
      },
      {
        name: "Card",
        icon: StopIcon,
        open: false,
        children: [
          { name: "simple", href: "/example/card/simple" },
          { name: "grid card style1", href: "/example/card/gridstyle1" },
          { name: "grid card style2", href: "/example/card/gridstyle2" },
          { name: "grid card style3", href: "/example/card/gridstyle3" },
        ],
      },
      {
        name: "Icon",
        icon: PhotoIcon,
        open: false,
        children: [
          { name: "outline", href: "/example/icon/outline" },
          { name: "solid", href: "/example/icon/solid" },
          { name: "custom", href: "/example/icon/custom" },
          { name: "color", href: "/example/icon/color" },
        ],
      },
      {
        name: "Tab",
        icon: ViewColumnsIcon,
        open: false,
        children: [
          { name: "style1", href: "/example/tab/style1" },
          { name: "modal", href: "/example/tab/modal" },
          { name: "step", href: "/example/tab/step" },
        ],
      },
      {
        name: "Table",
        icon: TableCellsIcon,
        open: false,
        children: [
          { name: "local table", href: "/example/table/local" },
          { name: "remote table", href: "/example/table/remote" },
        ],
      },
      {
        name: "Chart",
        icon: ChartBarIcon,
        open: false,
        children: [
          { name: "bar", href: "/example/chart/bar" },
          { name: "line", href: "/example/chart/line" },
        ],
      },
      {
        name: "Progress",
        icon: AdjustmentsHorizontalIcon,
        open: false,
        children: [{ name: "progress", href: "/example/progress/progress" }],
      },
      {
        name: "Loader",
        icon: ArrowsPointingOutIcon,
        open: false,
        children: [{ name: "loader", href: "/example/loader/loader" }],
      },
      {
        name: "Code",
        icon: CodeBracketIcon,
        open: false,
        children: [{ name: "code", href: "/example/code/code" }],
      },
    ],
  },
];

export default example;
