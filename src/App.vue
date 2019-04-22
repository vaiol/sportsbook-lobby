<template>
  <v-app>
    <v-toolbar app>
      <v-toolbar-title class="headline text-uppercase">
        <span>sportsbook</span>
        <span class="font-weight-light">lobby</span>
      </v-toolbar-title>
    </v-toolbar>

    <v-content>
      <SportsBookPage />
    </v-content>
  </v-app>
</template>

<script>
import SportsBookPage from "./components/SportsBookPage";

export default {
  name: "App",
  components: {
    SportsBookPage
  }
};
</script>
