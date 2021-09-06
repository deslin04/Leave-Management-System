<template>
  <v-container>
    <div class="d-flex pa-2">
      <!-- image -->
      <div>
        <v-img src="..\assets\login.png" width="625" height="505"></v-img>
      </div>

      <div style="width: 50%">
        <div style="text-align: center">
          <v-icon color="blue darken-3" x-large>mdi-bat</v-icon>
          <h1>LMS</h1>
        </div>
        <!-- login form -->
        <div class="loginform">
          <h2 style="text-align: center">Sign in</h2>

          <v-form @submit.prevent="login">
            <v-text-field
              label="Username"
              filled
              rounded
              v-model="body.username"
              required
            ></v-text-field>

            <v-text-field
              label=" Password"
              filled
              rounded
              type="password"
              v-model="body.password"
              required
            ></v-text-field>

            <div class="text-center">
              <v-btn
                rounded
                color="blue darken-3"
                dark
                x-large
                width="200px"
                type="submit"
              >
                Sign in
              </v-btn>
            </div>
          </v-form>
        </div>
      </div>
    </div>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import EmployeDataService from "../sevices/EmployeDataService";

@Component({
  components: {},
})
export default class Login extends Vue {

  private body = {
    username: "",
    password: "",
  };

//login function
  login() {
    EmployeDataService.loginAuth(this.body)
      .then((response) => {
        console.log(response);
        let empId = response.data.empId;
        let userType = response.data.userType;

        if (empId) {
          this.$store.dispatch("userId", empId);
          this.$store.dispatch("isLogin", 1);

          this.$router.push("Homepage");
        } else {
          alert("login failed");
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  
}
</script>


<style scoped>
.v-application .pa-2 {
  padding: 8px !important;
  margin-top: 10px;
}

h2 {
  margin-bottom: 20px;
}

.loginform {
  width: 70%;
  margin-top: 25px;
  margin-left: 78px;
}
</style>