<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { ArrowDownIcon, ArrowUpIcon, UsersIcon, EnvelopeOpenIcon, CursorArrowRaysIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl leading-6">Card with grid</h1>
        <p class="mt-3">card with different grid style</p>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <div class="card">
          <div class="flex m-5">
            <div class="card-primary p-3 mr-4">
              <UsersIcon class="h-7 w-7"></UsersIcon>
            </div>
            <div>
              <p>Total Subscribers</p>
              <label class="text-2xl">
                <div>71,897</div>
                <ArrowUpIcon class="icon ml-2 text-success"></ArrowUpIcon>
                <span class="text-success">122</span>
              </label>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 rounded-b-lg">
            <a href="#" class="a-primary font-medium"> View all</a>
          </div>
        </div>

        <div class="card">
          <div class="flex m-5">
            <div class="card-primary p-3 mr-4">
              <EnvelopeOpenIcon class="h-7 w-7"></EnvelopeOpenIcon>
            </div>
            <div>
              <p>Avg. Open Rate</p>
              <label class="text-2xl">
                <div>58.16%</div>
                <ArrowUpIcon class="icon ml-2 text-success"></ArrowUpIcon>
                <span class="text-success">122</span>
              </label>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 rounded-b-lg">
            <a href="#" class="a-primary font-medium"> View all</a>
          </div>
        </div>

        <div class="card">
          <div class="flex m-5">
            <div class="card-primary p-3 mr-4">
              <CursorArrowRaysIcon class="h-7 w-7"></CursorArrowRaysIcon>
            </div>
            <div>
              <p>Avg. Click Rate</p>
              <label class="text-2xl">
                <div>24.57%</div>
                <ArrowDownIcon class="icon ml-2 text-err"></ArrowDownIcon>
                <span class="text-err">3.2%</span>
              </label>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 rounded-b-lg">
            <a href="#" class="a-primary font-medium"> View all</a>
          </div>
        </div>

        <div class="card">
          <div class="flex m-5">
            <div class="card-primary p-3 mr-4">
              <CursorArrowRaysIcon class="h-7 w-7"></CursorArrowRaysIcon>
            </div>
            <div>
              <p>Avg. Click Rate</p>
              <label class="text-2xl">
                <div>24.57%</div>
                <ArrowDownIcon class="icon ml-2 text-err"></ArrowDownIcon>
                <span class="text-err">3.2%</span>
              </label>
            </div>
          </div>
          <div class="bg-gray-50 px-4 py-3 sm:px-6 rounded-b-lg">
            <a href="#" class="a-primary"> View all</a>
          </div>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
