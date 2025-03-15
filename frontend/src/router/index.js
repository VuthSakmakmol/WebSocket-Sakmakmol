import { createRouter, createWebHistory } from "vue-router";
import Login from "@/pages/Login.vue";
import SuperAdminDashboard from "@/pages/SuperAdminDashboard.vue";
import AdminDashboard from "@/pages/AdminDashboard.vue";
import AdminManagement from "@/pages/AdminManagement.vue";

const routes = [
    { path: "/", component: Login },
    { path: "/superadmin", component: SuperAdminDashboard },
    { path: "/admin", component: AdminDashboard },
    { path: "/admin-management", component: AdminManagement },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
