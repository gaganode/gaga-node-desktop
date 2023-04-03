<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { LanguageIcon } from "@heroicons/vue/24/outline";
import lang from "@/lang/lang";

const supported_langs = {
  en: "English",
  zh: "中文",
};
</script>

<template>
  <Menu as="div" class="menu">
    <MenuButton type="button" class="menu-btn">
      <LanguageIcon />
    </MenuButton>

    <MenuItems class="menu-items">
      <MenuItem v-for="(langtxt, lancode) in supported_langs">
        <a href="#" @click="lang.setLang(lancode)" class="link">{{ langtxt }}</a>
      </MenuItem>
    </MenuItems>
  </Menu>
</template>
