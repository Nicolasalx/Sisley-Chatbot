<template>
  <v-app style="background: rgba(0, 0, 0, 0)">
    <v-app-bar
      :elevation="1"
      height="80"
      style="background-color: rgb(255, 249, 232)"
    >
      <v-btn>
        <v-icon>mdi-menu</v-icon>
        <v-menu activator="parent">
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="index"
              :value="index"
            >
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </v-btn>
      <v-toolbar-title>ChatBot de {{ userName }}</v-toolbar-title>
      <v-spacer />
      <v-img
        src="../assets/Sisley_Paris_logo.svg"
        max-height="100"
        max-width="200"
        contain
        class="mx-5"
      ></v-img>
    </v-app-bar>
    <v-virtual-scroll :items="promptArray" style="margin-top: 80px;" max-height="690">
      <template v-slot:default="{ item }">
        <v-sheet
          v-if="item.id == 1"
          height="auto"
          width="600"
          class="my-5 pa-3"
          rounded="lg"
          style="background-color: rgb(255, 245, 218); margin-left: 60%"
          elevation="8"
        >
        <h3>{{ userName }}</h3>
          {{ item.text }}
        </v-sheet>
        <v-sheet
          v-if="item.id == 2 || item.id == 3"
          height="auto"
          max-width="600"
          class="my-5 pa-3"
          rounded="lg"
          style="background-color: rgb(255, 245, 218); margin-left: 10%"
          elevation="8"
        >
        <v-row>
        <v-col cols="12" md="2">
          <v-img src="../assets/Louise.png" width="55"></v-img>
        </v-col>
        <v-col>
          <h3 class="mb-3 pa-3">Louise (Assistante virtuelle de {{ userName }})</h3>
        </v-col>
        <v-col cols="12" md="1" class="mr-2 my-2" v-if="loading && item.id == 3">
          <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
        </v-col>
      </v-row>
      <v-divider class="my-1"></v-divider>
      <v-col>
        <span style="white-space: pre-wrap;">
          {{ item.text }}
        </span>
        </v-col>
        </v-sheet>
      </template>
    </v-virtual-scroll>
    <v-bottom-navigation
      height="150"
      style="background-color: rgb(255, 249, 232, 0.8)"
    >
      <v-text-field
        density="compact"
        placeholder="Enter your request"
        prepend-inner-icon="mdi-message-text"
        variant="outlined"
        v-model="request"
        class="pa-5 px-16 align-center justify-center"
        append-inner-icon="mdi-send"
        @click:append-inner="sendRequest"
        @keyup.enter.native="sendRequest"
        :loading="loading"
        :disabled="loading"
      ></v-text-field>
    </v-bottom-navigation>
  </v-app>
</template>

<script>
import axios from "axios";

export default {
  data: () => ({
    items: [{ title: "Fichier" }],
    userName: "",
    request: "",
    promptArray: [
      {
        id: 0,
        text: "",
      },
    ],
    loading: false,
  }),
  methods: {
    getUserName() {
      axios
        .post("http://localhost:3001/home", {
          id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response);
          this.userName = response.data[0].firstname;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    sendRequest() {
      this.loading = true;
      console.log(this.loading);
      if (this.request == "") {
        this.loading = false;
        return;
      }
      this.promptArray.push({
        id: 1,
        text: this.request,
      });
      this.promptArray.push({
            id: 3,
            text: "Je suis en train de chercher une réponse à votre question, veuillez patienter quelques instants...",
          });
      axios
        .post("http://localhost:3001/prompt", {
          prompt: this.request,
          id: this.$route.params.id,
        })
        .then((response) => {
          console.log(response.data);
          var last_item = this.promptArray[this.promptArray.length - 1];
          last_item.id = 2;
          last_item.text = response.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
          var last_item = this.promptArray[this.promptArray.length - 1];
          last_item.id = 2;
          last_item.text = "Un problème est survenu, veuillez réessayer plus tard.";
          this.loading = false;
        });
      this.request = "";
    }
  },
  created() {
    this.getUserName();
  },
};
</script>
