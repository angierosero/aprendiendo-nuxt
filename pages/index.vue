<template>
  <div>
    <h1>Hola {{msg}}</h1>
    <input type="text" v-model="msg">
    <button @click="guardar">Guardar</button>
    <table>
        <tr>
            <th>Nombre</th>
        </tr>
        <tr v-for="{item, index} in municipio" :key="index">
            <td> {{ item }}</td>
        </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      msg: "Angie rosero",
      municipio: ['Mocoa','Villagarzon','puerto Asis']
    };
  },
  methods: {
      guardar(){
        this.municipio.push(this.msg)
        this.msg=''
      }
  }
};
</script>

