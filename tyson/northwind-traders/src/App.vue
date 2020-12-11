<template>
  <div id="app">
    <header>
      <header>
        <nav-bar :user="auth.currentUser"></nav-bar>
      </header>
    </header>

    <div class="container">
      <div class="row">
        <div class="col">
          <main role="main" class="flex-shrink-0">
            <div class="container">
              <router-view />
            </div>
          </main>
        </div>
      </div>
    </div>
    <footer class="footer mt-auto py-3">
      <div class="container">
        <span class="text-muted">
          Northwind Traders &copy; 2019 - Build:
          {{ release.build }} - Environment: {{ release.environment }} - Failed
          Health Checks:
          {{ failedHealthCheckCount }}
        </span>
      </div>
    </footer>
  </div>
</template>

<script>
import NavBar from "./components/NavBar.vue";
import { AuthService } from "@/services/NorthwindService.js";
import { mapState, mapGetters } from "vuex";

export default {
  name: "app",
  components: {
    NavBar,
  },
  data() {
    return {
      auth: Object,
    };
  },
  created() {
    this.auth = AuthService;
    AuthService.token();
  },
  computed: {
    ...mapState(["release", "healthChecks"]),
    ...mapGetters(["failedHealthCheckCount"]),
    release() {
      return this.$store.state.release;
    },
  },
};
</script>

<style lang="scss">
@import "./assets/custom.scss";
@import "~bootswatch/dist/Darkly/variables";
@import "~bootstrap/scss/bootstrap";
@import "~bootswatch/dist/Darkly/bootswatch";
@import "~bootstrap-vue/dist/bootstrap-vue";
@import url(https://fonts.googleapis.com/css?family=Comfortaa);
</style>

<style>
html,
body {
  height: 100%;
  font-family: "Comfortaa", cursive !important;
}

#app {
  display: flex;
  flex-direction: column;
  height: 100%;
}

main > .container {
  padding: 8px 15px 8px 15px;
}

.footer {
  background-color: #f5f5f5;
}

.footer > .container {
  padding-right: 15px;
  padding-left: 15px;
}
</style>
