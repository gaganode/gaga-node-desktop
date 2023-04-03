<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { InformationCircleIcon, UsersIcon, EnvelopeOpenIcon, CursorArrowRaysIcon } from "@heroicons/vue/24/outline";

const stats = [
  { id: 1, name: "Total Subscribers", stat: "71,897", icon: UsersIcon, change: "122", changeType: "increase" },
  { id: 2, name: "Avg. Open Rate", stat: "58.16%", icon: EnvelopeOpenIcon, change: "5.4%", changeType: "increase" },
  { id: 3, name: "Avg. Click Rate", stat: "24.57%", icon: CursorArrowRaysIcon, change: "3.2%", changeType: "decrease" },
];
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl leading-6">Card with grid</h1>
        <p class="mt-3">card with different grid style</p>
      </div>

      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div v-for="item in stats" :key="item.name" class="card px-5 pt-3 pb-4">
          <p class="flex">{{ item.name }} <InformationCircleIcon class="ml-1 icon inline-flex" v-tippy="{ placement: 'top', content: 'Look at me on the top!' }"></InformationCircleIcon></p>
          <p>some sub text description about the title</p>
          <label class="text-2xl mt-1">{{ item.stat }}</label>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
