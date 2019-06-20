<template>
<div class="container-fluid row mt-5" >
    <div class="row mx-auto">
        <b-card  header-tag="header" >
        <h6 align="center" slot="header" class="mb-2 ">Iniciar sesión</h6>
            <b-form @submit.prevent="iniciarSesion" class="">
                <b-form-group label="Email :" label-for="email">
                    <b-form-input v-model="form.email" id="email" type="email"  placeholder="Email" required></b-form-input>
                </b-form-group >
                <b-form-group label="Contraseña :" label-for="password" required>
                    <b-form-input v-model="form.password" type="password" id="password" placeholder="Contraseña "></b-form-input>
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
import { auth } from "../services/firebase";
export default {
     data() {
        return {
            form: {
                email: "",
                password: ""
            }
        }
    },
    methods: {
        iniciarSesion(){
            auth.signInWithEmailAndPassword(this.form.email, this.form.password).then(res => {
                this.$router.push({ path: "/" })
            }).catch(err => {
                alert("Ha ocurrido un error"+ err.message)
            })
        }
    }
}
</script>

