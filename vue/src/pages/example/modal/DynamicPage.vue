<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";

import { inject } from "vue";
const swal = inject("$swal");

function showDynamic() {
  swal.fire({
      title: "this is the title?",
      text: "this is the text part",
      showDenyButton: true,
      showCancelButton: true,
      showConfirmButton: false,
      confirmButtonText: "Confirm",
      denyButtonText: "Reject",
    })
    .then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        console.log("confirmed");
      } else if (result.isDenied) {
        console.log("denied");
      } else {
        console.log("cancel");
      }
    });
}

async function showDyInputText() {
  const { value: text } = await swal.fire({
    title: "this is the title?",
    text: "this is the text part",
    input: "text",
    inputPlaceholder: "Enter the text",
    confirmButtonText: "Confirm my text",
  });

  if (text) {
    console.log("text", text);
  }
}

async function showDyInputPassword() {
  const { value: password } = await swal.fire({
    title: "this is the title?",
    text: "this is the text part",
    input: "password",
    inputPlaceholder: "Enter the password",
    confirmButtonText: "Confirm my password",
  });

  if (password) {
    console.log("password", password);
  }
}
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Dynamic Modal</h1>
        <p class="mt-3">Different types of dynamic modal</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">dynmaic confirm</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div @click="showDynamic" class="btn-primary">showDynamic</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">dynmaic input text</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div @click="showDyInputText" class="btn-primary">showDyInputText</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">dynmaic input password</label>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div @click="showDyInputPassword" class="btn-primary">showDyInputPassword</div>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
