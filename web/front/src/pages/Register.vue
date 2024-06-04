<template>
  <div>
    <img
      class="mx-auto d-block mb-12 pt-10"
      src="../assets/Sisley_Paris_logo.svg"
      style="width: 200px"
    />
    <v-card
      class="mx-auto pa-12 pb-8"
      elevation="8"
      max-width="448"
      rounded="lg"
    >
      <div class="text-subtitle-1 text-medium-emphasis">Prénom</div>

      <v-text-field
        density="compact"
        placeholder="Entrez votre prénom"
        prepend-inner-icon="mdi-account"
        variant="outlined"
        v-model="firstName"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Nom de famille</div>

      <v-text-field
        density="compact"
        placeholder="Entrez votre nom de famille"
        prepend-inner-icon="mdi-account-box"
        variant="outlined"
        v-model="name"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis">Email</div>

      <v-text-field
        density="compact"
        placeholder="Entrez votre adresse e-mail"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="emailAdress"
      ></v-text-field>

      <div
        class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between"
      >
        Mot de passe
      </div>

      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Entrez votre mot de passe"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
      ></v-text-field>

      <v-btn
        block
        class="mb-8 mt-8"
        color="black"
        size="large"
        variant="tonal"
        @click="register_account"
        :disabled="!emailAdress || !password || !firstName || !name"
      >
        S'enregistrer
      </v-btn>
      <v-alert
        v-if="errorStatus == 400"
        type="error"
        title="Error"
        :text="errorMessage"
      ></v-alert>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          @click="$router.push('/')"
          rel="noopener noreferrer"
          target="_blank"
          cursor="pointer"
        >
          Vous avez déjà un compte ? <v-icon icon="mdi-chevron-right"></v-icon>
        </a>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    visible: false,
    firstName: "",
    name: "",
    emailAdress: "",
    password: "",
    errorMessage: "",
    errorStatus: 0,
  }),
  methods: {
    register_account() {
      console.log(this.firstName, this.name, this.emailAdress, this.password);
      axios
        .post("http://localhost:3001/register", {
          firstname: this.firstName,
          name: this.name,
          password: this.password,
          email: this.emailAdress,
        })
        .then((resp) => {
          this.errorMessage = "";
          this.errorStatus = 0;
          console.log(resp.data);
          this.$router.push(`/`);
        })
        .catch((error) => {
          if (error.response) {
            console.log("Error response status:", error.response.status);
            console.log("Error response data:", error.response.data);
            this.errorMessage = error.response.data.message;
            this.errorStatus = error.response.status;
          }
        });
    },
  }
};
</script>
