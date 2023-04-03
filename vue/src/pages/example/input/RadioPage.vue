<script setup>
import SidebarLayout from "@/layouts/sidebar/SidebarLayout.vue";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Radio input</h1>
        <p class="mt-3">Different types of radio styles</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Label radio</label>
          <p>Checkbox with Label</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div>
            <label class="mr-1"><input type="radio" name="radio" class="mr-2" />radio 1</label>
            <p>this is the description of radio 1</p>
          </div>
          <div class="mt-3">
            <label class="mr-1"><input type="radio" name="radio" class="mr-2" />radio 2</label>
            <p>this is the description of radio 2</p>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Label simplelist</label>
          <p>Checkbox with Label</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <label class="mr-2 mt-2"><input type="radio" name="radio" class="mr-2" />Email</label>
          <label class="mr-2 mt-2"><input type="radio" name="radio" class="mr-2" />Phone(SMS)</label>
          <label class="mr-2 mt-2"><input type="radio" name="radio" class="mr-2" />Push Notification</label>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Label radio list</label>
          <p>Radio with Label</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="grid grid-cols-2 md:grid-cols-3">
            <label class="mt-3 col-span-1"><input type="radio" name="radiolist" class="mr-2" />radio 1 one </label>
            <label class="mt-3 col-span-1"><input type="radio" name="radiolist" class="mr-2" />radio 2 two</label>
            <label class="mt-3 col-span-1"><input type="radio" name="radiolist" class="mr-2" />radio 3 three</label>
            <label class="mt-3 col-span-1"><input type="radio" name="radiolist" class="mr-2" />radio 4 four</label>
            <label class="mt-3 col-span-1"><input type="radio" name="radiolist" class="mr-2" />radio 5 five</label>
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Sizes</label>
          <p>Radio with different size</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <input type="radio" name="radio-size" class="sm mr-3" />
          <input type="radio" name="radio-size" class="mr-3" />
          <input type="radio" name="radio-size" class="lg mr-3" />
          <input type="radio" name="radio-size" class="xl mr-3" />
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
