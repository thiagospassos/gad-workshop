<template>
  <b-navbar
    toggleable="md"
    type="dark"
    placement="fixed"
    fill="false"
    variant="dark"
  >
    <div class="container">
      <b-navbar-brand to="/">Northwind Traders</b-navbar-brand>
      <b-navbar-toggle target="navbarCollapse"></b-navbar-toggle>
      <b-collapse is-nav id="navbarCollapse">
        <b-navbar-nav class="mr-auto">
          <b-nav-item to="/" :exact="true"
            ><i class="fas fa-camera fa-fw"></i>Home</b-nav-item
          >
          <b-nav-item to="/suppliers"
            ><i class="fas fa-frog fa-fw"></i>Suppliers</b-nav-item
          >
          <b-nav-item to="/categories"
            ><i class="fas fa-user-ninja vanished fa-fw"></i
            >Categories</b-nav-item
          >
          <b-nav-item to="/products"
            ><i class="item fas fa-poop vanished fa-fw"></i>Products</b-nav-item
          >
        </b-navbar-nav>
        <b-navbar-nav v-if="isLoggedIn">
          {{ user.email }}
          <b-nav-item @click="logout()">Logout</b-nav-item>
        </b-navbar-nav>
        <b-navbar-nav v-if="!isLoggedIn">
          <b-nav-item to="/login">Login</b-nav-item>
        </b-navbar-nav>
        <b-nav-item v-if="isLoggedIn" v-b-toggle.collapseNotifications
          >Notifications
          <b-badge>{{ $store.getters.notificationCount }}</b-badge>
        </b-nav-item>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
import { AuthService } from "@/services/NorthwindService.js";

export default {
  props: {
    user: Object,
  },
  computed: {
    isLoggedIn() {
      return !!this.user;
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push("/");
    },
  },
};
</script>

<style scoped lang="sass">
$color: red
.nav > .container
  min-height: 56px
  color: $color
.item
  color: red
</style>
