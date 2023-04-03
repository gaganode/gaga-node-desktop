<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";

import Modal from "@/components/core/modal/Modal.vue";

import Switch from "../../../components/core/switch/Switch.vue";

import { PlusCircleIcon, PencilSquareIcon, MagnifyingGlassIcon, CalendarDaysIcon, ArrowPathIcon } from "@heroicons/vue/24/outline";

import { ref, toRaw } from "vue";

import GoodTable from "@/components/core/table/Table.vue";
import { NewTableMgr } from "@/components/core/table/table.js";

import ProgressBar from "../../../components/core/progress/ProgressBar.vue";

import { useToast } from "vue-toastification";
const toast = useToast();

////

let colums = [
    {
        label: "Id",
        field: "id",
    },
    {
        label: "Name",
        field: "name",
    },
    {
        label: "Email",
        field: "email",
    },
    {
        label: "Age",
        field: "age",
        type: "number",
    },
    {
        label: "Married",
        field: "married",
        type: "bool",
    },
    {
        label: "Created On",
        field: "createdAt",
        type: "date",
        dateInputFormat: "yyyy-MM-dd",
        dateOutputFormat: "MMM do yy",
    },
    {
        label: "Percent",
        field: "score",
        type: "percentage",
    },
    {
        label: "Action",
        field: "action",
    },
];


////////////////search///////////////////////

//for local mode just return all the records
//don't return total_count for local mode, otherwise you may have problem
async function searchFn(tableMgr) {
    await tableMgr.sleep(2000);
    return {
        meta_status: 1,
        meta_msg: "",
        data: [
            { id: 1, name: "John", email: "john@gmail.com", married: true, age: 20, createdAt: "2011-10-31", score: 33.43 },
            { id: 2, name: "Jane", email: "jane@gmail.com", married: false, age: 24, createdAt: "2011-10-31", score: 15.43 },
            { id: 3, name: "Susan", email: "crikck@gmail.com", married: true, age: 16, createdAt: "2011-10-30", score: 39.343 },
            { id: 4, name: "Chris", email: "jos@gmail.com", married: false, age: 55, createdAt: "2011-10-11", score: 51 },
            { id: 5, name: "Dan", email: "dan@gmail.com", married: false, age: 40, createdAt: "2011-10-21", score: 10 },
            { id: 6, name: "John", email: "xxx@gmail.com", married: true, age: 20, createdAt: "2011-10-31", score: 102 },
            { id: 7, name: "Phlip", email: "phlip@gmail.com", married: true, age: 20, createdAt: "1981-02-23", score: 3.43 },
            { id: 8, name: "Bob", email: "bob@gmail.com", married: true, age: 99, createdAt: "1922-10-31", score: 98.43 },
            { id: 9, name: "Jack", email: "jack@gmail.com", married: false, age: 5, createdAt: "2019-05-03", score: 1.343 },
            { id: 10, name: "Alice", email: "alice@qq.com", married: true, age: 33, createdAt: "1987-09-01", score: 73 },
            { id: 11, name: "Dan", email: "dan@gmail.com", married: false, age: 40, createdAt: "2011-10-21", score: 5 },
            { id: 12, name: "Xixzm", email: "zero@gmail.com", married: true, age: 78, createdAt: "1967-02-01", score: 1 },
        ],
    };
}

////////////////end of search///////////////////////

/////////////////create////////////////////////////

function initNewItem() {
    return {
        name: "",
        email: "",
    }
}

const newItem = ref(initNewItem());

function resetNewItem() {
    newItem.value = initNewItem()
}

async function createSubmit(tableMgr) {
    console.log("createSubmit called,with new data:", toRaw(newItem.value))
    await tableMgr.sleep(2000) //simulation of delay

    if (Math.random() < 0.5) {
        toast.error("create failed")
        return false;   //don't forget to return false
    } else {
        resetNewItem()
        toast.success("create successfully")
        return true; //don't forget to return true
    }
}

/////////////////end of create////////////////////////////

////////////////////////update////////////////////////////////////
async function updateDelete() {
    console.log("row to delete:", toRaw(currentRow.value))
    await tableMgr.sleep(2000) //simulation of delay
    if (Math.random() < 0.5) {
        toast.error("delete failed")
        return false;   //don't forget to return false
    } else {
        toast.success("delete successfully")
        return true; //don't forget to return true
    }
}

