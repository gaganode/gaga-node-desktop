<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { ArrowUpIcon, ArrowDownIcon } from "@heroicons/vue/24/outline";

const stats = [
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
  { name: "Total Subscribers", stat: "71,897", previousStat: "previous 70,946", change: "12%", changeType: "increase" },
];
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl leading-6">Card with grid</h1>
        <p class="mt-3">card with different grid style</p>
      </div>

      <div class="mt-5 grid grid-cols-2 card md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6">
        <div v-for="item in stats" :key="item.name" class="px-6 py-5">
          <label>{{ item.name }}</label>
          <p>from {{ item.previousStat }}</p>
          <div>
            <span class="text-2xl text-primary font-semibold"> {{ item.stat }}</span>
            <div class="ml-3 card-success inline-flex p-1">
              <ArrowUpIcon class="text-success icon sm"></ArrowUpIcon>
              <span class="text-xs">{{ item.change }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
