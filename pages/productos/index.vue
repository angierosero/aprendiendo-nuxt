<template>
  <div>
    <div class="row mt-4">
      <div class="col-sm-4">
        <h2>Listado de productos</h2>
      </div>
      <div class="col-sm-3">
        <b-button variant="secondary" href="/productos/crear">Nuevo</b-button>
      </div>
    </div>
    <div class="row mt-4">
      <b-table striped hover :items="items" :fields="fields"></b-table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: ["Imagen", "Nombre", "Precio", "Cantidad","Acciones"],
      items: [{}]
    };
  }
};
</script>