async function updateSubmit(tableMgr) {

    console.log("row to update:", toRaw(currentRow.value))

    await tableMgr.sleep(2000) //simulation of delay
    if (Math.random() < 0.5) {
        toast.error("update failed")
        return false;   //don't forget to return false
    } else {
        toast.success("update successfully")
        return true; //don't forget to return true
    }
}

////////////////////////end of update ////////////////////////////////////

//selection
function onSelectedRows(params) {
  console.log(params.selectedRows);
}


//////////////////////////
let table_callback = {
    searchFn: searchFn,
    createSubmit: createSubmit,
    updateDelete: updateDelete,
    updateSubmit: updateSubmit,
    onSelectedRows:onSelectedRows,
}

//custom your table page config
let t_config = {
    mode: 'local',
    current_page: 2,
    per_page: 5,
    sort: [],
    perPageDropdown: [5, 10, 50],
    select_enable:true,
}

let { tableMgr, currentRow,
    update_w_open, update_w_loader_open,
    create_w_open, create_w_loader_open } = NewTableMgr(t_config, colums, table_callback);

//inital loading
tableMgr.loadItems();

</script>

<template>
    <SidebarLayout>
        <div class="space-y-8">
            <div>
                <h1 class="text-2xl leading-6">Table</h1>
                <p class="mt-3">demo of a local table</p>
            </div>

            <div>
                <good-table :table-mgr="tableMgr">

                    <template #selected-row-actions>
                        <button class="btn-primary sm">selection Action</button>
                    </template>

                    <template #table-actions>

                        <button type="button" @click="tableMgr.OpenCreateWindow" class="btn-primary sm mr-3">
                            <PlusCircleIcon class="prefix-icon" />Create
                        </button>

                        <button type="button" @click="tableMgr.loadItems" class="btn-secondary sm mr-3">
                            <ArrowPathIcon class="prefix-icon" />Refresh
                        </button>
                    </template>

                    <template #table-row="props">
                        <span v-if="props.column.field === 'action'">
                            <button type="button" @click="tableMgr.OpenUpdateWindow(props.row)" class="btn-secondary xs">
                                <PencilSquareIcon class="prefix-icon" />Edit
                            </button>
                        </span>
                        <span v-else-if="props.column.field === 'email'">
                            <span class="badge secondary">{{ props.row[props.column.field] }}</span>
                        </span>
                        <span v-else-if="props.column.field === 'married'">
                            <Switch class="sm" v-model="props.row[props.column.field]" read-only></Switch>
                        </span>
                        <ProgressBar class="sm" v-else-if="props.column.field === 'score'" tippy="score:"
                            :percent="props.row[props.column.field]" />

                        <span v-else>{{ props.row[props.column.field] }}</span>
                    </template>
                </good-table>


                <Modal v-model:open="update_w_open" :showLoader="update_w_loader_open">
                    <template v-slot:header>Edit</template>
                    <template v-slot:body>
                        <div class="my-2">
                            <p>Email</p>
                            <input type="email" v-model="currentRow.email" class=" mt-1 rounded" />
                            <p class="mt-3">Name</p>
                            <input type="text" v-model="currentRow.name" class="  rounded mt-1" />
                        </div>
                    </template>
                    <template v-slot:footer>
                        <div class="justify-between flex w-full">
                            <button type="button" class="btn-err" @click="tableMgr.UpdateDelete">Delete</button>
                            <div>
                                <button type="button" class="btn-primary mr-3" @click="tableMgr.Update">Update</button>
                                <button type="button" class="btn-secondary"
                                    @click="tableMgr.CloseUpdateWindow">Cancel</button>
                            </div>
                        </div>
                    </template>
                </Modal>

                <Modal v-model:open="create_w_open" :showLoader="create_w_loader_open">
                    <template v-slot:header>Edit</template>
                    <template v-slot:body>
                        <div class="my-2">
                            <p>Email</p>
                            <input type="email" v-model="newItem.email" class="mt-1 rounded" />
                            <p class="mt-3">Name</p>
                            <input type="text" v-model="newItem.name" class="mt-1 rounded" />
                        </div>
                    </template>
                    <template v-slot:footer>
                        <button type="button" class="btn-secondary" @click="tableMgr.CloseCreateWindow">Cancel</button>
                        <button type="button" class="btn-primary mr-3" @click="tableMgr.Create">Create</button>
                    </template>
                </Modal>

            </div>
        </div>
    </SidebarLayout>
</template>
