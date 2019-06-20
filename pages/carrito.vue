<template>  
    <div class="row mt-4">
        <div class="col-sm-4">
            <h2>Carrito de compras</h2>
        </div>
    </div>
</template>
<script>
import{db} from '../services/firebase'
export default {
    asynData(){
        return db.collection('carrito')
        .get().then((carritoSnap) =>{
            let carrito = []
            carritoSnap.forEach((valueCarrito) =>{

                carrito.push({
                    id: valueCarrito.id,
                    cantidad: valueCarrito.data().cantidad,
                    valor: valueCarrito.data().valor,
                    producto
                })
            })
            console.log(carrito)
            return{
                carrito
            }
        })
    }
}
</script>
