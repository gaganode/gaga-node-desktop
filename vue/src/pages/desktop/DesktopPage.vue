<script setup>
import { InformationCircleIcon, PlayIcon } from "@heroicons/vue/24/outline";
import DesktopLayout from "../../layouts/desktop/DesktopLayout.vue";
import List from "@/components/core/list/List.vue";
import ListItem from "@/components/core/list/ListItem.vue";
import logo from "@/assets/logo.png"
</script>
<template>
    <DesktopLayout>
        <form class="space-y-6 divide-y divide-gray-200 divide-gray-200">
            <div>
                <h1 class="text-2xl leading-6">
                    <img style="width:25px;heigh:25px;" class="inline" :src="logo" />
                    gaganode.com desktop
                </h1>
                <p class="mt-3">
                    <span class="badge">Version:x.x.x</span> For latest updates and earnings please go to official website:
                    <a href="https://gaganode.com" class="href cursor-pointer">https://gaganode.com</a>
                </p>


            </div>
            <div class="pt-2">
                <List class="border">
                    <ListItem>
                        <template v-slot:title>Input your token:</template>
                        <template v-slot:body>
                            <div class="input-wrap mt-1">
                                <input type="text" id="token" class="rounded" />
                            </div>
                        </template>
                        <template v-slot:suffix>
                            <div class="btn-secondary xs"
                                v-tippy="{ placement: 'top', content: 'go to https://gaganode.com ,register and get your token' }">
                                how to get my token <InformationCircleIcon class="ml-1 icon inline"></InformationCircleIcon>
                            </div>
                        </template>
                    </ListItem>

                    <ListItem>
                        <template v-slot:title>[optional] Input your service port:</template>
                        <template v-slot:body>
                            <div class="input-wrap mt-1">
                                <input type="text" id="port" class="rounded" />
                            </div>
                        </template>
                        <template v-slot:subject>change this if and only if you are running a server in data
                            center</template>
                        <template v-slot:suffix>
                            <div class="btn-secondary xs" v-tippy="{ placement: 'top', content: 'xxxx' }">
                                what is this <InformationCircleIcon class="ml-1 icon inline"></InformationCircleIcon>
                            </div>
                        </template>
                    </ListItem>
                </List>

                <div class="pt-5 lg:grid lg:grid-cols-10 lg:gap-4">
                    <div>
                        <button type="button" class="btn-success sm mt-2">
                            <PlayIcon class="prefix-icon" />Restart
                        </button>
                    </div>
                    <div class="lg:col-span-9 mt-2">
                        <textarea id="node_log" rows="30" class="rounded bg-gray-50 text-gray-500" disabled>log:</textarea>
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