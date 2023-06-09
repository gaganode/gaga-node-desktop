<script setup>
import { InformationCircleIcon, PlayIcon } from "@heroicons/vue/24/outline";
import DesktopLayout from "../../layouts/desktop/DesktopLayout.vue";
import List from "@/components/core/list/List.vue";
import ListItem from "@/components/core/list/ListItem.vue";
import Modal from "@/components/core/modal/modal.vue";
import logo from "@/assets/logo.png";

import { onMounted, ref } from 'vue'

const { ipcRenderer, shell } = window.require('electron');

let token_value = ref("LOADING");
let port_value = ref("LOADING");
let version_value = ref("x.x.x");
let msg_value = ref("");
let is_restarting = ref(false);

let tag_w_msg = ref("");
let tag_w_open = ref(true);

const loadConfig = () => {
    ipcRenderer.send('getApiToken');
};

onMounted(()=> {
    ipcRenderer.on('displayConfig', (event, config) => {
        if (config.token) {
            token_value.value = config.token;
        } else {
            token_value.value = "EMPTY"
        }

        if (config.port) {
            port_value.value = config.port;
        } else {
            port_value.value = "EMPTY"
        }

        if (config.version) {
            version_value.value = config.version
        }
    });

    ipcRenderer.on('infoOut', (event, data) => {
        if (!is_restarting.value) {
            msg_value.value = data.toString();
        }
    });

    const tickerId = setInterval(() => {
        ipcRenderer.send('isAppReady');
    }, 1500);

    ipcRenderer.on('appReady', (event, msg) => {
        console.log("appReady");
        if (msg == "110011") {
            if (tickerId != null) {
                clearInterval(tickerId);
            }

            tag_w_open.value = false;
            loadConfig();
        } else {
            tag_w_msg.value = msg;
        }
    });

    loadConfig();
});

const onRestart = () => {
    const config = { token : token_value.value, port: port_value.value };
    ipcRenderer.send('trigRestart', config);
    is_restarting.value = true;
    msg_value.value = "Restarting.......";
    setTimeout(() => {
        is_restarting.value = false;
    }, 10000);
}

const openLink = (link) => {
    shell.openExternal(link);
}

</script>
<template>
    <DesktopLayout>
        <Modal v-model:open="tag_w_open" :showLoader="false" :show-cover="true">
          <template v-slot:body>
            <div class="mt-10">
                <div class="text-center">this is cover page text</div>
            </div>
          </template>
          <template v-slot:cover>
            <div class="h-full">
                <div class="relative h-full">
                    <div class="relative text-black rounded h-full items-center justify-center flex">
                    <svg viewBox="0 0 24 24" fill="none" class="w-4 h-4 animate animate-spin">
                        <circle cx="12" cy="12" r="10" class="stroke-slate-300" stroke-width="4" />
                        <path d="M12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2" class="stroke-indigo-500" stroke-width="4" />
                    </svg>
                    <span class="ml-3 text-xs flex-inline text-gray-600">{{ tag_w_msg }}</span>
                </div>
            </div>
            </div>
          </template>
        </Modal>
        <form class="space-y-6 divide-y divide-gray-200 divide-gray-200">
            <div>
                <h1 class="text-2xl leading-6">
                    <img style="width:25px;heigh:25px;" class="inline" :src="logo" />
                    gaganode.com desktop
                </h1>
                <p class="mt-3">
                    <span class="badge">Version:{{ version_value }}</span> For latest updates and earnings please go to official website:
                    <span class="href cursor-pointer" @click="openLink('https://gaganode.com')">
                        https://gaganode.com
                    </span>
                </p>
            </div>
            <div class="pt-2">
                <List class="border">
                    <ListItem>
                        <template v-slot:title>Input your token:</template>
                        <template v-slot:body>
                            <div class="input-wrap mt-1">
                                <input type="text" id="token" class="rounded" v-model="token_value"/>
                            </div>
                        </template>
                        <template v-slot:suffix>
                            <div class="btn-secondary xs"
                                v-tippy="{ placement: 'top', content: 'click to https://gaganode.com ,register and get your token' }"
                                @click="openLink('https://gaganode.com')"
                            >
                                how to get my token <InformationCircleIcon class="ml-1 icon inline"></InformationCircleIcon>
                            </div>
                        </template>
                    </ListItem>

                    <ListItem>
                        <template v-slot:title>[optional] Input your service port:</template>
                        <template v-slot:body>
                            <div class="input-wrap mt-1">
                                <input type="text" id="port" class="rounded" v-model="port_value" />
                            </div>
                        </template>
                        <template v-slot:subject>change this if and only if you are running a server in data center</template>
                        <template v-slot:suffix>
                            <div class="btn-secondary xs"
                                v-tippy="{ placement: 'top', content: 'click to tutorial' }"
                                @click="openLink('https://docs.gaganode.com/gaganode-service_port.html')"
                            >
                                help <InformationCircleIcon class="ml-1 icon inline"></InformationCircleIcon>
                            </div>
                        </template>
                    </ListItem>
                </List>

                <div class="pt-5 lg:grid lg:grid-cols-10 lg:gap-4">
                    <div>
                        <button type="button" class="btn-success sm mt-2" :disabled="is_restarting" @click="onRestart">
                            <div v-if="!is_restarting" class="flex">
                                <PlayIcon class="prefix-icon"/>Restart
                            </div>
                            <div v-if="is_restarting" class="flex">
                                <InformationCircleIcon class="prefix-icon"/>Loading
                            </div>
                        </button>
                    </div>
                    <div class="lg:col-span-9 mt-2">
                        <textarea id="node_log" rows="30" class="rounded bg-gray-50 text-gray-500" disabled v-model="msg_value"></textarea>
                    </div>
                </div>
            </div>
        </form>
    </DesktopLayout>
</template>
 


<!-- <div>
    <label for="username" class="flex">Input your token</label>
    <p> </p>
</div>
<div class="lg:col-span-2 mt-2">
    <div class="input-wrap">
        <input type="text" id="token" class="rounded"/>
    </div>
</div> -->