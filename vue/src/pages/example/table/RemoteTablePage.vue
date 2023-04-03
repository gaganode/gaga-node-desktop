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


///////////search///////////////////////
function initSearchCondition() {
    return {
        age_start: "",
        age_end: "",
        date_range: {
            start: new Date(1998, 0, 0),
            end: new Date(2099, 0, 0),
        },
        name: "",
    }
}

const search_condition = ref(initSearchCondition());

function ResetSearch() {
    search_condition.value = initSearchCondition();
}


async function searchFn(tableMgr) {
    console.log("tableMgr.getLimitOffset()", tableMgr.getLimitOffset())
    console.log("search_condition :", toRaw(search_condition.value))

    await tableMgr.sleep(2000);
    return {
        meta_status: 1,
        meta_msg: "",
        total_count: 1000,      //don't forget to return total_count for remote mode ,otherwise you have problem
        data: [
            { id: 1, name: "John", email: "john@gmail.com", married: true, age: 20, createdAt: "2011-10-31", score: 33.43 },
            { id: 2, name: "Jane", email: "jane@gmail.com", married: false, age: 24, createdAt: "2011-10-31", score: 30.43 },
            { id: 3, name: "Susan", email: "crikck@gmail.com", married: true, age: 16, createdAt: "2011-10-30", score: 3.343 },
            { id: 4, name: "Chris", email: "jos@gmail.com", married: false, age: 55, createdAt: "2011-10-11", score: 43 },
            { id: 5, name: "Dan", email: "dan@gmail.com", married: false, age: 40, createdAt: "2011-10-21", score: 10 },
        ],
    };
}

///////////end of search///////////////////////



///////////create///////////////////////

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


///////////end of create///////////////////////

///////////////update /////////////////////////////////////
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

/////////////// end of update /////////////////////////////////////

//////////////////////////
let table_callback = {
    searchFn: searchFn,
    createSubmit: createSubmit,
    updateDelete: updateDelete,
    updateSubmit: updateSubmit,
}

//custom your table config
let table_config = {
    mode: 'remote',
    select_enable:false,
    // comment off to use default 
    // current_page: 1,
    // per_page: 5,
    // sort: [],
    // perPageDropdown: [5, 10, 50]
}

let { tableMgr, currentRow,
    update_w_open, update_w_loader_open,
    create_w_open, create_w_loader_open } = NewTableMgr(table_config, colums, table_callback);

//inital loading
tableMgr.loadItems();

</script>

<template>
    <SidebarLayout>
        <div class="space-y-8">
            <div>
                <h1 class="text-2xl leading-6">Table</h1>
                <p class="mt-3">demo of a remote table</p>
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
                        <button type="button" @click="tableMgr.toggleSearchWindow" class="btn-secondary sm">
                            <MagnifyingGlassIcon class="prefix-icon" />Open Search
                        </button>
                    </template>

                    <template #search-window>
                        <div class="pt-3 grid lg:grid-cols-3 gap-2 md:gap-4">
                            <div class="lg:col-span-1 input-wrap sm">
                                <div class="prefix">Name</div>
                                <input type="text" v-model="search_condition.name" class="rounded pl-15" />
                            </div>

                            <div class="input-wrap sm lg:col-span-1">
                                <div class="flex -space-x-px">
                                    <div class="w-1/2 input-wrap sm">
                                        <div class="prefix">Age >=</div>
                                        <input type="number" min="0" step="1" v-model="search_condition.age_start"
                                            class="pl-16 w-1/2 relative rounded-l" />
                                    </div>

                                    <div class="w-1/2 input-wrap sm">
                                        <div class="prefix">Age {{ "<=" }}</div>
                                                <input type="number" min="0" step="1" v-model="search_condition.age_end"
                                                    class="pl-16 w-1/2 relative rounded-r" />
                                        </div>
                                    </div>
                                </div>

                                <div class="lg:col-span-1 input-wrap sm">
                                    <v-date-picker v-model="search_condition.date_range" timezone="UTC" is-range is24hr
                                        color="indigo">
                                        <template v-slot="{ inputValue, togglePopover }">
                                            <div class="input-wrap">
                                                <div class="prefix">
                                                    <CalendarDaysIcon class="icon" />
                                                </div>
                                                <input type="text" class="rounded pl-10"
                                                    :value="inputValue.start + ' - ' + inputValue.end"
                                                    v-on:click="togglePopover" @keypress.prevent />
                                            </div>
                                        </template>
                                    </v-date-picker>
                                </div>
                            </div>

                            <div class="btn btn-secondary mt-3 sm" @click="tableMgr.loadItems">Search</div>
                            <div class="btn btn-secondary ml-3 mt-3 sm" @click="ResetSearch">Reset</div>
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
