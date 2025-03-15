import { defineStore } from "pinia";
import api from "@/api/api"; // ✅ Import centralized Axios API

export const useAuthStore = defineStore("auth", {
    state: () => ({ token: localStorage.getItem("token") || null }),
    actions: {
        async login(credentials) {
            const res = await api.post("/auth/login", credentials); // ✅ Use `api` wrapper
            this.token = res.data.token;
            localStorage.setItem("token", res.data.token);
        },
        logout() {
            this.token = null;
            localStorage.removeItem("token");
        }
    }
});
