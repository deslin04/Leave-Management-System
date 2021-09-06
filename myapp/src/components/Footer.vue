<template>
  <v-footer padless fixed dark height="50" color="blue darken-3">
    <v-col class="text-center m-b-3" cols="12">
      {{ new Date().getFullYear() }} — <strong>Vuetif</strong>
    </v-col>
  </v-footer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Footer extends Vue {}
</script>
