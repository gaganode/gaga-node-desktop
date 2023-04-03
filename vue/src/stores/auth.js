import { defineStore } from "pinia";

let useAuthStore = defineStore("auth", {
  state: () => {
    return { token: null, user: null };
  },
  actions: {
    setToken(token) {
      this.token = token;
      localStorage.setItem("token",token);
    },
    setUser(user) {
      this.user = user;
    },
    clear() {
      this.token = null;
      this.user = null;
      localStorage.removeItem("token");
    },
  },
});

let brower_s_token = localStorage.getItem("token");
if (brower_s_token) {
  useAuthStore().setToken(brower_s_token);
}

export default useAuthStore;
