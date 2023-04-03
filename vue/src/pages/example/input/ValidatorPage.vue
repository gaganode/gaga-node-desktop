<script setup>
import validator from "@/utils/validator.js";
import { ref, computed } from "vue";
import { ExclamationCircleIcon, InformationCircleIcon, CheckIcon } from "@heroicons/vue/24/outline";
import SidebarLayout from "@/layouts/sidebar/SidebarLayout.vue";
///
let email = ref("");
let validate_email = computed(() => {
  return email.value == "" ? true : validator.validateEmail(email.value);
});
///
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of input</h1>
        <p class="mt-3">Different types of input with code</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Email validator</label>
          <p>show green when correct, show red when err, show default if empty</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <input type="email" name="email" id="email" placeholder="input your email" v-model="email" class="rounded" :class="validate_email ? '' : 'err'" />
            <div :class="validate_email ? 'invisible' : ''" class="suffix">
              <ExclamationCircleIcon class="h-5 w-5 text-err" />
            </div>
            <div :class="validate_email && email != '' ? 'visible' : 'invisible'" class="suffix">
              <CheckIcon class="h-5 w-5 text-success" />
            </div>
          </div>
          <p :class="validate_email ? 'invisible' : ''" class="mt-2 text-err">Please input a correct email</p>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
