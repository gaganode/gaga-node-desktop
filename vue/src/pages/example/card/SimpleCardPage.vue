<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Card exmaple</h1>
        <p class="mt-3">card with different sytles</p>
      </div>

      
      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple card</label>
          <p>a default simple card</p>
        </div>
        <div class="lg:col-span-2">
          <div class="card inline-flex mr-6 mt-2 auto-fit">card simple</div>
          <div class="card inline-flex mr-6 mt-2 click auto-fit">card with hover pointer</div>
          <div class="card inline-flex mr-6 mt-2 shadow auto-fit">card with shadow</div>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
