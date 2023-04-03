<script setup>
import FaceBookIcon from "@/components/core/icon/solid/FaceBookIcon.js";
import InstagramIcon from "@/components/core/icon/solid/InstagramIcon.js";
import TwitterIcon from "@/components/core/icon/solid/TwitterIcon.js";
import GithubIcon from "@/components/core/icon/solid/GithubIcon.js";
import MediumIcon from "@/components/core/icon/solid/MediumIcon.js";
import DiscordIcon from "@/components/core/icon/solid/DiscordIcon.js";
import YoutubeIcon from "@/components/core/icon/solid/YoutubeIcon.js";
import LinkedInIcon from "@/components/core/icon/solid/LinkedInIcon.js";

const navigation = [
  {
    name: "Facebook",
    href: "#",
    icon: FaceBookIcon,
  },
  {
    name: "Instagram",
    href: "#",
    icon: InstagramIcon,
  },
  {
    name: "Twitter",
    href: "#",
    icon: TwitterIcon,
  },
  {
    name: "GitHub",
    href: "#",
    icon: GithubIcon,
  },
  {
    name: "Medium",
    href: "#",
    icon: MediumIcon,
  },
  {
    name: "Discord",
    href: "#",
    icon: DiscordIcon,
  },
  {
    name: "Youtube",
    href: "#",
    icon: YoutubeIcon,
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: LinkedInIcon,
  },
];
</script>

<template>
  <footer class="bg-white fixed bottom-0 left-0 w-full">
    <div class="mx-auto max-w-7xl py-12 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
      <div class="flex justify-center space-x-6 md:order-2">
        <a v-for="item in navigation" :key="item.name" :href="item.href" class="text-gray-400 hover:text-gray-500">
          <span class="sr-only">{{ item.name }}</span>
          <component :is="item.icon" class="h-6 w-6" aria-hidden="true" />
        </a>
      </div>
      <div class="mt-8 md:order-1 md:mt-0"></div>
    </div>
  </footer>
</template>
