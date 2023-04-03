<script setup>
import SidebarLayout from "@/layouts/sidebar/SidebarLayout.vue";
import ProgressBar from "../../../components/core/progress/ProgressBar.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Progress bar</h1>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar default</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="15"/>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar err style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="25" class="err"/>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar success style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="35" class="success"/>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar info style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="45" class="info"/>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar warning style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="55" class="warning"/>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar dark style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="65" class="dark"/>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar dark small style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="65" class="dark sm"/>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">progress bar dark large style</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <ProgressBar :percent="65" class="dark lg"/>
        </div>
      </div>

    </div>
  </SidebarLayout>
</template>
