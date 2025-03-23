<template>
  <div class="not-found">
    <img class="mb-5 mx-auto" src="@/assets/logo.svg" alt="logo" height="20">
    <h1>404 - Page Not Found</h1>
    <p>Oops! The page you are looking for does not exist.</p>
    <router-link to="/" class="link">Go back home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  margin-top: 50px;
}
</style>
