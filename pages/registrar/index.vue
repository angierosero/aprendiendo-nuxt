<template>
<div class="container-fluid row mt-5" >
    <div class="row mx-auto">
        <b-card  header-tag="header" >
        <h6 align="center" slot="header" class="mb-2 ">Iniciar sesión</h6>
            <b-form @submit.prevent="registro">
                 <b-form-group label="Nombre :" label-for="Nombre">
                    <b-form-input v-model="form.nombre" id="input-live" placeholder="Nombre " required></b-form-input>
                </b-form-group>
                <b-form-group label="Email :" label-for="email">
                    <b-form-input v-model="form.email" id="email" type="email"  placeholder="Email" required></b-form-input>
                </b-form-group >
                <b-form-group label="Contraseña :" label-for="password" required>
                    <b-form-input v-model="form.password" type="password" id="password" placeholder="contraseña"></b-form-input>
                </b-form-group>
                <div align="right" >
                    <b-button  type="submit" variant="success">Guardar</b-button>
                </div>
            </b-form>
        </b-card>
    </div>
</div>
 
</template>
<script>
import { auth } from "../../services/firebase";
export default {
    data() {
        return {
            form: {
                nombre: "",
                email: "",
                password: ""
            }
        }
    },
    methods: {
        registro(){
            auth.createUserWithEmailAndPassword(this.form.email, this.form.password).then(res =>{
                alert("REGISTRO EXITOSO")
            }).catch(error =>{
                alert("ha ocurrido un error "+error.message)
            })
        }
    }
}
</script>