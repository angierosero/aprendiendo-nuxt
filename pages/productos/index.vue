<template>
  <div>
    <div class="row mt-5">
      <div class="col-sm-6">
        <h2>LISTADO DE PRODUCTOS</h2>
      </div>
      <div class="col-sm-6">
        <b-button variant="primary" href="/productos/crear">nuevo</b-button>
      </div>
    </div>
    <div class="row mt-2">
      <b-table
        id="my-table"
        :fields="fields"
        :items="productos"
        :per-page="perPage"
        :current-page="currentPage"
        small
      >
      
        <template slot="acciones" slot-scope="data">
          <b-button variant="success">Editar</b-button>
        <b-button variant="danger" type="button" @click='eliminarProducto(data.item.id,data.index)'>eliminar</b-button>
        </template>
      </b-table>
    </div>
    <div class="mt-3">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
  </div>
</template>

<script>
import { db } from "../../services/firebase";
export default {
  asyncData() {
    return db
      .collection("productos")
      .get()
      .then(productosSnap => {
        let productos = [];
        productosSnap.forEach(value => {
          productos.push({
            id: value.id,
            ...value.data()
            });
        });
        return {
          productos,
          currentPage: 1,
          perPage: 5
        };
      });
  },
  data() {
    return {
      fields: ["Imagen", "nombre", "precio", "cantidad", "acciones"]
    };
  },
  computed: {
    rows() {
      return this.productos.length;
    }
  },
  methods: {
    eliminarProducto(id,index){
      console.log("id: "+id)
      db.collection("productos").doc(id).delete().then(() =>{
        let index
        this.productos.map((value,key)=>{
            if(value.id==id) index = key
        })
        this.productos.splice(index, 1)
      })
    }
  }
};
</script>
