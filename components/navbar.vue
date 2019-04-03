<template>
  <!--<div>
    <a href="/">Inicio</a>
    <a href="/contacto">Contacto</a>
  </div>-->
  <!-- MENU -->
  <b-navbar variant="dark" type="dark" toggleable="lg">
    <b-navbar-brand href="/">BootstrapVue</b-navbar-brand>
    <b-navbar-toggle target="menu"></b-navbar-toggle>
    <b-collapse id="menu" is-nav>
      <b-navbar-nav>
        <b-nav-item href="/contacto">Contacto</b-nav-item>
        <b-nav-item href="/productos">Productos</b-nav-item>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</template>
<script>
export default {};
</script>

