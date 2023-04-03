<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";

import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from "chart.js";
import { Line } from "vue-chartjs";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

const data = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Data Two",
      backgroundColor: "#65a30d",
      borderColor: "#65a30d",
      data: [20, 9, 100, 30, 19, 50, 10],
      cubicInterpolationMode: "monotone",
      fill: false,
      pointStyle: "circle",
      pointRadius: 10,
      pointHoverRadius: 10,
    },
    {
      label: "Data Two",
      backgroundColor: "#475569",
      borderColor: "#475569",
      data: [30, 1, 30, 60, 9, 0, 100],
      fill: false,
    },
    {
      label: "Data One",
      backgroundColor: "#6366f1",
      borderColor: "#6366f1",
      data: [40, 39, 10, 40, 39, 80, 40],
      cubicInterpolationMode: "monotone",
      fill: true,
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
        <h1 class="text-2xl leading-6">Examples of line chart</h1>
        <p class="mt-3">This page is a demo of linechart with chart.js</p>
      </div>

      <div style="height: 250px">
        <Line :data="data" :options="options" />
      </div>
    </div>
  </SidebarLayout>
</template>
