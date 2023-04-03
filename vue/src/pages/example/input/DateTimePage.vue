<script setup>
import SidebarLayout from "@/layouts/sidebar/SidebarLayout.vue";
import { CalendarDaysIcon } from "@heroicons/vue/24/outline";
import { ref } from "vue";

const date = ref(new Date(Date.UTC(2022, 0, 22, 0, 0, 0)));
const datetime = ref(new Date(Date.UTC(2022, 0, 22, 10, 10, 30)));

const date_range = ref({
  start: new Date(2020, 0, 6),
  end: new Date(2020, 0, 9),
});

const datetime_range = {
  start: new Date(Date.UTC(2022, 0, 22, 0, 0, 0)),
  end: new Date(Date.UTC(2022, 0, 23, 10, 3, 0)),
};

</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of Checkbox input</h1>
        <p class="mt-3">Different types of checkbox styles</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Date</label>
          <p>input with datat picker</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <v-date-picker v-model="date" timezone="UTC" is24hr color="indigo">
            <template v-slot="{ inputValue, togglePopover }">
              <div class="input-wrap">
                <div class="prefix">
                  <CalendarDaysIcon class="icon" />
                </div>
                <input type="text" class="rounded pl-10" :value="inputValue" v-on:click="togglePopover" @keypress.prevent />
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Datetime</label>
          <p>input with datatime picker</p>
        </div>

        <div class="lg:col-span-2 mt-2">
          <v-date-picker v-model="datetime" mode="dateTime" timezone="UTC" :minute-increment="5" is24hr color="indigo">
            <template v-slot="{ inputValue, togglePopover }">
              <div class="input-wrap">
                <div class="prefix">
                  <CalendarDaysIcon class="icon" />
                </div>
                <input type="text" class="rounded pl-10" :value="inputValue" v-on:click="togglePopover" @keypress.prevent />
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Date range</label>
          <p>input with date range picker</p>
        </div>

        <div class="lg:col-span-2 mt-2">
          <v-date-picker v-model="date_range" timezone="UTC" is-range is24hr color="indigo">
            <template v-slot="{ inputValue, togglePopover }">
              <div class="input-wrap">
                <div class="prefix">
                  <CalendarDaysIcon class="icon" />
                </div>
                <input type="text" class="rounded pl-10" :value="inputValue.start + ' - ' + inputValue.end" v-on:click="togglePopover" @keypress.prevent />
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Datetime range</label>
          <p>input with datetime range picker</p>
        </div>

        <div class="lg:col-span-2 mt-2">
          <v-date-picker v-model="datetime_range" timezone="UTC" mode="dateTime" is-range is24hr color="indigo">
            <template v-slot="{ inputValue, togglePopover }">
              <div class="input-wrap">
                <div class="prefix">
                  <CalendarDaysIcon class="icon" />
                </div>
                <input type="text" class="rounded pl-10" :value="inputValue.start + ' - ' + inputValue.end" v-on:click="togglePopover" @keypress.prevent />
              </div>
            </template>
          </v-date-picker>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
