<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import { PaperClipIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";
import moment from "moment";
import hash_util from "@/utils/hash.js"


const file_name = ref(null)
const file_size = ref(null)
const file_lastmodified = ref(null)
const file_hash = ref(null)


function fixSize(byteSize) {
  if (byteSize < 1024) {
    return byteSize + "B";
  } else if (byteSize < 1024 * 1024) {
    return (byteSize / 1024).toFixed(2) + "KB";
  } else {
    return (byteSize / (1024 * 1024)).toFixed(2) + "MB";
  }
}


function fileInput(event) {

  let file = event.target.files[0];
  file_name.value = file.name;
  file_size.value = fixSize(file.size);
  file_lastmodified.value = moment(file.lastModified).utc().format("YYYY-MM-DD HH:mm:ss")

  var reader = new FileReader();
  reader.readAsArrayBuffer(file);
  reader.onload = (e) => {
    file_hash.value = hash_util.file_sha256(e.target.result);
  };
}

</script>

<template>
  <SidebarLayout>
    <form class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Profile</h1>
        <p class="mt-3">This information will be displayed publicly so be careful what you share.</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Email</label>
          <p>this is the email description if the length of the text</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <div class="input-wrap">
            <div class="prefix">http://</div>
            <input type="text" name="company-website" id="company-website" class="rounded pl-14"
              placeholder="www.example.com" />
          </div>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">About</label>
          <p>this is the about description</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <textarea id="about" name="about" rows="3" class="rounded" />
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Card with new style</label>
          <p>style for create/add</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <label class="card-new justify-center text-center pt-5 mt-5 w-full inline-block">
            <div class="btn-secondary sm">
              <PaperClipIcon class="icon mr-2"></PaperClipIcon>Upload a file
            </div>
            <p class="text-sm mt-2">or drag and drop PNG, JPG, GIF up to 10MB</p>
            <p class="font-bold text-xs mt-2">{{ file_name }}</p>
            <p class="text-xs mt-1">{{ file_size }}</p>
            <p class="text-xs mt-1">{{ file_lastmodified }}</p>
            <p class="text-xs mt-1">{{ file_hash }}</p>
            <input type="file" class="opacity-0" v-on:change="fileInput" />
          </label>
        </div>
      </div>
    </form>
  </SidebarLayout>
</template>
