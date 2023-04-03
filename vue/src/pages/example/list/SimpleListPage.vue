<script setup>
import SidebarLayout from "../../../layouts/sidebar/SidebarLayout.vue";
import List from "@/components/core/list/List.vue";
import ListItem from "@/components/core/list/ListItem.vue";

import { InstagramIcon, FaceBookIcon, DiscordIcon, TwitterIcon, LinkedInIcon, YoutubeIcon, MediumIcon } from "@/components/core/icon/solid";

const messages = [
  {
    id: 1,
    subject: "Velit placeat sit ducimus non sed",
    sender: "Gloria Roberston",
    time: "1d ago",
    datetime: "2021-01-23",
    preview: "Doloremque dolorem maiores assumenda dolorem facilis. Velit vel in a rerum natus facere. Enim rerum eaque qui facilis. Numquam laudantium sed id dolores omnis in. Eos reiciendis deserunt maiores et accusamus quod dolor.",
  },
  {
    id: 2,
    subject: "this is a example of subject",
    sender: "from xxx ",
    time: "11d ago",
    datetime: "2021-01-27",
    preview: " this is a text from xxx",
  },
];
</script>

<template>
  <SidebarLayout>
    <div class="space-y-8 divide-y divide-gray-200 divide-gray-200">
      <div>
        <h1 class="text-2xl leading-6">Examples of SimpleList Page</h1>
        <p class="mt-3">Different types of list</p>
      </div>

      <div class="pt-5">
        <List class="max-w-2xl border">
          <ListItem v-for="item in messages" href="https://google.com">
            <template v-slot:title>{{ item.sender }}</template>
            <template v-slot:subject>{{ item.subject }}</template>
            <template v-slot:body>{{ item.preview }}</template>
            <template v-slot:suffix>
              <div class="btn-secondary xs">{{ item.datetime }}</div>
            </template>
          </ListItem>
        </List>
      </div>

      <div class="pt-5">
        <List class="max-w-md">
          <ListItem>
            <template v-slot:title><TwitterIcon class="h-5 w-5 mr-2" />Twitter</template>
            <template v-slot:body><a class="href" href="#">https://twitter/xxxx</a></template>
          </ListItem>
          <ListItem>
            <template v-slot:title><InstagramIcon class="h-5 w-5 mr-2" />Instagram</template>
            <template v-slot:body><a class="href" href="#">https://instagram/xxxx</a></template>
          </ListItem>
          <ListItem>
            <template v-slot:title><DiscordIcon class="h-5 w-5 mr-2" />Discord</template>
            <template v-slot:body><a class="href" href="#">https://discord.com/xxxx</a></template>
          </ListItem>
          <ListItem>
            <template v-slot:title><FaceBookIcon class="h-5 w-5 mr-2" />Facebook</template>
            <template v-slot:body><a class="href" href="#">https://facebook.com/xxxx</a></template>
          </ListItem>
          <ListItem>
            <template v-slot:title><LinkedInIcon class="h-5 w-5 mr-2" />LinkedInIcon</template>
            <template v-slot:body><a class="href" href="#">https://linkedin.com/xxxx</a></template>
          </ListItem>
          <ListItem>
            <template v-slot:title><YoutubeIcon class="h-5 w-5 mr-2" />Youtube</template>
            <template v-slot:body><a class="href" href="#">https://youtube.com/xxxx</a></template>
          </ListItem>
          <ListItem>
            <template v-slot:title><MediumIcon class="h-5 w-5 mr-2" />Medium</template>
            <template v-slot:body><a class="href" href="#">https://medium.com/xxxx</a></template>
          </ListItem>
        </List>
      </div>
    </div>
  </SidebarLayout>
</template>
