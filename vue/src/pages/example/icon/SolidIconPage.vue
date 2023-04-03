<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import * as solid from "@heroicons/vue/24/solid";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Icon exmaple</h1>
        <p class="mt-3">icons of solid style</p>
      </div>

      <div class="grid md:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 grid-cols-2 gap-10 pt-8">
        <div class="col-span-1 card click py-8" v-for="(key, value) in solid">
          <component :is="key" class="h-5 w-5 m-auto" />
          <div class="mt-1 text-xs text-center">{{ value }}</div>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
