<script setup>
import { ref, watch, computed, toRef } from "vue";
import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";

const props = defineProps(["options", "modelValue"]);

const all_options = [null];

let all_full_options = {};

props.options.forEach(element => {
  if (typeof element.value != undefined) {
    all_full_options[element.value] = element;
    all_options.push(element.value)
  }
})

const selected = ref(props.modelValue);

const prop_selected = toRef(props, 'modelValue')
watch(prop_selected, (new_prop_selected) => {
  selected.value = new_prop_selected
});


const emit = defineEmits(["update:modelValue"]);
watch(selected, (new_selected) => {
  emit("update:modelValue", new_selected);
});

let SelectedItem = computed(() => {
  let result = null;
  props.options.forEach(element => {
    if (typeof element.value != undefined && element.value == selected.value) {
      result = element
      return false
    }
  });
  return result
})

</script>

<template>
  <Listbox as="div" class="list-box" v-model="selected">
    <div class="relative mt-1">
      <ListboxButton class="list-box-btn w-full py-2 pl-3 pr-10">
        <template v-if="SelectedItem != null">
          <span class="list-header">
            <span v-if="(typeof SelectedItem.active != 'undefined')" :class="[SelectedItem.active ? 'active' : 'inactive', 'status']" ></span>
            <span class="name">{{ SelectedItem.name }}</span>
            <span v-if="(typeof SelectedItem.secondary != 'undefined')" class="secondary">{{ SelectedItem.secondary}}</span>
          </span>
          <span>{{ key }}</span>
        </template>
        <template v-else>
          <span class="list-header-empty">
            <span class="truncate">select</span>
          </span>
        </template>
        <span class="list-header-suffix">
          <ChevronUpDownIcon />
        </span>
      </ListboxButton>

      <ListboxOptions class="list-box-options">
        <template v-for="option in all_options">
          <ListboxOption as="template" v-if="option != null" :value="option" v-slot="{ active, selected }">
            <li :class="[active ? 'active' : 'inactive']">
              <div class="option-row">
                <span v-if="(typeof all_full_options[option].active != 'undefined')"
                  :class="[all_full_options[option].active ? 'active' : 'inactive', 'status']"></span>
                <span :class="[selected ? 'active' : 'inactive', 'name']">{{ all_full_options[option].name }}</span>
                <span :class="[active ? 'active' : 'inactive', 'secondary']">{{ all_full_options[option].secondary}}</span>
                <span v-if="selected" :class="[active ? 'active' : 'inactive', 'suffix']">
                  <CheckIcon />
                </span>
              </div>
            </li>
          </ListboxOption>

          <ListboxOption as="template" v-else :value="option" v-slot="{ active, selected }">
            <li :class="[active ? 'active' : 'inactive']">
              <div class="option-row">
                <span :class="[selected ? 'active' : 'inactive', 'name']">unselect</span>
                <span v-if="selected" :class="[active ? 'active' : 'inactive', 'suffix']">
                  <CheckIcon />
                </span>
              </div>
            </li>
          </ListboxOption>
        </template>
      </ListboxOptions>
    </div>
  </Listbox>
</template>
