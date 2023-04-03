<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";

import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  datasets: [
    {
      label: "Data One",
      backgroundColor: "#6366f1",
      data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
    },
  ],
};
const options = {
  responsive: true,
  maintainAspectRatio: false,
};
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of bar chart</h1>
        <p class="mt-3">This page is a demo of barchart with chart.js</p>
      </div>

      <div style="height: 250px">
        <Bar :data="data" :options="options" />
      </div>
    </div>
  </SidebarLayout>
</template>
