<template>
  <li class="relative py-5 px-4 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 hover:bg-gray-100">
    <div class="flex justify-between space-x-3">
      <div class="min-w-0 flex-1">
        <div class="block focus:outline-none">
          <div class="truncate text-sm font-medium text-gray-600 flex">
            <slot name="title"></slot>
          </div>
          <p class="truncate text-sm text-gray-500">
            <slot name="subject"></slot>
          </p>
        </div>
      </div>
      <div class="flex-shrink-0 whitespace-nowrap text-sm text-gray-500">
        <slot name="suffix"></slot>
      </div>
    </div>
    <div class="mt-1">
      <p class="text-sm text-gray-600 line-clamp-2">
        <slot name="body"></slot>
      </p>
    </div>
  </li>
</template>
