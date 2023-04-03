<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of admin visable</h1>
        <p class="mt-3">This page is only visable to user with 'admin' role</p>
      </div>

      <div>This page is only visable to user with 'admin' role</div>
    </div>
  </SidebarLayout>
</template>
