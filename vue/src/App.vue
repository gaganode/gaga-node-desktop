<script setup>
import { RouterView } from "vue-router";
import Spinner from "@/layouts/overlay/Spinner.vue";
</script>

<template>
  <spinner>
    <RouterView></RouterView>
  </spinner>
</template>
