<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand href="#">{{ $t("app-title") }}</b-navbar-brand>
    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
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
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>

<script>
export default {
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
