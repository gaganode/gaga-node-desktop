<script setup>
import { useToast } from "vue-toastification";
import api from "@/api";
import useAuthStore from "@/stores/auth";
import useOverlayStore from "@/stores/overlay";
import TopbarNavLayout from "../../layouts/topbar/TopbarNavLayout.vue";
import Divider from "../../components/core/divider/Divider.vue";
import { EnvelopeIcon, LockClosedIcon, CalculatorIcon, CheckIcon } from "@heroicons/vue/24/outline";
import { UserPlusIcon, LockClosedIcon as LockClosedIconSolid } from "@heroicons/vue/20/solid";

import { ref, computed } from "vue";
import validator from "@/utils/validator.js";

import { NewCaptchaMgr } from "@/utils/user/captcha.js";

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

///
let captcha_mgr = NewCaptchaMgr();
captcha_mgr.refresh_captcha();
////
let validate_signin_ready = computed(() => {
  if (validate_email.value && email.value != "" && validate_password.value && password.value != "" && captcha_mgr.captcha.value !== "") {
    return true;
  }
  return false;
});

//////
async function submit_signin() {
  if (!validate_signin_ready.value) {
    return;
  }

  //console.log("submit_signin",[email.value, password.value, captcha_mgr.captcha.value])
  
  const overlay_store = useOverlayStore();
  overlay_store.showLoader();
  let resp = await api.user.login(email.value, password.value,captcha_mgr.captchaId, captcha_mgr.captcha.value);

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

  const auth_store = useAuthStore();
  auth_store.setToken(resp.result.token);
  window.location = "/";
}
///
</script>

<template>
  <TopbarNavLayout>
    <div class="max-w-lg m-auto items-center justify-center px-6 py-12 lg:mt-12">
      <h3 class="text-2xl text-gray-500">{{ t("sign_in") }}</h3>
      <p class="mb-5 text-gray-400">{{ t("welcome_signin") }}</p>

      <div class="-space-y-px mt-3 mb-3">
        <div class="input-wrap">
          <div class="prefix">
            <EnvelopeIcon class="icon" />
          </div>
          <input id="email" name="email" type="email" autocomplete="email" v-model="email" :class="[validate_email ? '' : 'err', 'relative pl-10 rounded-t']" placeholder="your email" />
          <div :class="validate_email && email != '' ? 'visible' : 'invisible'" class="suffix">
            <CheckIcon class="h-5 w-5 text-success" />
          </div>
        </div>

        <div class="input-wrap">
          <div class="prefix">
            <LockClosedIcon class="icon" />
          </div>
          <input id="password" name="password" type="password" v-model="password" v-tippy="{ placement: 'right', content: t('password_rule'), trigger: 'focus' }" :class="[validate_password ? '' : 'err', 'relative pl-10 rounded-b']" autocomplete="current-password" placeholder="your password" />

          <div :class="validate_password && password != '' ? 'visible' : 'invisible'" class="suffix">
            <CheckIcon class="h-5 w-5 text-success" />
          </div>
        </div>
      </div>

      <div class="btn-input-wrap mb-3">
        <div class="input-wrap">
          <div class="prefix">
            <CalculatorIcon class="icon" />
          </div>
          <input type="text" v-model="captcha_mgr.captcha.value" class="pl-10 rounded-l border-r-0" :placeholder="t('input_captcha')" />
        </div>

        <div class="btn  rounded-r" v-tippy="{ placement: 'bottom', content: t('change_captcha') }" @click="captcha_mgr.refresh_captcha">
          <img v-if="captcha_mgr.captchaBase64.value !== ''" class="captcha" :src="captcha_mgr.captchaBase64.value" />
          <p v-else><ArrowPathIcon />loading.......</p>
        </div>
      </div>

      <router-link to="/resetpass" class="a-primary font-medium">{{ t("forget_pass") }}</router-link>

      <div @click="submit_signin" :class="[validate_signin_ready ? '' : 'disabled', ' btn-primary w-full relative mt-3 mb-3']"><LockClosedIconSolid class="icon dark absolute left-3" />{{ t("sign_in") }}</div>

      <Divider>{{ t("or") }}</Divider>

      <router-link to="/register" class="mt-3 btn-secondary w-full relative">
        <UserPlusIcon class="icon dark absolute left-3" />
        {{ t("no_account_yet") }}
      </router-link>
    </div>
  </TopbarNavLayout>
</template>
