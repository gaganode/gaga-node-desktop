<script setup>
const props = defineProps(["showLoader"]);
</script>

<!-- <template>
  <div class="loader">
    <div v-show="props.showLoader" class="cover">
      <div class="icon-text-box">
        <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4 animate animate-spin">
          <circle cx="12" cy="12" r="10" class="stroke-slate-300" stroke-width="4" />
          <path d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2" class="stroke-indigo-500" stroke-width="4" />
        </svg>
        <span class="loading-text">loading..... (^ ^)</span>
      </div>
    </div>
    <div><slot></slot></div>
  </div>
</template> -->


<template>
  <div class="relative" style="border: 1px solid #efeff7; background: #fafafb">
    <div v-show="props.showLoader" class="w-full h-full absolute bg-white z-50 ">
      <div class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute bg-gray-100 border border-gray-200 shadow text-black rounded py-2 px-5 flex">
        <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4 animate animate-spin">
          <circle cx="12" cy="12" r="10" class="stroke-slate-300" stroke-width="4" />
          <path d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2" class="stroke-indigo-500" stroke-width="4" />
        </svg>
        <span class="ml-3 text-xs flex-inline text-gray-600">loading..... (^ ^)</span>
      </div>
    </div>
    <div><slot></slot></div>
  </div>
</template>

