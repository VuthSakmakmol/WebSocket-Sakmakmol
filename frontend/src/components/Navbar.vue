<template>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>HRM System</v-toolbar-title>
  
      <v-spacer></v-spacer>
  
      <v-btn v-if="authStore.token" to="/dashboard" text>Dashboard</v-btn>
      <v-btn v-if="authStore.token" @click="handleLogout" text>Logout</v-btn>
      <v-btn v-else to="/" text>Login</v-btn>
    </v-app-bar>
  </template>
  
  <script setup>
  import { useAuthStore } from "@/store/auth"; // ✅ Import Pinia store
  import { useRouter } from "vue-router";
  
  const authStore = useAuthStore(); // ✅ Ensure this is inside `setup()`
  const router = useRouter();
  
  const handleLogout = () => {
    authStore.logout();
    router.push("/");
  };
  </script>
  