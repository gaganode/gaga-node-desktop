<script setup>
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { set_active } from "./MenuConfig.vue";
import { useI18n } from "vue-i18n";

import useAuthStore from "@/stores/auth";

import sidebar_message from "@/config/sidebar/lang";
const { t } = useI18n({ messages: sidebar_message });

const auth_store = useAuthStore();

defineProps(["navigation"]);

function item_auth(item, p) {
  if (!item.auth) {
    return true;
  }

  if (
    !item.auth({
      token: auth_store.token,
      roles: Object.assign([], auth_store.user.roles),
      permissions: Object.assign([], auth_store.user.permissions),
    })
  ) {
    return false;
  } else {
    return true;
  }
}
</script>

<template>
  <div v-for="item in navigation">
    <div v-if="item_auth(item)">
      <router-link v-if="!item.children" :to="item.href" @click="set_active(item.mid)" :class="[item.current ? 'bg-gray-100' : 'hover:bg-gray-50', 'text-gray-900 group w-full flex items-center pl-2 py-2 text-sm rounded-md']">
        <component :is="item.icon" :class="['text-gray-900 mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />
        {{ t(item.name) }}
      </router-link>

      <Disclosure v-else as="div" class="space-y-1" v-slot="{ open }" :defaultOpen="item.open">
        <DisclosureButton :class="[item.current ? 'bg-gray-100' : 'hover:bg-gray-50', ' text-gray-900 group w-full flex items-center pl-2 pr-1 py-2 text-left text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500']">
          <component :is="item.icon" class="mr-3 h-6 w-6 flex-shrink-0 text-gray-900" aria-hidden="true" />
          <span class="flex-1 text-gray-900">{{ t(item.name) }}</span>
          <svg :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" viewBox="0 0 20 20" aria-hidden="true">
            <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
          </svg>
        </DisclosureButton>
        <DisclosurePanel class="space-y-1">
          <template v-for="subItem in item.children">
            <div v-if="item_auth(subItem)">
              <router-link v-if="!subItem.children" @click="set_active(subItem.mid)" :to="subItem.href" :class="[subItem.current ? 'bg-gray-100' : 'hover:bg-gray-50', 'group flex w-full items-center rounded-md py-2 pl-11 pr-2 text-sm text-gray-900']"> <component :is="subItem.icon" :class="['text-gray-900  mr-3 flex-shrink-0 h-6 w-6']" aria-hidden="true" />{{ t(subItem.name) }}</router-link>
              <Disclosure as="div" v-else class="space-y-1" v-slot="{ open }" :defaultOpen="subItem.open">
                <DisclosureButton :class="[subItem.current ? 'bg-gray-100' : 'hover:bg-gray-50', 'text-gray-900 group w-full flex items-center pl-11 pr-1 py-2 text-left text-sm rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500']">
                  <component :is="subItem.icon" class="mr-3 h-6 w-6 flex-shrink-0 text-gray-900" aria-hidden="true" />
                  <span class="flex-1 text-gray-900">{{ t(subItem.name) }}</span>
                  <svg :class="[open ? 'text-gray-400 rotate-90' : 'text-gray-300', 'ml-3 h-5 w-5 flex-shrink-0 transform transition-colors duration-150 ease-in-out group-hover:text-gray-400']" viewBox="0 0 20 20" aria-hidden="true">
                    <path d="M6 6L14 10L6 14V6Z" fill="currentColor" />
                  </svg>
                </DisclosureButton>
                <DisclosurePanel class="space-y-1 pl-12">
                  <SidebarMenu :navigation="subItem.children"></SidebarMenu>
                </DisclosurePanel>
              </Disclosure>
            </div>
          </template>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>
