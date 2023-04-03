<script setup>
import api from "@/api";
import useOverlayStore from "@/stores/overlay";
import { ref, computed } from "vue";
import validator from "@/utils/validator.js";

import { useToast } from "vue-toastification";

import TopbarNavLayout from "../../layouts/topbar/TopbarNavLayout.vue";
import Divider from "../../components/core/divider/Divider.vue";

import { UserPlusIcon, CursorArrowRaysIcon } from "@heroicons/vue/24/solid";
import { EnvelopeIcon, KeyIcon, PaperAirplaneIcon, CalculatorIcon, LockClosedIcon, CheckIcon } from "@heroicons/vue/24/outline";

import { NewCaptchaMgr } from "@/utils/user/captcha.js";
import { NewVcodeMgr } from "@/utils/user/vcode.js";

import { useI18n } from "vue-i18n";
import lang from "./auth_lang";
const { t } = useI18n({ messages: lang });

const toast = useToast();

/////input ///////
let email = ref("");
let validate_email = computed(() => {
  return email.value == "" ? true : validator.validateEmail(email.value);
});

////
let password = ref("");
let validate_password = computed(() => {
  return password.value == "" ? true : validator.validatePassword(password.value);
});
//
let password_again = ref("");
let validate_password_again = computed(() => {
  return password.value === password_again.value;
});

//
let captcha_mgr = NewCaptchaMgr();
captcha_mgr.refresh_captcha();
//
//vcode
let send_vcode_ready = computed(() => {
  if (validate_email.value && email.value != "" && captcha_mgr.captcha.value !== "") {
    return true;
  } else {
    return false;
  }
});
let vcode_mgr = NewVcodeMgr("reset_password");
let send_vcode = async function () {
  if (send_vcode_ready.value != true) {
    return;
  }

  vcode_mgr.resetLoader();

  if (!await vcode_mgr.getEmailVCode(email.value, captcha_mgr.captchaId, captcha_mgr.captcha.value, 16)) {
    captcha_mgr.refresh_captcha();
  }

};

//
let validate_reset_pass_ready = computed(() => {
  if (validate_email.value && email.value != "" && validate_password.value && password.value != "" && validate_password_again.value && password_again.value != "" && vcode_mgr.vcode.value !== "") {
    return true;
  }
  return false;
});
////

async function submit_reset_pass() {
  if (!validate_reset_pass_ready.value) {
    return;
  }

  //console.log("submit_reset_pass", [email.value, password.value, vcode_mgr.vcode.value]);

  const overlay_store = useOverlayStore();
  overlay_store.showLoader();
  let resp = await api.user.resetPassword(email.value, password.value, vcode_mgr.vcode.value);

  if (resp.err != null) {
    toast.error(resp.err);
    overlay_store.hideLoader();
    captcha_mgr.refresh_captcha()
    return;
  }

  if (resp.result.meta_status < 0) {
    toast.error(resp.result.meta_message);
    overlay_store.hideLoader();
    captcha_mgr.refresh_captcha()
    return;
  }

  //delay 2 secs for toast display
  toast.success("reset password success, redirect to login");
  setTimeout(function () {
    window.location = "/signin";
  }, 2000);
}
</script>

<template>
  <TopbarNavLayout>
    <div class="max-w-lg m-auto items-center justify-center px-6 py-12 lg:mt-12">
      <h3 class="text-2xl text-gray-500 mb-3">{{ t("reset_pass") }}</h3>

      <div class="input-wrap">
        <div class="prefix">
          <EnvelopeIcon class="icon" />
        </div>
        <input id="email" name="email" type="email" autocomplete="email" v-model="email"
          :class="[validate_email ? '' : 'err', 'rounded relative pl-10']" placeholder="email" />
        <div :class="validate_email && email != '' ? 'visible' : 'invisible'" class="suffix">
          <CheckIcon class="h-5 w-5 text-success" />
        </div>
      </div>

      <div class="-space-y-px mt-3 mb-3">
        <div class="input-wrap">
          <div class="prefix">
            <LockClosedIcon class="icon" />
          </div>
          <input id="password" name="password" type="password" v-model="password"
            v-tippy="{ placement: 'right', content: t('password_rule'), trigger: 'focus' }"
            :class="[validate_password ? '' : 'err', 'relative pl-10 rounded-t']" autocomplete="current-password"
            :placeholder="t('new_password')" />

          <div :class="validate_password && password != '' ? 'visible' : 'invisible'" class="suffix">
            <CheckIcon class="h-5 w-5 text-success" />
          </div>
        </div>

        <div class="input-wrap">
          <div class="prefix">
            <LockClosedIcon class="icon" />
          </div>
          <input id="password_again" name="password_again" type="password" v-model="password_again"
            autocomplete="current-password" :class="[validate_password_again ? '' : 'err', 'relative pl-10 rounded-b']"
            :placeholder="t('new_password_again')" />
          <div :class="validate_password_again && password_again != '' ? 'visible' : 'invisible'" class="suffix">
            <CheckIcon class="h-5 w-5 text-success" />
          </div>
        </div>
      </div>

      <div class="btn-input-wrap mb-3">
        <div class="input-wrap">
          <div class="prefix">
            <CalculatorIcon class="icon" />
          </div>
          <input type="text" v-model="captcha_mgr.captcha.value" class="pl-10 rounded-l border-r-0"
            :placeholder="t('input_captcha')" />
        </div>

        <div class="btn rounded-r" v-tippy="{ placement: 'bottom', content: t('change_captcha') }"
          @click="captcha_mgr.refresh_captcha">
          <img v-if="captcha_mgr.captchaBase64.value !== ''" class="captcha" :src="captcha_mgr.captchaBase64.value" />
          <p v-else>
            <ArrowPathIcon />loading.......
          </p>
        </div>
      </div>

      <div class="btn-input-wrap">
        <div class="input-wrap">
          <div class="prefix">
            <KeyIcon class="icon" />
          </div>
          <input type="text" name="vcode" id="vcode" v-model="vcode_mgr.vcode.value" class="pl-10 rounded-l border-r-0"
            placeholder="input your v-code" />
        </div>

        <div v-if="vcode_mgr.loader_secs.value == 0" :class="[send_vcode_ready ? '' : 'disabled', 'btn']"
          class="btn rounded-r"
          v-tippy="{ placement: 'bottom', content: send_vcode_ready ? t('send_vcode_to_email') : t('complete_vcode_to_email') }"
          @click="send_vcode">
          <PaperAirplaneIcon /><span>{{ t("send") }}</span>
        </div>
        <div v-if="vcode_mgr.loader_secs.value != 0" class="btn rounded-r">
          <ArrowPathIcon /><span>{{ vcode_mgr.loader_secs.value }}(s)</span>
        </div>
      </div>

    <div @click="submit_reset_pass"
      :class="[validate_reset_pass_ready ? '' : 'disabled', ' btn-primary w-full relative mt-3 mb-3']">
      <UserPlusIcon class="icon dark absolute left-3" />{{ t("submit") }}
    </div>

    <Divider>{{ t("or") }}</Divider>

    <router-link to="/signin" class="mt-3 btn-secondary w-full relative">
      <CursorArrowRaysIcon class="icon dark absolute left-3" aria-hidden="true" />
      {{ t("sign_in_exist") }}
    </router-link>
  </div>
</TopbarNavLayout></template>
