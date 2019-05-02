<template>
  <div>
    <!-- Styled -->
    <h1>SUBIR IMAGEN</h1>
    <b-form-file placeholder="Seleccione Imagen..." v-model="file" accept=".jpg, .png, .gif"></b-form-file>
    <div class="mt-3">Archivo seleccionado: {{ file ? file.name : '' }}</div>
    <b-button @click="guardar(file)">nuevo</b-button>
    <img width="200" :src="imagen">
  </div>
</template>

<script>
import { db } from "../../services/firebase";
export default {
  data() {
    return {
      file: null,
      imagen: null
    };
  },
  methods: {
    guardar(file) {
     
      v
    
    }
  }
};
</script>
