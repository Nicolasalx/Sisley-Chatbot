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

        <a
          class="text-caption text-decoration-none text-blue"
          @click="(login = !login), (register = !register)"
          rel="noopener noreferrer"
          target="_blank"
        >
          Mot de passe oublié ?</a
        >
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
        @click="login_account"
        :disabled="!emailAdress || !password"
      >
        Se connecter
      </v-btn>

      <v-card-text class="text-center">
        <a
          class="text-blue text-decoration-none"
          @click="$router.push('/register')"
          rel="noopener noreferrer"
          target="_blank"
          cursor="mouse"
        >
          Vous n'avez pas de compte ? <v-icon icon="mdi-chevron-right"></v-icon>
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
    emailAdress: "",
    password: "",
  }),
  methods: {
    login_account() {
      axios
        .post("http://localhost:3001/login", {
          email: this.emailAdress,
          password: this.password,
        })
        .then((response) => {
          this.$router.push(`/home/${response.data[0].id}`);
          console.log(response.data[0].id);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>
