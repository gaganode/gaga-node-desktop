<script setup>
import { VueGoodTable } from "vue-good-table-next";

const props = defineProps(["tableMgr"]);

</script>

<template>
  <vue-good-table v-if="props.tableMgr.config.mode=='remote'"
    :mode="props.tableMgr.config.mode"
    :pagination-options="props.tableMgr.pagination_options" 
    :select-options="props.tableMgr.select_options"
    :columns="props.tableMgr.columns"
    :rows="props.tableMgr.rows.value" 
    :totalRows="props.tableMgr.totalRecords.value"
    :isLoading.sync="props.tableMgr.isLoading.value"
    v-on:page-change="props.tableMgr.onPageChange"
    v-on:sort-change="props.tableMgr.onSortChange"
    v-on:per-page-change="props.tableMgr.onPerPageChange"
    v-on:selected-rows-change="props.tableMgr.onSelectedRows">

    <template #selected-row-actions>
      <slot name="selected-row-actions"></slot>
    </template>

    <template #table-actions>
      <slot name="table-actions"></slot>
      <div v-if="props.tableMgr.search_w_open.value" class="p-3 mt-1 bg-white border-1 border rounded">
        <slot name="search-window"></slot>
      </div>
    </template>

    <template #table-row="row_props">
      <slot name="table-row" :="row_props"></slot>
    </template>

  </vue-good-table>


  <vue-good-table v-if="props.tableMgr.config.mode=='local'"
    :mode="props.tableMgr.config.mode"
    :search-options="props.tableMgr.search_options"
    :pagination-options="props.tableMgr.pagination_options" 
    :select-options="props.tableMgr.select_options"
    :columns="props.tableMgr.columns"
    :rows="props.tableMgr.rows.value" 
    :totalRows="props.tableMgr.totalRecords.value"
    :isLoading.sync="props.tableMgr.isLoading.value"
    v-on:selected-rows-change="props.tableMgr.onSelectedRows">

    <template #selected-row-actions>
      <slot name="selected-row-actions"></slot>
    </template>

    <template #table-actions>
      <slot name="table-actions"></slot>
    </template>

    <template #table-row="row_props">
      <slot name="table-row" :="row_props"></slot>
    </template>

  </vue-good-table>

</template>
