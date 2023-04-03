import { useToast } from "vue-toastification";
import api from "@/api";
import { ref } from "vue";
const toast = useToast();

function NewCaptchaMgr() {
  let captcha_mgr = {};

  captcha_mgr.captchaId = "";
  captcha_mgr.captchaBase64 = ref("");
  captcha_mgr.captcha = ref("");

  captcha_mgr.refresh_captcha = async function () {
    captcha_mgr.captchaBase64.value = "";
    captcha_mgr.captchaId = "";

    let resp = await api.user.getCaptcha();

    if (resp.err !== null) {
      toast.error(resp.err);
      return;
    }
    if (resp.result.meta_status < 0) {
      toast.error(resp.result.meta_message);
      return;
    }

    captcha_mgr.captchaId = resp.result.id;
    captcha_mgr.captchaBase64.value = resp.result.content;
  };

  return captcha_mgr;
}

export { NewCaptchaMgr as NewCaptchaMgr };
