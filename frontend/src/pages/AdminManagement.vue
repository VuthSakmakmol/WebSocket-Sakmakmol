<template>
    <v-container>
      <v-alert v-if="message" type="success">{{ message }}</v-alert>
      <v-alert v-if="error" type="error">{{ error }}</v-alert>
  
      <v-btn color="primary" class="mb-3" @click="openDialog">Add New Admin</v-btn>
  
      <v-data-table :items="admins" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <v-btn color="blue" @click="editAdmin(item)">Edit</v-btn>
          <v-btn color="red" @click="deleteAdmin(item._id)">Delete</v-btn>
        </template>
      </v-data-table>
  
      <!-- Add/Edit Admin Dialog -->
      <v-dialog v-model="dialog" persistent max-width="500px">
        <v-card>
          <v-card-title>{{ editingAdmin ? "Edit Admin" : "Add Admin" }}</v-card-title>
          <v-card-text>
            <v-text-field v-model="adminData.name" label="Name"></v-text-field>
            <v-text-field v-model="adminData.email" label="Email"></v-text-field>
            <v-text-field v-if="!editingAdmin" v-model="adminData.password" label="Password" type="password"></v-text-field>
            <v-combobox v-model="adminData.permissions" label="Permissions" :items="permissionsList" multiple></v-combobox>
          </v-card-text>
          <v-card-actions>
            <v-btn color="gray" @click="dialog = false">Cancel</v-btn>
            <v-btn color="primary" @click="saveAdmin">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const admins = ref([]);
  const dialog = ref(false);
  const adminData = ref({ name: "", email: "", password: "", permissions: [] });
  const editingAdmin = ref(null);
  const message = ref(null);
  const error = ref(null);
  
  const permissionsList = [
    "visitor:create",
    "visitor:read",
    "visitor:update",
    "visitor:delete",
  ];
  
  const headers = [
    { text: "Name", value: "name" },
    { text: "Email", value: "email" },
    { text: "Permissions", value: "permissions" },
    { text: "Actions", value: "actions" },
  ];
  
  const fetchAdmins = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get("http://localhost:5000/api/admin", {
        headers: { Authorization: `Bearer ${token}` },
      });
      admins.value = res.data;
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to fetch admins";
    }
  };
  
  const openDialog = () => {
    adminData.value = { name: "", email: "", password: "", permissions: [] };
    editingAdmin.value = null;
    dialog.value = true;
  };
  
  const editAdmin = (admin) => {
    adminData.value = { ...admin, password: "" };
    editingAdmin.value = admin._id;
    dialog.value = true;
  };
  
  const saveAdmin = async () => {
    try {
      const token = localStorage.getItem("token");
      if (editingAdmin.value) {
        await axios.put(`http://localhost:5000/api/admin/permissions/${editingAdmin.value}`, { permissions: adminData.value.permissions }, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("http://localhost:5000/api/admin/create", adminData.value, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      message.value = "Admin saved successfully";
      dialog.value = false;
      fetchAdmins();
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to save admin";
    }
  };
  
  const deleteAdmin = async (id) => {
    if (!confirm("Are you sure you want to delete this admin?")) return;
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/admin/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      message.value = "Admin deleted successfully";
      fetchAdmins();
    } catch (err) {
      error.value = err.response?.data?.message || "Failed to delete admin";
    }
  };
  
  onMounted(fetchAdmins);
  </script>
  