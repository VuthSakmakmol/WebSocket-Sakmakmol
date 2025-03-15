import { defineStore } from "pinia";
import axios from "axios";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        token: localStorage.getItem("token") || null,
        role: localStorage.getItem("role") || null,
    }),
    actions: {
        async login(credentials) {
            const res = await axios.post("http://localhost:5000/api/auth/login", credentials);
            this.token = res.data.token;
            this.role = res.data.role;
            localStorage.setItem("token", res.data.token);
            localStorage.setItem("role", res.data.role);
        },
        logout() {
            this.token = null;
            this.role = null;
            localStorage.removeItem("token");
            localStorage.removeItem("role");
        }
    }
});
