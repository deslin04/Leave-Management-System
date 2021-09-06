<template>
  <div>
    <v-app-bar dark color="blue darken-3" fixed>
      <v-app-bar-nav-icon><v-icon x-large>mdi-bat</v-icon></v-app-bar-nav-icon>

      <strong><h2>LMS</h2></strong>

      <v-spacer></v-spacer>

      <v-tooltip bottom v-if="isLogin == 1">
        <template v-slot:activator="{ on, attrs }">
          <v-icon dark v-bind="attrs" v-on="on" @click="logOut">
            mdi-logout
          </v-icon>
        </template>
        <span>LogOut</span>
      </v-tooltip>

      <v-dialog v-model="dialogLogout" max-width="420px">
        <v-card>
          <v-card-title class="text-h5"
            >Are you sure you want to logout?</v-card-title
          >
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="closeLogout">No</v-btn>
            <v-btn color="blue darken-1" text @click="logOutConfrim">Yes</v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Header extends Vue {

  private dialogLogout = false;
//open logout dialogues
  logOut() {
    this.dialogLogout = true;
  }

//logout function
  logOutConfrim() {
    this.$router.push("/");
    this.$store.dispatch("userId", "");
    this.$store.dispatch("isLogin", 0);
    this.$store.dispatch("repOfficerLeave", 0);
    this.dialogLogout = false;
  }
  
  //close logout dialogue
  closeLogout() {
    this.dialogLogout = false;
  }

  get isLogin() {
    return this.$store.getters.getIsLogin;
  }
}
</script>

<style scoped>
.logo {
  padding: 0px;
}
</style>