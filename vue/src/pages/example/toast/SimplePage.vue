<script setup lang="jsx">
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

function show_primary_toast() {
  toast("I'm a toast!", { timeout: 1000 });
}

function show_primary_static_toast() {
  toast("click me to google", {
    timeout: false,
    onClick: function () {
      window.location = "https://google.com";
    },
  });
}

function show_primary_jsx_toast() {
  //<script setup lang="jsx">
  toast(
    <div>
      <label>My Title</label>
      <p>this is the description test p</p>
    </div>
  );
}

function show_info_toast() {
  toast.info("I'm a info toast!");
}

function show_success_toast() {
  toast.success("I'm a success toast!");
}

function show_warning_toast() {
  toast.warning("I'm a warning toast!");
}

function show_err_toast() {
  toast.error("I'm a error toast!");
}


function show_long_err_toast(){
  toast.error("I'm a long  long long long long long long long long long long long long toast!");
}

</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Toast</h1>
        <p class="mt-3">demo of a toast plugin</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple primary Toast</label>
          <p>A simple primary toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_primary_toast">show primary toast</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple primary static Toast</label>
          <p>A simple primary static toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_primary_static_toast">show primary static toast</div>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple primary jsx Toast</label>
          <p>A jsx toast , lang="jsx" must be set in setup</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_primary_jsx_toast">show primary jsx toast</div>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple Info Toast</label>
          <p>A simple information toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_info_toast">show info toast</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple Success Toast</label>
          <p>A simple green toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_success_toast">show success toast</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple warning Toast</label>
          <p>A simple warning toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_warning_toast">show warning toast</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Simple error Toast</label>
          <p>A simple error toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_err_toast">show error toast</div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Long error Toast</label>
          <p>A long text error toast</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="btn-secondary" @click="show_long_err_toast">show long error toast</div>
        </div>
      </div>

    </div>
  </SidebarLayout>
</template>
