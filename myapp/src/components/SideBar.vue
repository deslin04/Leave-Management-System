<template>
  <!--navigation drawer-->

  <v-navigation-drawer
    v-if="isLogin == 1"
    v-model="drawer"
    :mini-variant.sync="mini"
    permanent
    color="#f7f7f7"
  >
    <v-list-item class="px-2">
      <v-list-item-avatar>
        <v-img src="https://randomuser.me/api/portraits/men/85.jpg"></v-img>
      </v-list-item-avatar>

      <v-list-item-title></v-list-item-title>

      <v-btn icon @click.stop="mini = !mini">
        <v-icon>mdi-chevron-left</v-icon>
      </v-btn>
    </v-list-item>

    <v-list-item link>
      <v-list-item-content>
        <v-list-item-title class="text-h6">
          {{ profile.name }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list nav dense>
      <v-list-item-group active-class="">
        <router-link to="/HomePage">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/MyLeaves">
          <v-list-item link>
            <v-list-item-icon>
              <v-icon>mdi-calendar-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>My Leaves</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/AllRequests" v-if="profile.usertype == 'hr'">
          <v-list-item link>
            <v-list-item-icon>
              <v-badge color="pink" dot>
                <v-icon>mdi-account-box-multiple</v-icon>
              </v-badge>
            </v-list-item-icon>
            <v-list-item-title>All Request</v-list-item-title>
          </v-list-item>
        </router-link>

        <router-link to="/LeavesAction" v-if="profile.usertype == 'repofficer'">
          <v-list-item link>
            <v-list-item-icon>
              <v-badge color="red" dot v-if="counts > 0"></v-badge>
              <v-icon>mdi-account-edit</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Leave Requests</v-list-item-title>
          </v-list-item>
        </router-link>
      </v-list-item-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component
export default class SideBar extends Vue {
  private drawer: any = true;
  private mini: any = true;
  private count = 4;

  $store: any;
  get profile() {
    return this.$store.getters.getProfile;
  }

  get isLogin() {
    return this.$store.getters.getIsLogin;
  }

  get counts() {
    return this.$store.getters.getRepLeaves;
  }
}
</script>

<style scoped>
.v-application a {
  text-decoration: none;
}
</style>