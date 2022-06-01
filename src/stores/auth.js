import { defineStore } from "pinia";
import { retrieveProfile, setToken } from "../services/auth";
import request from "../services/api";

export const useAuthStore = defineStore({
  id: "auth",
  state: () => ({
    isLoading: true,
    error: null,
    profile: null,
  }),
  actions: {
    async loadProfile() {
      this.isLoading = true;
      try {
        this.profile = await retrieveProfile();
      } catch (e) {
        if (e.response.status !== 401) {
          console.log(e);
        }
      }
      this.isLoading = false;
    },
    displayErrors(error) {
      if (error) {
        console.error(error);
        this.error =
          error === "access_denied"
            ? "Доступ к аккаунту запрещен, попробуйте войти еще раз"
            : "Произошла неизвестная ошибка, попробуйте еще раз";
      }
    },
    async finishAuth(token) {
      console.log(token);
      if (token !== undefined && token !== null) {
        try {
          const response = await request.get(
            `/auth/google_token?access_token=${token}`
          );
          if (response.status === 200) {
            const real_token = response.data.access_token;
            setToken(real_token);
            location.search = "";
            location.hash = "";
          }
        } catch (e) {
          this.error = "Произошла неизвестная ошибка, попробуй еще раз";
          console.error(e);
        }
      }
    },
  },
  getters: {
    isAuthorized() {
      return this.profile !== null;
    },
    currentUser() {
      return this.profile;
    },
  },
});
