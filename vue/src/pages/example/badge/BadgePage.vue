<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { StarIcon, XMarkIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Badges</h1>
        <p class="mt-3">Different types of badges</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div class="flex gap-x-2">
          <span class="badge">Badge</span>
          <span class="badge secondary">Badge</span>
          <span class="badge err">Badge</span>
          <span class="badge warning">Badge</span>
          <span class="badge success">Badge</span>
          <span class="badge info">Badge</span>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div class="flex gap-x-2">
          <span class="badge"><StarIcon class="icon" />Badge</span>
          <span class="badge">Badge<StarIcon class="icon" /></span>
          <span class="badge"><StarIcon class="icon" />Badge<StarIcon class="icon" /></span>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div class="flex gap-x-2">
          <span class="badge btn" v-tippy="{ placement: 'bottom', content: 'remove this badge' }">Badge<XMarkIcon class="icon" /></span>
          <span class="badge info btn" v-tippy="{ placement: 'bottom', content: 'remove this badge' }">Badge<XMarkIcon class="icon" /></span>
          <span class="badge warning btn" v-tippy="{ placement: 'bottom', content: 'remove this badge' }">Badge<XMarkIcon class="icon" /></span>
          <span class="badge success btn" v-tippy="{ placement: 'bottom', content: 'remove this badge' }">Badge<XMarkIcon class="icon" /></span>
          <span class="badge err btn" v-tippy="{ placement: 'bottom', content: 'remove this badge' }">Badge<XMarkIcon class="icon" /></span>
          <span class="badge secondary btn" v-tippy="{ placement: 'bottom', content: 'remove this badge' }">Badge<XMarkIcon class="icon" /></span>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div class="flex gap-x-2 items-center">
          <span class="badge lg">Badge</span>
          <span class="badge lg"><StarIcon class="icon" />Badge<StarIcon class="icon" /></span>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
