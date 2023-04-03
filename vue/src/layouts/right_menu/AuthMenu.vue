<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";
import { UserCircleIcon, UserPlusIcon, PowerIcon, CursorArrowRaysIcon } from "@heroicons/vue/24/outline";
import useAuthStore from "@/stores/auth";
import { useI18n } from "vue-i18n";
import lang from "./auth_lang";
const { t } = useI18n({ messages: lang });

const auth_store = useAuthStore();

function signout() {
  auth_store.clear();
  window.location = "/signin";
}
</script>

<template>
  <Menu as="div" class="menu">
    <MenuButton type="button" class="menu-btn">
      <UserCircleIcon />
    </MenuButton>

    <MenuItems class="menu-items">
      <div v-if="auth_store.token == null">
        <MenuItem>
          <router-link to="/register" class="link">
            <UserPlusIcon class="left-icon" />
            {{ t("register") }}
          </router-link>
        </MenuItem>

        <MenuItem>
          <router-link to="/signin" class="link">
            <CursorArrowRaysIcon class="left-icon" />
            {{ t("sign_in") }}
          </router-link>
        </MenuItem>
      </div>

      <div v-if="auth_store.token != null">
        <MenuItem>
          <a @click="signout" class="link">
            <PowerIcon class="left-icon" />
            {{ t("sign_out") }}
          </a>
        </MenuItem>
      </div>
    </MenuItems>
  </Menu>
</template>
