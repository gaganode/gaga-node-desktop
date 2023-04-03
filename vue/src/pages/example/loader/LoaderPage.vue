<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import Loader from "../../../components/core/loader/Loader.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Loaders</h1>
        <p class="mt-3">Different types of loaders</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">loader over text</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <Loader show-loader="true">
            <p>xxxxxxxxx</p>
            <p>xxxxxxxxx</p>
            <p>xxxxxxxxx</p>
            <p>xxxxxxxxx</p>
            <p>xxxxxxxxx</p>
            <p>xxxxxxxxx</p>
          </Loader>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
