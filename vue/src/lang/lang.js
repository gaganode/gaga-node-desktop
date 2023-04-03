import { createI18n } from "vue-i18n";
import global_message from "./global_message";

var i18n = createI18n({
  legacy: false,
  locale: getDefaultLang(),
  fallbackLocale: "en",
  messages: global_message,
  fallbackWarn: false,
  missingWarn: false,
});

i18n.setLang = function (lang) {
  i18n.global.locale.value = lang;
  window.localStorage.setItem("lang", lang);
};

i18n.merge_lang = function (merged_lang, ...langs) {
  let result_lang = {};

  for (const [key, value] of Object.entries(merged_lang)) {
    result_lang[key] = {};
    for (const [tag, txt] of Object.entries(value)) {
      result_lang[key][tag] = txt;
    }
  }

  for (const lang of langs) {
    for (const [key, value] of Object.entries(lang)) {
      if (!result_lang[key]) {
        result_lang[key] = {};
      }
      for (const [tag, txt] of Object.entries(value)) {
        result_lang[key][tag] = txt;
      }
    }
  }

  return result_lang;
};

function getDefaultLang() {
  var language = window.localStorage.getItem("lang");
  if (language == null || language == "") {
    return "en";
  } else {
    return language;
  }
}

export default i18n;
