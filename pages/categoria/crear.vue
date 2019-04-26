<template>
<b-form @submit.prevent="guardarProducto">
<div>
    <h1>Nuevo Producto</h1>
    <b-container   class="bv-example-row">
    <b-row>
        <b-col cols="5">
        <form name="from producto">
            <div class="form-group">
                c<label for="Nombre">Nombre de Categoria</label>
                <input type="text" required v-model="form.nombre" class="form-control" name="nombre" placeholder="Ingrese categoria">
                </div>
            <div class="row" id="galeria"></div>
        </form>
        </b-col>
    </b-row>
    <b-row class="text-center">
        <b-col lg="4" >

    <b-spinner small v-if="variable" ></b-spinner>
            <b-button variant="primary" type="submit" :disabled="mia">Guardar</b-button>
            <b-button variant="primary" href="/categoria">Volver</b-button>
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
                nombre: ''
            },
           variable: false,
           mia: false 

        }
    },
    methods: {
        guardarProducto(){
            this.variable = true
            this.mia = true
            db.collection("categoria").add(this.form).then(res=>{
                this.$router.push({
                    path: "/categoria"
                })
             })
           
        }
    }
    }

</script>
