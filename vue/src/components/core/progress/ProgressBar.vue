<script setup>
import { computed } from 'vue';

const props = defineProps(["percent", "class", "tippy"]);

const percent = computed(() => {
  if (props.percent > 100) {
    return 100
  } else if (props.percent < 0) {
    return 0
  } else {
    return props.percent
  }
});

</script>
<template>
  <div class="progress-bar"
    v-tippy="{ placement: 'top', content: (props.tippy ? props.tippy : '') + props.percent + '%' }">
    <div :class="[props.class ? props.class : '', 'internal']" :style="'width:' + percent + '%'">&nbsp;</div>
  </div>
</template>
