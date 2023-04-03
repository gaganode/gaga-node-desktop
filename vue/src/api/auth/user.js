import request from "../request";

import _ from "./user_mock";

import config from "@/config/config.js";

async function login(email, password, captchaId, captcha) {
  let url = config.api.endpoint + "/api/user/login";
  return await request.Post(url, {
    email: email,
    password: password,
    captcha_id: captchaId,
    captcha: captcha,
  });
}

async function register(email, password, vcode) {
  let url = config.api.endpoint + "/api/user/register";
  return await request.Post(url, {
    email: email,
    password: password,
    vcode: vcode,
  });
}

async function resetPassword(email, password, vcode) {
  let url = config.api.endpoint + "/api/user/reset_password";
  return await request.Post(url, {
    email: email,
    password: password,
    vcode: vcode,
  });
}

async function getUserInfo(token) {
  let url = config.api.endpoint + "/api/user/info";
  return await request.Get(url, token);
}

async function getCaptcha() {
  let url = config.api.endpoint + "/api/user/captcha";
  return await request.Get(url);
}

async function getEmailVCode(email, captchaId, captcha, vcodeLen) {
  let url = config.api.endpoint + "/api/user/email_vcode";
  return await request.Post(url, {
    vcode_len: vcodeLen,
    email: email,
    captcha_id: captchaId,
    captcha: captcha,
  });
}

/////////////////////////////////////////////////////////////

export default {
  login,
  register,
  resetPassword,
  getUserInfo,
  getCaptcha,
  getEmailVCode,
};
