<template>
    <v-container>
      <v-card class="pa-4 mx-auto" width="400">
        <v-card-title class="text-center">Super Admin Login</v-card-title>
        <v-card-text>
          <v-text-field v-model="email" label="Email" required></v-text-field>
          <v-text-field v-model="password" label="Password" type="password" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" block @click="handleLogin">Login</v-btn>
        </v-card-actions>
      </v-card>
    </v-container>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { useAuthStore } from "@/store/auth";
  import { useRouter } from "vue-router";
  
  const authStore = useAuthStore();
  const router = useRouter();
  const email = ref("");
  const password = ref("");
  
  const handleLogin = async () => {
    try {
      await authStore.login({ email: email.value, password: password.value });
      router.push("/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };
  </script>
  