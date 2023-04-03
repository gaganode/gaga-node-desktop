<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { UserIcon, CreditCardIcon, UsersIcon } from "@heroicons/vue/24/outline";
import { reactive, ref } from "vue";

import Tab from "@/components/core/tab/Tab.vue";

import Modal from "@/components/core/modal/Modal.vue";

const tabs_header = reactive([
  { name: "Applied", href: "#", icon: UserIcon, suffix: "52", active: true },
  { name: "Interview", href: "#", icon: UsersIcon, suffix: "4", active: false },
  { name: "Offer", href: "#", icon: CreditCardIcon, suffix: "1999", active: false },
  { name: "Disqualified", href: "#", icon: CreditCardIcon, suffix: "0", active: false },
]);

const open = ref(false);
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8">
      <div>
        <h1 class="text-2xl leading-6">Tab</h1>
        <p class="mt-3">demo of a modal window with tab</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Modal with tabs</label>
          <p>A modal window with tabs and margin-click close</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button class="btn-primary" @click="open = true">Open Modal with tabs inside</button>

          <Modal v-model:open="open" :margin-close="true">
            <template v-slot:body>
              <div class="mt-4 md:mt-6">
                <tab v-model:header="tabs_header" />
                <div class="pt-5 pb-10" style="min-height: 400px;">
                  <div v-show="tabs_header[0].active">Applied content</div>
                  <div v-show="tabs_header[1].active">Interview content</div>
                  <div v-show="tabs_header[2].active">Offer content</div>
                  <div v-show="tabs_header[3].active">Disqualified content</div>
                </div>
              </div>
            </template>
          </Modal>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
