<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";

import { EnvelopeIcon, PlusIcon } from "@heroicons/vue/24/solid";
import { EnvelopeIcon as EnvelopeOutlineIcon } from "@heroicons/vue/24/outline";
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Buttons with different styles</h1>
        <p class="mt-3">primary->purple,info->blue,secondary->gray</p>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Primary Button</label>
          <p>Primary button of purple color</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-primary xs m-2">Button text</button>
          <button type="button" class="btn-primary sm m-2">Button text</button>
          <button type="button" class="btn-primary md m-2">Button text</button>
          <button type="button" class="btn-primary m-2">Button text</button>
          <button type="button" class="btn-primary lg m-2">Button text</button>
          <button type="button" class="btn-primary xl m-2">Button text</button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Primary Icon-Button </label>
          <p>Primary button with prefix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-primary xs m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-primary sm m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-primary md m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-primary m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-primary lg m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-primary xl m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Primary dark Icon-Button </label>
          <p>Primary button with dark icon</p>
        </div>
        <div class="lg:col-span-2 mt-2 inline-block">
          <button type="button" class="btn-primary m-2"><EnvelopeIcon class="prefix-icon dark" />Button text</button>
          <button type="button" class="btn-secondary m-2"><EnvelopeIcon class="prefix-icon dark" />Button text</button>
          <button type="button" class="btn-err m-2"><EnvelopeIcon class="prefix-icon dark" />Button text</button>    
          <button type="button" class="btn-success m-2"><EnvelopeIcon class="prefix-icon dark" />Button text</button>
          <button type="button" class="btn-warning m-2"><EnvelopeIcon class="prefix-icon dark" />Button text</button>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Err Icon-Button </label>
          <p>Err button with prefix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-err xs m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-err sm m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-err md m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-err m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-err lg m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-err xl m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Success Icon-Button </label>
          <p>Success button with prefix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-success xs m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-success sm m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-success md m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-success m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-success lg m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-success xl m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Warning Icon-Button </label>
          <p>Warning button with prefix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-warning xs m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-warning sm m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-warning md m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-warning m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-warning lg m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-warning xl m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Info Icon-Button </label>
          <p>Info button with prefix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-info xs m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-info sm m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-info md m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-info m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-info lg m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-info xl m-2"><EnvelopeIcon class="prefix-icon" />Button text</button>
        </div>
      </div>


      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Primary Icon-Button </label>
          <p>Primary button with suffix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-primary xs m-2">Button text<EnvelopeIcon class="suffix-icon" /></button>
          <button type="button" class="btn-primary sm m-2">Button text<EnvelopeIcon class="suffix-icon" /></button>
          <button type="button" class="btn-primary md m-2">Button text<EnvelopeIcon class="suffix-icon" /></button>
          <button type="button" class="btn-primary m-2">Button text<EnvelopeIcon class="suffix-icon" /></button>
          <button type="button" class="btn-primary lg m-2">Button text<EnvelopeIcon class="suffix-icon" /></button>
          <button type="button" class="btn-primary xl m-2">Button text<EnvelopeIcon class="suffix-icon" /></button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Secondary Button</label>
          <p>secondary button with prefix-icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-secondary xs m-2"><EnvelopeOutlineIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-secondary sm m-2"><EnvelopeOutlineIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-secondary md m-2"><EnvelopeOutlineIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-secondary m-2"><EnvelopeOutlineIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-secondary lg m-2"><EnvelopeOutlineIcon class="prefix-icon" />Button text</button>
          <button type="button" class="btn-secondary xl m-2"><EnvelopeOutlineIcon class="prefix-icon" />Button text</button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Info Button</label>
          <p>blue info button</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-info xs m-2">Button text</button>
          <button type="button" class="btn-info sm m-2">Button text</button>
          <button type="button" class="btn-info md m-2">Button text</button>
          <button type="button" class="btn-info m-2">Button text</button>
          <button type="button" class="btn-info lg m-2">Button text</button>
          <button type="button" class="btn-info xl m-2">Button text</button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Round Button</label>
          <p>round button of secondary style</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-secondary inline-flex rounded-full xs m-2">Button text</button>
          <button type="button" class="btn-secondary inline-flex rounded-full sm m-2">Button text</button>
          <button type="button" class="btn-secondary inline-flex rounded-full md m-2">Button text</button>
          <button type="button" class="btn-secondary inline-flex rounded-full m-2">Button text</button>
          <button type="button" class="btn-secondary inline-flex rounded-full lg m-2">Button text</button>
          <button type="button" class="btn-secondary inline-flex rounded-full xl m-2">Button text</button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Icon Button</label>
          <p>secondary button with no text only icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-secondary rounded-full no-text xs m-2"><EnvelopeOutlineIcon class="icon" /></button>
          <button type="button" class="btn-secondary rounded-full no-text sm m-2"><EnvelopeOutlineIcon class="icon" /></button>
          <button type="button" class="btn-secondary rounded-full no-text md m-2"><EnvelopeOutlineIcon class="icon" /></button>
          <button type="button" class="btn-secondary rounded-full no-text m-2"><EnvelopeOutlineIcon class="icon" /></button>
          <button type="button" class="btn-secondary rounded-full no-text lg m-2"><EnvelopeOutlineIcon class="icon" /></button>
          <button type="button" class="btn-secondary rounded-full no-text xl m-2"><EnvelopeOutlineIcon class="icon" /></button>
        </div>
      </div>

      <div class="pt-5 lg:grid lg:grid-cols-3 lg:gap-4">
        <div>
          <label for="username" class="flex">Icon Button</label>
          <p>primary button with no text only icon</p>
        </div>
        <div class="lg:col-span-2 mt-2">
          <button type="button" class="btn-primary rounded-full no-text xs m-2"><PlusIcon class="icon" /></button>
          <button type="button" class="btn-primary rounded-full no-text sm m-2"><PlusIcon class="icon" /></button>
          <button type="button" class="btn-primary rounded-full no-text md m-2"><PlusIcon class="icon" /></button>
          <button type="button" class="btn-primary rounded-full no-text m-2"><PlusIcon class="icon" /></button>
          <button type="button" class="btn-primary rounded-full no-text lg m-2"><PlusIcon class="icon" /></button>
          <button type="button" class="btn-primary rounded-full no-text xl m-2"><PlusIcon class="icon" /></button>
        </div>
      </div>
    </div>
  </SidebarLayout>
</template>
