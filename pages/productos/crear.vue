<template>
<b-form @submit.prevent="guardarProducto">
<div>
    <h1>Nuevo Producto</h1>
    <b-container   class="bv-example-row">
    <b-row>
        <b-col cols="5">
        <form name="from producto">
            <div class="form-group">
                <label for="url">Imagen</label>
                <input type="text" required v-model="form.imagen" class="form-control" name="url" placeholder="Ingrese url">
                <label for="Nombre">Nombre del producto</label>
                <input type="text" required v-model="form.nombre" class="form-control" name="Nombre del procucto" placeholder="Ingrese producto">
                <label for="url">Precio</label>
                <input type="number" required v-model="form.precio" class="form-control" name="Precio" placeholder="Ingrese precio">
                <label for="url">Cantidad</label>
                <input type="number" required v-model="form.cantidad" class="form-control" name="Cantidad" placeholder="Ingrese cantidad">
            </div>
            <div class="row" id="galeria"></div>
        </form>
        </b-col>
    </b-row>
    <b-row class="text-center">
        <b-col lg="4" >

    <b-spinner small v-if="variable" ></b-spinner>
    
   
            <b-button variant="primary" type="submit" :disabled="mia">Guardar</b-button>
            <b-button variant="primary" href="/productos">Volver</b-button>
        </b-col>
    </b-row>
    </b-container>
    </div>
</b-form>
</template>
<script>
import { db } from '../../services/firebase';
export default {
    data(){
        return {
            form: {
                nombre: '',
                cantidad: '',
                precio: '',
            },
           variable: false,
           mia: false 

        }
    },
    methods: {
        guardarProducto(){
            this.variable = true
            this.mia = true
            db.collection("productos").add(this.form).then(res=>{
                this.$router.push({
                    path: "/productos"
                })
             })
           
        }
    }
    }

</script>
