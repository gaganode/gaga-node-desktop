<script setup>
import { LOAD_ROOT_OPTIONS } from "vue3-treeselect";
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { ref } from "vue";
import Treeselect from "vue3-treeselect";

const options = [
  {
    id: "fruits",
    label: "Fruits",
    children: [
      {
        id: "apple",
        label: "apple",
        isDisabled: true,
      },
      {
        id: "grapes",
        label: "Grapes 🍇",
      },
      {
        id: "pear",
        label: "Pear 🍐",
      },
      {
        id: "strawberry",
        label: "Strawberry 🍓",
      },
      {
        id: "watermelon",
        label: "Watermelon 🍉",
      },
    ],
  },
  {
    id: "vegetables",
    label: "Vegetables",
    children: [
      {
        id: "corn",
        label: "Corn 🌽",
      },
      {
        id: "carrot",
        label: "Carrot 🥕",
      },
      {
        id: "eggplant",
        label: "Eggplant 🍆",
      },
      {
        id: "tomato",
        label: "Tomato 🍅",
      },
    ],
  },
];

let value = ref(["apple"]);

let complex_value = ref("apple");

/////
const options2 = ["aaa", "bbb", "ccc", "ddd", "eee"].map((id) => ({
  id,
  label: `${id}`,
}));

let value2 = ref([]);

///////
let remote_options = ref(null);
const sleep = (d) => new Promise((r) => setTimeout(r, d));
async function loadOptions({ action /*, callback*/ }) {
  if (action === LOAD_ROOT_OPTIONS) {
    // Second try: simulate a successful loading.
    await sleep(2000);
    remote_options.value = ["a", "b", "c", "d", "e"].map((id) => ({
      id,
      label: `option-${id}`,
    }));
  }
}
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Multi Select</h1>
        <p class="mt-3">Multi select example</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex"> Multi complex select </label>
          <p>value:{{ value }}</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <treeselect v-model="value" :multiple="true" :options="options" :disable-branch-nodes="true" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex"> single complex select </label>
          <p>value:{{ complex_value }}</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <treeselect :searchable="false" :disable-branch-nodes="true" :show-count="true" :default-expand-level="1" v-model="complex_value" :multiple="false" :options="options" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex"> Multi simple select </label>
          <p>value:{{ value2 }}</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <treeselect v-model="value2" :multiple="true" :options="options2" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex"> Multi disabled select </label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <treeselect :multiple="true" :disabled="true" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex"> Multi remote loading select </label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <treeselect :load-options="loadOptions" :options="remote_options" :auto-load-root-options="false" :multiple="true" placeholder="Open the menu..." />
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
