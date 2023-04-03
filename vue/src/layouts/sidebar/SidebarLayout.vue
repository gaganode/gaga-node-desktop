<script setup>
import Fade from "@/layouts/overlay/Fade.vue";

import logImgUrl from "../../assets/logo.svg";

import LanMenu from "../right_menu/LanMenu.vue";
import AuthMenu from "../right_menu/AuthMenu.vue";

import { ref } from "vue";
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import SidebarMenu from "./SidebarMenu.vue";
import { Bars3Icon, XMarkIcon } from "@heroicons/vue/24/outline";

import { r_menu_config } from "./MenuConfig.vue";

import useOverlayStore from "@/stores/overlay";
import api from "@/api";
import useAuthStore from "@/stores/auth";

const sidebarOpen = ref(false);

const auth_store = useAuthStore();

if (auth_store.token == null || auth_store.token == "") {
  window.location = "/signin";
}

const show_sidebar = ref(false);
//getUserInfo
if (auth_store.user == null) {
  const overlay_store = useOverlayStore();
  overlay_store.showLoader();
  api.user.getUserInfo(auth_store.token).then((resp) => {
    if (resp.err != null || resp.result.meta_status < 0) {
      window.location = "/signin";
    } else {
      auth_store.setUser(resp.result.user);
    }
    overlay_store.hideLoader();
    show_sidebar.value = true;
  });
} else {
  show_sidebar.value = true;
}
</script>

<template>
  <div v-if="show_sidebar" class="min-h-full">
    <TransitionRoot as="template" :show="sidebarOpen">
      <Dialog as="div" class="relative z-40 lg:hidden" @close="sidebarOpen = false">
        <TransitionChild as="template" enter="transition-opacity ease-linear duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="transition-opacity ease-linear duration-300" leave-from="opacity-100" leave-to="opacity-0">
          <div class="fixed inset-0 bg-gray-600 bg-opacity-75"></div>
        </TransitionChild>

        <div class="fixed inset-0 z-40 flex">
          <TransitionChild as="template" enter="transition ease-in-out duration-300 transform" enter-from="-translate-x-full" enter-to="translate-x-0" leave="transition ease-in-out duration-300 transform" leave-from="translate-x-0" leave-to="-translate-x-full">
            <DialogPanel class="relative flex w-full max-w-xs flex-1 flex-col bg-white">
              <TransitionChild as="template" enter="ease-in-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in-out duration-300" leave-from="opacity-100" leave-to="opacity-0">
                <div class="absolute top-0 right-0 -mr-12 pt-2">
                  <button type="button" class="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" @click="sidebarOpen = false">
                    <XMarkIcon class="h-6 w-6 text-white" />
                  </button>
                </div>
              </TransitionChild>
              <div class="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                <div class="flex flex-shrink-0 items-center px-4">
                  <img class="h-8 w-auto" :src="logImgUrl" />
                </div>
                <nav class="mt-5 space-y-1 px-2">
                  <SidebarMenu :navigation="r_menu_config" />
                </nav>
              </div>
            </DialogPanel>
          </TransitionChild>
          <div class="w-14 flex-shrink-0"></div>
        </div>
      </Dialog>
    </TransitionRoot>

    <!-- Static sidebar for desktop -->
    <div class="hidden lg:fixed lg:inset-y-0 lg:flex ml-8 md:w-50 lg:w-60 lg:flex-col">
      <!-- Sidebar component, swap this element with another sidebar if you like -->
      <div class="flex min-h-0 flex-1 flex-col">
        <div class="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
          <div class="flex flex-shrink-0 items-center px-4">
            <img class="h-8 w-auto" :src="logImgUrl" />
          </div>
          <nav class="mt-5 flex-1 space-y-1 bg-white px-2">
            <SidebarMenu :navigation="r_menu_config" />
          </nav>
        </div>
      </div>
    </div>

    <div class="flex flex-1 flex-col lg:pr-8 lg:pl-80">
      <div class="sticky top-0 z-30 flex h-16 flex-shrink-0 bg-white">
        <button type="button" class="px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 lg:hidden" @click="sidebarOpen = true">
          <Bars3Icon class="h-6 w-6" aria-hidden="true" />
        </button>
        <div class="flex flex-1 justify-between px-4">
          <div class="flex flex-1"></div>
          <div class="ml-4 flex items-center md:ml-6">
            <LanMenu></LanMenu>
            <AuthMenu></AuthMenu>
          </div>
        </div>
      </div>

      <main class="flex-1">
        <div class="mx-auto px-4 sm:px-6">
          <div class="grid grid-cols-12">
            <div class="col-span-12 xl:col-span-12 lg:pt-0 pt-5 pb-20">
              <fade>
                <slot></slot>
              </fade>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>
