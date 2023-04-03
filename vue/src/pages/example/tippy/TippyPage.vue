<script setup>
import { InformationCircleIcon } from "@heroicons/vue/24/outline";

import SidebarLayout from "@/layouts/sidebar/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Tippy</h1>
        <p class="mt-3">Different types tippy</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label>tippy inside label default style</label>
          <p>Default tippy with default icon and different directions</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <label>default tippy<InformationCircleIcon class="ml-1 icon" v-tippy="{ placement: 'top', content: 'Look at me on the top!' }"></InformationCircleIcon></label>
          <label>default tippy<InformationCircleIcon class="ml-1 icon" v-tippy="{ placement: 'right', content: 'Look at me on the right!' }"></InformationCircleIcon></label>
          <label>default tippy<InformationCircleIcon class="ml-1 icon" v-tippy="{ placement: 'left', content: 'Look at me on the left!' }"></InformationCircleIcon></label>
          <label>default tippy<InformationCircleIcon class="ml-1 icon" v-tippy="{ placement: 'bottom', content: 'Look at me on the bottom!' }"></InformationCircleIcon></label>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label>tippy inside a button</label>
          <p>tippy text inside button</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" v-tippy="{ placement: 'bottom', content: 'tippy on button' }" class="btn-secondary m-2 sm">Button</button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label>tippy inside p tag style5</label>
          <p>Default tippy on the bottom inside p tag</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <p>
            this is a long text <InformationCircleIcon class="icon inline sm" v-tippy="{ placement: 'bottom', content: 'tippy on the bottom' }"></InformationCircleIcon>
            , with a information tippy inside the text
          </p>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label>tippy inside label sm size icon</label>
          <p>Default tippy on the right with small icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <label class="text-sm">tippy style1<InformationCircleIcon class="ml-1 icon sm" v-tippy="{ placement: 'right', content: 'tippy on the right' }"></InformationCircleIcon></label>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label>tippy inside label large size icon</label>
          <p>Default tippy on the left with large icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <label class="text-lg">tippy style3<InformationCircleIcon class="ml-1 icon lg" v-tippy="{ placement: 'left', content: 'tippy on the left' }"></InformationCircleIcon></label>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label>tippy inside label super large size icon</label>
          <p>Default tippy on the bottom with super large icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <label class="text-xl">tippy style4<InformationCircleIcon class="ml-1 icon xl" v-tippy="{ placement: 'bottom', content: 'tippy on the bottom' }"></InformationCircleIcon></label>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
