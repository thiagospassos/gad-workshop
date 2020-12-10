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
            ><i class="fas fa-poop vanished fa-fw"></i>Products</b-nav-item
          >
        </b-navbar-nav>
      </b-collapse>
    </div>
  </b-navbar>
</template>

<script>
export default {};
</script>

<style scoped>
.nav > .container {
  min-height: 56px;
}
</style>
