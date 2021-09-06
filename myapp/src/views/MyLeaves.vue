<template>
  <v-app>
    <v-container>
      <!--MyLeaves table -->
      <template>
        <v-data-table
          :headers="headers"
          :items="leaves"
          class="elevation-1"
          show-group-by
        >
          <!-- table heading -->
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>My Leaves</v-toolbar-title>
            </v-toolbar>
          </template>
          <!-- change color based on status -->
          <template v-slot:item.status="{ item }">
            <v-chip :color="getColor(item.status)" dark>
              {{ item.status }}
            </v-chip>
          </template>
          <!-- format date -->
          <template v-slot:item.applyDate="{ item }"> 
         
         {{formatDate(item.applyDate)}}
        
        </template>
        </v-data-table>
      </template>
       <!-- end-MyLeaves table -->
    </v-container>
  </v-app>
</template>
       

     
  


<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import moment from "moment"

@Component({
  components: {},
})
export default class MyLeaves extends Vue {

  private headers = [
    {
      text: "LeaveType",
      align: "start",
      value: "leaveType",
      groupable: false,
    },

    { text: "Apply Date", value: "applyDate", groupable: false },
    { text: "From Date", value: "fromDate", sortable: false, groupable: false },
    { text: "Till Date", value: "toDate", sortable: false, groupable: false },
    { text: "Days", value: "days", sortable: false, groupable: false },
    { text: "Reason", value: "reason", sortable: false, groupable: false },
    { text: "Status", value: "status" },
  ];

//change color based on status
  getColor(status) {
    if (status == "Approved") return "green";
    else if (status == "Pending") return "orange";
    else return "red";
  }

//dateformat
 formatDate(date){
  return moment(date).format('YYYY-MM-DD')
 }  

//get employe leave from store
  get leaves() {
    return this.$store.getters.getEmpLeaves;
  }
  
}
</script>