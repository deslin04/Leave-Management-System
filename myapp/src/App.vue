<template>
<v-app>
  <Header />
   <div class="d-flex pa-2" style="margin-bottom: 34px; margin-top: 56px;">
      <SideBar />

    <v-main>          
      <router-view/>
    </v-main>

   </div>
  <Footer />  
</v-app>  
</template>

<script lang="ts">
import Vue from 'vue';

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import SideBar from "./components/SideBar.vue";

export default Vue.extend({
  name: 'App',

   components: {
       Header,
       Footer,
       SideBar 
    },
  

  data: () => ({
    //
  }),


});
</script>
<style scoped>

.theme--light.v-application {
    background: #f7f7f7;;
    
}

</style>