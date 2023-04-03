<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { ExclamationTriangleIcon, XMarkIcon, InformationCircleIcon, AcademicCapIcon } from "@heroicons/vue/24/solid";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Icon exmaple</h1>
        <p class="mt-3">icons of outline style</p>
      </div>

      <div>
        <div class="p-3 card-primary mr-3 mt-3 inline-block">
          <AcademicCapIcon class="icon m-auto" />
          <div>primary</div>
        </div>

        <div class="card-success p-3 mr-3 mt-3 inline-block">
          <ExclamationTriangleIcon class="icon m-auto" />
          <div>success</div>
        </div>

        <div class="p-3 card-info mr-3 mt-3 inline-block">
          <InformationCircleIcon class="icon m-auto" />
          <div>info</div>
        </div>

        <div class="p-3 card-warning mr-3 mt-3 inline-block">
          <ExclamationTriangleIcon class="icon m-auto" />
          <div>warning</div>
        </div>

        <div class="p-3 card-err mr-3 mt-3 inline-block">
          <XMarkIcon class="icon m-auto" />
          <div>err</div>
        </div>

        <div class="p-3 card-purple mr-3 mt-3 inline-block">
          <AcademicCapIcon class="icon m-auto" />
          <div>purple</div>
        </div>
      </div>

      <div>
        <div class="p-3 card-primary mr-3 mt-3 inline-block">
          <AcademicCapIcon class="icon m-auto" />
        </div>

        <div class="card-success p-3 mr-3 mt-3 inline-block">
          <ExclamationTriangleIcon class="icon m-auto" />
        </div>

        <div class="p-3 card-info mr-3 mt-3 inline-block">
          <InformationCircleIcon class="icon m-auto" />
        </div>

        <div class="p-3 card-warning mr-3 mt-3 inline-block">
          <ExclamationTriangleIcon class="icon m-auto" />
        </div>

        <div class="p-3 card-err mr-3 mt-3 inline-block">
          <XMarkIcon class="icon m-auto" />
        </div>

        <div class="p-3 card-purple mr-3 mt-3 inline-block">
          <AcademicCapIcon class="icon m-auto" />
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
