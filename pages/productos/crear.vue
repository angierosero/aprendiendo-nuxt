<template>
  <div class="row mt-4">
    <b-container fluid>
      <b-col sm="3">
        <label for="imagen">Imagen:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input placeholder="Url de Imagen" type="text"></b-form-input>
      </b-col>
      <b-col sm="3">
        <label for="nombre">Nombre:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input placeholder="Nombre del producto" type="text"></b-form-input>
      </b-col>
      <b-col sm="3">
        <label for="precio">Precio:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input placeholder="Precio del producto" type="number"></b-form-input>
      </b-col>
      <b-col sm="3">
        <label for="cantidad">Cantidad:</label>
      </b-col>
      <b-col sm="9">
        <b-form-input placeholder="Cantidad" type="number"></b-form-input>
      </b-col>
      <br>
      <b-col sm="3">
        <b-button variant="secondary">Guardar</b-button>
      </b-col>
    </b-container>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  }
};
</script>
