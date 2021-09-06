<template>
  <v-container>
    <template>
      <!-- Allrequests table -->
      <v-data-table
        :headers="headers"
        :items="allLeaves"
        class="elevation-1"
        width="800px"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title> All Requests</v-toolbar-title>

            <v-spacer></v-spacer>
            <v-row class="topdrop">
              <!--select department-->
              <v-col cols="3">
                <v-select
                  v-model="department"
                  :items="departments"
                  label="Department"
                  @change="departmentWise()"
                ></v-select>
              </v-col>
              <!--end-select department-->

              <!--date picker from date-->
              <v-col cols="3">
                <v-menu
                  v-model="menu1"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="fromDate"
                      label="From Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="fromDate"
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>

              <!--date picker Till date-->
              <v-col cols="3">
                <v-menu
                  v-model="menu2"
                  :close-on-content-click="false"
                  :nudge-right="40"
                  transition="scale-transition"
                  offset-y
                  min-width="auto"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="tillDate"
                      label="Till Date"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="tillDate"
                    @input="menu2 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
            </v-row>
          </v-toolbar>
        </template>
        <!-- set color based on status -->
        <template v-slot:item.status="{ item }">
          <v-chip :color="getColor(item.status)" dark>
            {{ item.status }}
          </v-chip>
        </template>
        <!-- fromat date -->
        <template v-slot:item.applyDate="{ item }">
          {{ formatDate(item.applyDate) }}
        </template>
      </v-data-table>
      <!-- end-Allrequests table -->
    </template>
  </v-container>
</template>
        

     
  


<script lang="ts">
import { Component, Vue, Prop, Watch } from "vue-property-decorator";
import moment from "moment";
import RequestDataService from "../sevices/RequestDataService";
//import EmployeDataService from "../sevices/EmployeDataService";

@Component({
  components: {},
})
export default class AllRequests extends Vue {
  
  private headers = [
    {
      text: "ID",
      align: "start",
      sortable: false,
      value: "employe.id",
    },
    { text: "Name", value: "employe.name", sortable: false },
    { text: "Department", value: "employe.department.name" },
    { text: "Apply Date", value: "applyDate" },
    { text: "Leave Type", value: "leaveType", sortable: false },
    { text: "From Date", value: "fromDate", sortable: false },
    { text: "Till Date", value: "toDate", sortable: false },
    { text: "Days", value: "days", sortable: false },
    { text: "Reason", value: "reason", sortable: false },
    { text: "Status", value: "status" },
  ];

  private menu1 = false;

  private menu2 = false;

  private fromDate = "";

  private tillDate = "";

  private allRequests: any = [];

  private allLeaves: any = [];

  private department = "All Departments";

  private departments = [
    "All Departments",
    "Accounting",
    "Finace",
    "Human Resoures",
    "Marketing",
    "Sales",
  ];

  //dateformat
  formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  //set different colors based on status
  getColor(status) {
    if (status == "Approved") return "green";
    else if (status == "Pending") return "orange";
    else return "red";
  }

  //get All requests
  allLeavesRequests() {
    RequestDataService.getAllRequests()
      .then((response) => {
        this.allRequests = response.data.allLeaves;
        this.allLeaves = this.allRequests;
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.allLeavesRequests();
  }

  //filter all requests based on selected department
  departmentWise() {
    let dep = [];
    if (this.fromDate || this.tillDate) {
      this.toDateList(this.tillDate);
    } else {
      for (let i = 0; i < this.allRequests.length; i++) {
        if (this.allRequests[i].employe.department.name == this.department) {
          dep.push(this.allRequests[i]);
        }
      }
      if (this.department == "All Departments") {
        this.allLeaves = this.allRequests;
      } else this.allLeaves = dep;
    }
  }

  //filter all requests based on selected from date in data picker
  @Watch("fromDate")
  fromDateList(value) {
    let newlist = [];
   if(this.tillDate){
     this.toDateList(this.tillDate)
   } 
   else{
    if (this.department == "All Departments") {
      for (let i = 0; i < this.allRequests.length; i++) {
        if (this.allRequests[i].applyDate >= this.fromDate) {
          newlist.push(this.allRequests[i]);
        }
        this.allLeaves = newlist;
      }
    } else {
      for (let i = 0; i < this.allRequests.length; i++) {
        if (
          this.allRequests[i].applyDate >= this.fromDate &&
          this.allRequests[i].employe.department.name == this.department
        ) {
          newlist.push(this.allRequests[i]);
        }
        this.allLeaves = newlist;
      }
    }
   }
  }

  //filter all requests based on selected till date in data picker
  @Watch("tillDate")
  toDateList(value) {
    let newlist = [];
    if (this.department == "All Departments") {
      for (let i = 0; i < this.allRequests.length; i++) {
        if (
          moment(this.allRequests[i].applyDate).format("YYYY-MM-DD") >=
            this.fromDate &&
          moment(this.allRequests[i].applyDate).format("YYYY-MM-DD") <=
            this.tillDate
        ) {
          newlist.push(this.allRequests[i]);
        }
      }
      this.allLeaves = newlist;
    } else {
      for (let i = 0; i < this.allRequests.length; i++) {
        if (
          moment(this.allRequests[i].applyDate).format("YYYY-MM-DD") >=
            this.fromDate &&
          moment(this.allRequests[i].applyDate).format("YYYY-MM-DD") <=
            this.tillDate &&
          this.allRequests[i].employe.department.name == this.department
        ) {
          newlist.push(this.allRequests[i]);
        }
      }
      this.allLeaves = newlist;
    }
  }
}
</script>

<style scoped>
.topdrop {
  padding-top: 41px;
}
</style>