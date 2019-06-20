<template>
  <div>
    <div class="row mt-5">
      <div class="col-sm-6">
        <h2>Listado de productos</h2> 
      </div>
      <div class="col-sm-3">
        <b-button  variant="primary" v-b-modal.nuevo @click="nuevoProducto()">nuevo</b-button>
      </div>
    </div>
    <div class="row mt-2">
      <b-table
       text-align= "center"
        striped bordered hover 
        id="my-table"
        :fields="fields"
        :items="productos"
        :per-page="perPage"
        :current-page="currentPage"
        :busy="isBusy"
        small
      >

      <div slot="table-busy" class="text-center my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
      <template slot="imagen" slot-scope="data">
           <b-img  height="60" :src="productos[data.index].imagen" ></b-img> 
        </template>
        <template slot="acciones" slot-scope="data">
          <!-- :pressed="true" -->
          <b-button   variant="success" class="open-AddBookDialog" type="button" @click="editarProducto(data.item.id,data.index)" v-b-modal.nuevo size="sm">Editar</b-button>
          <b-button variant="danger" type="button" @click="mensaje(data.item.id,data.index)" size="sm">eliminar</b-button>
        </template>
      </b-table>
    </div>
    <!-- footer-bg-variant="dark"
      footer-text-variant="light" -->
    <b-modal  header-bg-variant="info" header-text-variant="light"    v-model="show" 
     id="nuevo" ref="modal" :title="tituloModal"  @show="resetModal" @hidden="resetModal" >
      <form ref="form">
        <b-form-group id="input-group-1" label="Imagen:" label-for="imagen">
        <b-form-file v-model="imageProduct" placeholder="Elige una imagen" accept="image/"></b-form-file>
        </b-form-group>
        <b-form-group :state="nameState" label="Nombre"  label-for="nombre" invalid-feedback="Nombre es requerido">
        <b-form-input id="nombre" v-model="form.nombre" :state="nameState" required>{{form.nombre}}</b-form-input></b-form-group>
         <b-form-group  :state="nameState" label="Precio"  label-for="precio" invalid-feedback="precio es requerido">
        <b-form-input type="number" id="precio" v-model="form.precio" :state="nameState" required></b-form-input> </b-form-group>
        <b-form-group :state="nameState" label="Cantidad"  label-for="cantidad" invalid-feedback="Cantidad es requerida">
        <b-form-input type="number" id="cantidad" v-model="form.cantidad" :state="nameState" required></b-form-input>
        </b-form-group>
        <b-form-group label="categoria" label-for="categoria">
        <b-form-select v-model="form.categoria" :options="categoria"></b-form-select>
        </b-form-group>  
      </form>
      <!-- style="background-color: lightslategray"  -->
      <div slot="modal-footer" >
        <b-button variant="danger" @click="show=false" > Cancelar </b-button>
        <b-button variant="success" @click="handleOk"> Guardar </b-button>
      </div>
    </b-modal>
    <!-- acaba -->
    <div class="mt-3">
      <b-pagination
        align="center"
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>
    </div>
   
  </div>
  
</template>
 
<script>
import { db, storage } from "../../services/firebase";
//import { database } from 'firebase';
export default {
  asyncData() {
    return db
      .collection("productos").orderBy("nombre","asc")
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
          perPage: 7
        };
       
      });
      
  },
  data() {
    return {
        
      imageProduct: "",
      show: false,
      isBusy: false,
      boxTwo: '',
      define: "",
      esteid: "",
      categoria: [],
      form: {
        imagen: '',
        nombre: '',
        cantidad: '',
        precio: '',
        categoria: ''
      },
      variable: false,
      nameState: null,
      tituloModal: "Nuevo Producto",
      fields: [
        {key:"imagen"},
        {
          key:"nombre",
          sortable:true
        }, 
        {key:"precio"}, 
        {key:"cantidad"}, 
        {key:"categoria"},
        {key:"acciones"}]
    };
  },
  computed: {
    rows() {
      return this.productos.length;
    }
  },
  methods: {
  mensaje(id, index) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('Por favor, confirme si desea eliminar.', {
        title: 'Eliminar',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'dark',
        okTitle: 'SI',
        cancelTitle: 'NO',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          this.boxTwo = value
          if (this.boxTwo == true) {
             this.isBusy = true
              db.collection("productos").doc(id).delete().then(() => {
              let index;
              this.productos.map((value, key) => {
                if (value.id == id) index = key;
              });
              this.productos.splice(index, 1);
               this.isBusy = false
            });
          }
        })
        .catch(err => {
          // An error occurred
        })
    },
    ///EDITAR PRODUCTO
    editarProducto(id, index) {
      db.collection("categoria")
      .get()
      .then(categoriaSnap => {
        this.categoria = [];
        categoriaSnap.forEach(value => {
          this.categoria.push(value.data().nombre);
        });
      });
      this.variable = false
      this.tituloModal = "Editar producto";
      this.define = "editar"
      this.esteid = id
      this.productos.map((value, key) => {
       if(value.id ==id){
           this.form = {
            imagen: value.imagen,
            nombre: value.nombre,
            cantidad:  value.cantidad,
            precio: value.precio,
            categoria: value.categoria
          }
       }
      });
    },
    nuevoProducto() {
      console.log(this.productos[5].imagen)
      /// AQUI CARGA EL 
      db.collection("categoria")
      .get()
      .then(categoriaSnap => {
        this.categoria = [];
        categoriaSnap.forEach(value => {
          this.categoria.push(value.data().nombre);
        });
      });
      ////
      console.log("categoria")
      console.log(this.categoria)
      this.variable = false
      this.define = "nuevo"
      this.tituloModal = "Nuevo producto";
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
    },
    resetModal() {
      if(this.define == "nuevo"){
        this.imageProduct = ''
        this.form= {
          imagen:'',
          nombre: '',
          cantidad: '',
          precio: '',
          categoria: ''
        }
      }
      
      this.nameState = null
    },
    handleOk(bvModalEvt) {
      bvModalEvt.preventDefault()
      this.handleSubmit()
     
    },
    handleSubmit() {
      if (!this.checkFormValidity()) {
        return
      }
      this.isBusy = true
      if(this.define == "editar"){
        console.log("ingreso a editar")
          db.collection("productos").doc(this.esteid).set(this.form).then(res=>{
           db.collection("productos").orderBy("nombre","asc")
        .get()
        .then(productosSnap => {
          this.productos = [];
          productosSnap.forEach(value => {
            this.productos.push({
              id: value.id,
              ...value.data()
            });
          }); 
          this.isBusy = false
          }) 
        }) 
      }
      if(this.define == "nuevo"){
         console.log("ingreso a nuevo")
      //     let imageRef = storage.child(this.imageProduct.name);
      // imageRef.put(this.imageProduct).then(async imageRes => {
      //   this.form.imagen = await imageRes.ref.getDownloadURL();
             db.collection("productos").add(this.form).then(res=>{
              this.$router.push({
                  path: "/productos"
              })
            db.collection("productos").orderBy("nombre","asc")
            .get()
            .then(productosSnap => {
              this.productos = [];
              productosSnap.forEach(value => {
                this.productos.push({
                  id: value.id,
                  ...value.data()
                })
              })
              this.isBusy = false
              }) 
           })
        
        //////////
      }
      
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
};
</script>
