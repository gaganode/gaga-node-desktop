<script setup>
// const tabs = reactive([
//   { name: "Applied", href: "#", icon: UserIcon, suffix: "52", active: true },
//   { name: "Interview", href: "#", icon: UsersIcon, suffix: "4", active: false },
//   { name: "Offer", href: "#", icon: CreditCardIcon, suffix: "1999", active: false },
//   { name: "Disqualified", href: "#", icon: CreditCardIcon, suffix: "0", active: false },
// ]);
import { reactive } from "vue";

const props = defineProps(["header"]);
const header = reactive(props.header);

const emit = defineEmits(["update:header"]);

function tab_click(name) {
  header.forEach((tab) => {
    if (tab.name == name) {
      tab.active = true;
    } else {
      tab.active = false;
    }
  });

  emit("update:header", header);
}
</script>

<template>
  <nav class="tab">
    <a v-for="(tab, name) in props.header" href="#" @click="tab_click(tab.name)" :class="[tab.active ? 'active' : 'inactive']">
      <component :is="tab.icon" :class="[tab.active ? 'active' : 'inactive']" />{{ tab.name }}<span v-if="tab.suffix" :class="[tab.active ? 'active' : 'inactive']">{{ tab.suffix }}</span>
    </a>
  </nav>
</template>
