<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { Codemirror } from "vue-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { json } from "@codemirror/lang-json";
import { ref } from "vue";

const extensions = [javascript(), json()];
const code = ref(`
let x=["a","c","c"];
let y=["a","c","c"];
let z=x+y;
let a={a:"123",b:"456"}
`);
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of CodeEditor</h1>
        <p class="mt-3">Different types of code</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">loader over text</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <codemirror v-model="code" placeholder="Code goes here..." :style="{ height: '400px' }" :autofocus="true" :indent-with-tab="true" :tab-size="2" :extensions="extensions" />
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
