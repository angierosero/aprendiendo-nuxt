<template>
  <div>
    <div class="row mt-5">
      <div class="col-sm-6">
        <h2>Listado de categoria</h2>
      </div>
      <div class="col-sm-6">
        <b-button  variant="primary" v-b-modal.nuevo @click="nuevoCategoria()">nuevo</b-button>
      </div>
    </div>
    <div class="row mt-2">
      <b-table
       striped bordered hover 
        id="my-table"
        :fields="fields"
        :items="categoria"
        :per-page="perPage"
        :current-page="currentPage"
        :busy="isBusy"
        small
      >
      <div slot="table-busy" class="text-center my-2">
        <b-spinner class="align-middle"></b-spinner>
        <strong>Loading...</strong>
      </div>
        <template slot="acciones" slot-scope="data">
          <b-button  variant="success" @click="editarCategoria(data.item.id)" v-b-modal.nuevo size="sm">Editar</b-button>
          <b-button variant="danger" type="button" @click="mensaje(data.item.id,data.index)" size="sm">eliminar</b-button>
        </template>
      </b-table>
    </div>
    <!-- MODAL -->
    <b-modal header-bg-variant="info" header-text-variant="light"   v-model="show"
     id="nuevo" ref="modal" :title="tituloModal"  @show="resetModal" @hidden="resetModal" @ok="handleOk" >
      <form ref="form" @submit.stop.prevent="handleSubmit">
        <b-form-group :state="nameState" label="Nombre"  label-for="nombre" invalid-feedback="Nombre es requerido">
        <b-form-input id="name-input" v-model="form.nombre" :state="nameState" required></b-form-input> </b-form-group>
        <b-form-group :state="nameState" label="descripcion"  label-for="descripcion" >
        <b-form-textarea id="name-input" size="sm" v-model="form.descripcion" :state="nameState"></b-form-textarea>
        </b-form-group>
      </form>
      <!-- style="background-color: lightslategray"  -->
      <div slot="modal-footer" >
        <b-button variant="danger" @click="show=false" > Cancelar </b-button>
        <b-button variant="success" @click="handleOk"> Guardar </b-button>
      </div>
    </b-modal>
     <!-- FIN MODAL -->
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
import { db } from "../../services/firebase";
export default {
  asyncData() {
    return db
      .collection("categoria").orderBy("nombre","asc")
      .get()
      .then(categoriaSnap => {
        let categoria = [];
        categoriaSnap.forEach(value => {
          categoria.push({
            id: value.id,
            ...value.data()
            });
        });
        return {
          categoria,
          currentPage: 1,
          perPage: 7
        };
      });
  },
  data() {
    return {
       show: false,
      isBusy: false,
      boxTwo: '',
      define: "",
      esteid: "",
      form: {
        nombre: '',
        descripcion:''
      },
      variable: false,
      nameState: null,
      tituloModal: "",
       fields: [
       
        {
          key:"nombre",
          sortable:true
        }, 
        {key:"descripcion"}, 
        {key:"acciones"}]
    };
  },
  computed: {
    rows() {
      return this.categoria.length;
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
              db.collection("categoria").doc(id).delete().then(() => {
              let index;
              this.categoria.map((value, key) => {
                if (value.id == id) index = key;
              });
              this.categoria.splice(index, 1);
               this.isBusy = false
            });
          }
        })
        .catch(err => {
          // An error occurred
        })
    },
    editarCategoria(id) {
      this.variable = false
      this.tituloModal = "Editar categoria";
      this.define = "editar"
      this.esteid = id
      this.categoria.map((value, key) => {
       if(value.id ==id){
           this.form = {
            nombre: value.nombre,
            descripcion:  value.descripcion
          }
       }
      });
    },
    nuevoCategoria() {
      this.variable = false
      this.define = "nuevo"
      this.tituloModal = "Nueva categoria";
    },
    checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid ? 'valid' : 'invalid'
        return valid
    },
    resetModal() {
      if(this.define == "nuevo"){
        this.form= {
          nombre: '',
          descripcion: ''
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
          db.collection("categoria").doc(this.esteid).set(this.form).then(res=>{
           db.collection("categoria").orderBy("nombre","asc")
        .get()
        .then(categoriaSnap => {
          this.categoria = [];
          categoriaSnap.forEach(value => {
            this.categoria.push({
              id: value.id,
              ...value.data()
            });
          }); 
          this.isBusy = false
          }) 
        }) 
      }
       if(this.define == "nuevo"){
      db.collection("categoria").add(this.form).then(res=>{
        this.$router.push({
            path: "/categoria"
        })
      this.variable = true
      db.collection("categoria").orderBy("nombre","asc")
      .get()
      .then(categoriaSnap => {
        this.categoria = [];
        categoriaSnap.forEach(value => {
          this.categoria.push({
            id: value.id,
            ...value.data()
          });
        }); 
        this.isBusy = false
        }) 
      });
      }
      console.log(this.categoria)
      this.$nextTick(() => {
        this.$refs.modal.hide()
      })
    }
  }
};
</script>
