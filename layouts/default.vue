<template>
  <div>
     <navbar />
     <div class="container">
        <nuxt/>
     </div>
  </div>
</template>
<script>
import navbar from "../components/navbar";

export default {
  components: { navbar }
};
</script>
