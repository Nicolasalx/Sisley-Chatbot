<template>
  <div class="background_image">
    <!-- <div id=nav>
      <router-link to="/connexion">Connexion</router-link>
    </div> -->
    <router-view/>
  </div>
</template>

<script setup>
  //
</script>

<style scoped>
.background_image {
  background-image: url('./assets/sisley.jpg');
  background-size: cover;
  height: 100vh;
  width: 100vw;
}
</style>