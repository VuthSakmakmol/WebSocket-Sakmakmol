<template>
    <v-container>
      <v-alert v-if="newVisitor" type="info">
        New Visitor: {{ newVisitor.name }} - {{ newVisitor.purpose }}
        <v-btn color="primary" @click="approveVisitor(newVisitor._id)">Approve</v-btn>
        <v-btn color="red" @click="declineVisitor(newVisitor._id)">Decline</v-btn>
      </v-alert>
  
      <v-data-table :items="visitors" :headers="headers">
        <template v-slot:item.actions="{ item }">
          <v-btn v-if="item.status === 'pending'" color="primary" @click="approveVisitor(item._id)">Approve</v-btn>
          <v-btn v-if="item.status === 'pending'" color="red" @click="declineVisitor(item._id)">Decline</v-btn>
        </template>
      </v-data-table>
    </v-container>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  import socket from "@/services/socket";
  
  const visitors = ref([]);
  const newVisitor = ref(null);
  
  const headers = [
    { text: "Name", value: "name" },
    { text: "Phone", value: "phone" },
    { text: "Meet Who", value: "meetWho" },
    { text: "Purpose", value: "purpose" },
    { text: "Check-In", value: "checkInTime" },
    { text: "Status", value: "status" },
    { text: "Actions", value: "actions" },
  ];
  
  const fetchVisitors = async () => {
  try {
    const token = localStorage.getItem("token"); // ✅ Retrieve token from localStorage
    const res = await axios.get("http://localhost:5000/api/visitor/history", {
      headers: { Authorization: `Bearer ${token}` } // ✅ Send token in headers
    });
    visitors.value = res.data;
  } catch (error) {
    console.error("Error fetching visitors:", error.response?.data?.message || error.message);
  }
};

  
  const approveVisitor = async (id) => {
    await axios.put(`http://localhost:5000/api/visitor/update/${id}`, { status: "approved" });
    fetchVisitors();
  };
  
  const declineVisitor = async (id) => {
    await axios.put(`http://localhost:5000/api/visitor/update/${id}`, { status: "declined" });
    fetchVisitors();
  };
  
  onMounted(() => {
    fetchVisitors();
    socket.on("newVisitor", (visitor) => {
      newVisitor.value = visitor;
    });
    socket.on("visitorStatusUpdate", () => {
      fetchVisitors();
    });
  });
  </script>
  