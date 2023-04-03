<template>
  <transition name="fade" mode="out-in" appear>
    <div v-if="$slots.default">
      <slot></slot>
    </div>
  </transition>
</template>
