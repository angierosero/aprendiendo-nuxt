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
         <b-nav-item href="/categoria">Categoria</b-nav-item>
        
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
         <b-nav-item href="/registrar" v-if="!user" >Registrar</b-nav-item>
         <b-nav-item href="/login" v-if="!user" >Iniciar sesion</b-nav-item>
         <b-dropdown  v-if="user" :text="user.displayName" >
            <b-dropdown-item @click="cerrarSesion"> Cerrar Sesión</b-dropdown-item>
         </b-dropdown>
       </b-navbar-nav>
       
    </b-collapse>
  </b-navbar>
</template>
<script>
import { auth } from "../services/firebase";
export default {
  data(){
    return{
      user: false
    }
  },
  created(){
    auth.onAuthStateChanged(user => {
      this.user = user                                         
    })
  },
  methods: {
    cerrarSesion(){
      auth.signOut()
    }
  }
};
</script>

