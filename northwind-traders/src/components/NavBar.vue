<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">{{ $t("app-title") }}</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav v-if="isLoggedIn">
        <router-link to="/" tag="li" :exact="true" class="nav-item" active-class="active">
          <a class="nav-link">Home</a>
        </router-link>
        <router-link to="/suppliers" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Suppliers</a>
        </router-link>
        <router-link to="/categories" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Categories</a>
        </router-link>
        <router-link to="/products" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">Products</a>
        </router-link>
        <router-link to="/about" tag="li" class="nav-item" active-class="active">
          <a class="nav-link">About</a>
        </router-link>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown id="i18n-switch" text="Lang" toggle-class="nav-link-custom" right>
          <b-dropdown-item v-for="(lang, i) in langs" :key="`Lang${i}`" @click="$i18n.locale = lang">{{ lang }}</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item v-if="isLoggedIn" @click="logout()">Logout</b-nav-item>
        <b-nav-item v-if="isLoggedIn" v-b-toggle.collapseNotifications
          >Notifications
          <b-badge>{{ $store.getters.notificationCount }}</b-badge>
        </b-nav-item>
      </b-navbar-nav>
      <b-navbar-nav v-if="!isLoggedIn">
        <b-nav-item to="/login">Login</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
import { AuthService } from "@/services/NorthwindService.js";

export default {
  props: {
    user: Object
  },
  computed: {
    isLoggedIn() {
      return !!this.user;
    }
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/");
    }
  },
  data() {
    return {
      langs: ["en", "pt"]
    };
  }
};
</script>

<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>
