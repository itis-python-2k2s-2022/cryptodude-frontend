import { defineStore } from "pinia";

export const useAuthStore = defineStore({
  id: "auth",
  // state: () => ({ token: null }),
  // actions: {
  //   setValue(key, value) {
  //     this[key] = value;
  //   },
  // },
  getters: {
    isLoggedIn() {
      if (this.token === null) {
        return false;
      } else return true;
    },
  },
});
