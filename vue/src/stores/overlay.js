import { defineStore } from "pinia";

let useOverlayStore = defineStore("overlay", {
  state: () => {
    return { loader_visable: false };
  },
  actions: {
    showLoader() {
      this.loader_visable = true;
    },
    hideLoader() {
      this.loader_visable = false;
    },
  },
});

export default useOverlayStore;
