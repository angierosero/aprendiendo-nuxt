<template>
  <div class="row mt-5">
    <!-- <h1>HOLA {{msg}}</h1>
    <input type="text" v-model="msg">
    <button @click="guardar" class="btn btn-primary">Guardar</button>
    <b-button variant="primary">Guardar</b-button> -->
    <!-- <table>
      <tr>
        <th>nombre</th>
      </tr>
      <tr v-for="(item, index) in municipio" :key="index">
          <td>
            {{item}}
          </td>
      </tr>
    </table> -->
    <div class="col-sm-3 " v-for="producto in productos" :key="producto.id">
     <cardProducto :precio="producto.precio" :nombre="producto.nombre" :imagen="producto.imagen" :slug="producto.slug"/>
      
    </div>
  </div>
</template>
<script>
import { db } from "../services/firebase";
import cardProducto from '../components/cardProducto'
export default {
  components: { cardProducto },
  asyncData(){
    
    return db.collection("productos").get().then(productosSnap => {
       let productos = [];
        productosSnap.forEach(value => {
          productos.push({
            id: value.id,
            ...value.data()
            });
        })
        return{
          productos
        }
    })
  },
  data() {
    return {
      // msg: "ANGIE",
      // municipio: ["mocoa", "villagarzon", "caicedo"]
    };
  },
  methods:{
      guardar(){
         // alert("guardando....#)

        //  this.municipio.push(this.msg)
        //  this.msg=''

      }
  }
}
</script>