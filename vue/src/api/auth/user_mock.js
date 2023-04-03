import mock from "../mock";
import config from "@/config/config";

////////////////////////////////////////////

if (config.plugins.mock.enable) {
  mock.onPost("/api/user/login").reply((config) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        //const data = JSON.parse(config.data);
        resolve([
          200,
          {
            meta_status: 1, // correct status
            meta_msg: "",
            token: "this_is_the_mocked_web_token",
          },
        ]);
      }, 3000); //3 seconds delay
    });
  });
}

////////////////////

if (config.plugins.mock.enable) {
  mock.onPost("/api/user/register").reply((config) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        const data = JSON.parse(config.data);
        if (Math.random() < 0.5) {
          resolve([
            200,
            {
              meta_status: 1, // correct status
              meta_msg: "",
              token: "this_is_the_mocked_web_token",
            },
          ]);
        } else {
          resolve([
            200,
            {
              meta_status: -1, //error status
              meta_msg: "Random error mocked",
              token: "",
            },
          ]);
        }
      }, 2000); //2 seconds delay
    });
  });
}

//////////////

if (config.plugins.mock.enable) {
  mock.onPost("/api/user/reset_password").reply((config) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        const data = JSON.parse(config.data);
        if (Math.random() < 0.5) {
          resolve([
            200,
            {
              meta_status: 1, // correct status
              meta_msg: "",
            },
          ]);
        } else {
          resolve([
            200,
            {
              meta_status: -1, //error status
              meta_msg: "Random error mocked",
            },
          ]);
        }
      }, 5000); //5 seconds delay
    });
  });
}

//////////////

if (config.plugins.mock.enable) {
  mock.onGet("/api/user/info").reply((config) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        //const data = JSON.parse(config.data);
        resolve([
          200,
          {
            meta_status: 1, // correct status
            meta_msg: "",
            user: {
              email: "admin@test.com",
              token: "this_is_the_mocked_web_token",
              roles: ["user", "admin"],
              permissions: [],
            },
          },
        ]);
      }, 2000); //5 seconds delay
    });
  });
}

if (config.plugins.mock.enable) {
  mock.onGet("/api/user/captcha").reply((config) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve([
          200,
          {
            content:
              "data:image/png;base64,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",
            id: "vuyfdosiomlluplzarhkvutx",
            meta_message: "success",
            meta_status: 1,
          },
        ]);
      }, 3000); //3 seconds delay
    });
  });
}

if (config.plugins.mock.enable) {
  mock.onPost("/api/user/email_vcode").reply((config) => {
    return new Promise(function (resolve) {
      setTimeout(function () {
        resolve([
          200,
          {
            meta_status: 1, //error status
            meta_msg: "success",
          },
        ]);
      }, 2000); //2 seconds delay
    });
  });
}

export default {};
