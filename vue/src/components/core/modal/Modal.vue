<script setup>
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps(["open", "marginClose", "showLoader", "showCover", "class"]);
const emit = defineEmits(["update:open"]);
function margin_close() {
  if (props.marginClose) {
    close();
  }
}

function close() {
  emit("update:open", false);
}
</script>

<template>
  <TransitionRoot as="template" :show="props.open">
    <Dialog as="div" class="relative z-40" @close="margin_close">
      <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100"
        leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 overflow-y-auto">
        <div class="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel
              :class="['relative transform rounded-lg bg-white text-left shadow-xl transition-all xl:max-w-7xl my-8 min-w-[90%] xs:min-w-[80%] sm:min-w-[70%] md:min-w-[50%] lg:min-w-[40%] xl:min-w-[40%] 2xl:min-w-[30%]', props.class ? props.class : '']">
              <div v-show="props.showLoader" class="w-full h-full absolute bg-white z-50 opacity-90 rounded-lg">
                <div
                  class="top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute bg-gray-100 border border-gray-200 shadow text-black rounded py-2 px-5 flex">
                  <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4 animate animate-spin">
                    <circle cx="12" cy="12" r="10" class="stroke-slate-300" stroke-width="4" />
                    <path
                      d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2"
                      class="stroke-indigo-500" stroke-width="4" />
                  </svg>
                  <span class="ml-3 text-xs flex-inline text-gray-600">loading..... (^ ^)</span>
                </div>
              </div>

              <div v-show="props.showCover" class="w-full h-full absolute bg-white z-50 rounded-lg">
                <slot name="cover"></slot>
              </div>

              <div v-if="$slots.header"
                class="text-base py-4 px-6 lg:px-8 rounded-t-lg bg-gray-50 border-gray-100 border-b text-gray-500">
                <slot name="header"></slot>
              </div>

              <div class="absolute top-0 right-0 pt-4 pr-4">
                <button type="button" class="rounded-md text-gray-400 hover:text-gray-500" @click="close">
                  <XMarkIcon class="h-6 w-6" />
                </button>
              </div>
              <div class="bg-white px-6 lg:px-8 pt-3 pb-4 rounded-lg">
                <slot name="body"></slot>
              </div>
              <div v-if="$slots.footer" class="px-6 lg:px-8 bg-gray-50 py-3 pt-4 flex-row-reverse flex rounded-b-lg">
                <slot name="footer"></slot>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
