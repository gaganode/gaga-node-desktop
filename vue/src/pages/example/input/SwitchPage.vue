<script setup>
import SidebarLayout from "@/layouts/sidebar/SidebarLayout.vue";
import Switch from "../../../components/core/switch/Switch.vue";

import { ref } from "vue";

const switch_open_sm = ref(false);
const switch_open = ref(false);
const switch_open_lg = ref(false);
//
const switch_open_readonly = false;
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Switch input</h1>
        <p class="mt-3">Different types of switch styles</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Switch different sizes [sm default lg]</label>
          <p>[{{ switch_open_sm }},{{ switch_open }},{{ switch_open_lg }}]</p>
        </div>
        <div class="lg:col-span-2 mt-2 flex items-center">
          <Switch v-model="switch_open_sm" class="sm mr-3" />
          <Switch v-model="switch_open" />
          <Switch v-model="switch_open_lg" class="lg ml-3" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">ReadOnly Switch</label>
          <p>readonly mode of swtich :{{ switch_open_readonly }}</p>
        </div>
        <div class="lg:col-span-2 mt-2 flex items-center">
          <Switch v-model="switch_open_readonly" read-only />
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
