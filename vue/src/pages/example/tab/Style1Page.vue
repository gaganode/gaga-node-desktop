<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { UserIcon, CreditCardIcon, UsersIcon } from "@heroicons/vue/24/outline";
import { reactive } from "vue";

import Tab from "@/components/core/tab/Tab.vue";

const tabs_header = reactive([
  { name: "Applied", href: "#", icon: UserIcon, suffix: "52", active: true },
  { name: "Interview", href: "#", icon: UsersIcon, suffix: "4", active: false },
  { name: "Offer", href: "#", icon: CreditCardIcon, suffix: "1999", active: false },
  { name: "Disqualified", href: "#", icon: CreditCardIcon, suffix: "0", active: false },
]);
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl leading-6">Tab</h1>
        <p class="mt-3">demo of a tab</p>
      </div>

      <tab v-model:header="tabs_header" />
      <div v-show="tabs_header[0].active">Applied content</div>
      <div v-show="tabs_header[1].active">Interview content</div>
      <div v-show="tabs_header[2].active">Offer content</div>
      <div v-show="tabs_header[3].active">Disqualified content</div>
    </div>
  </SidebarLayout>
</template>
