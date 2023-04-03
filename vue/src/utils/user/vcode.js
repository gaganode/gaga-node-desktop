import { ref } from "vue";
import { useToast } from "vue-toastification";
import api from "@/api";

const toast = useToast();

const loader_total_secs = 30;

function NewVcodeMgr(id) {
  let vcode_mgr = {};

  if (!id) {
    vcode_mgr.id = "default";
  } else {
    vcode_mgr.id = id;
  }

  vcode_mgr.loader_secs = ref(0);
  vcode_mgr.vcode = ref("");

  let s_vcode_loader_secs = localStorage.getItem(vcode_mgr.id + "_vcode_loader_secs");
  if (s_vcode_loader_secs) {
    vcode_mgr.loader_secs.value = s_vcode_loader_secs;
  }

  ///
  vcode_mgr.getEmailVCode = async function (email, captchaId, captcha, vcodeLen) {
    let resp = await api.user.getEmailVCode(email, captchaId, captcha, vcodeLen);
    if (resp.err !== null) {
      toast.error(resp.err);
      return false;
    }
    if (resp.result.meta_status < 0) {
      toast.error(resp.result.meta_message);
      return false;
    }

    toast.success("vcode has been sent to your email");
    return true;
  };

  ///////
  vcode_mgr.resetLoader = function (left_secs) {
    if (left_secs) {
      vcode_mgr.loader_secs.value = left_secs;
    } else {
      vcode_mgr.loader_secs.value = loader_total_secs;
    }

    vcode_mgr.loader_timer = setInterval(function () {
      if (vcode_mgr.loader_secs.value % 5 == 0) {
        localStorage.setItem(vcode_mgr.id + "_vcode_loader_secs", vcode_mgr.loader_secs.value);
      }

      if (vcode_mgr.loader_secs.value <= 0) {
        clearInterval(vcode_mgr.loader_timer);
        return;
      }
      vcode_mgr.loader_secs.value = vcode_mgr.loader_secs.value - 1;
    }, 1000);
  };

  if (vcode_mgr.loader_secs.value > 0) {
    vcode_mgr.resetLoader(vcode_mgr.loader_secs.value);
  }

  return vcode_mgr;
}

export { NewVcodeMgr as NewVcodeMgr };
