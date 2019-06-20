<template>
    <b-card
        :title="precio"
        :img-src="imagen"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 20rem;"
        class="mb-2"
      >
        <b-card-text>{{ nombre}}</b-card-text>

        <b-button :href="'/busqueda/' +slug" variant="primary">Detalles</b-button>
      </b-card>
</template>
<script>
export default {
    props:['precio', 'nombre', 'imagen', 'slug']
    
}
</script>

