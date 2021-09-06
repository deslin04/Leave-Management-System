<template>
  <v-container>
    <template>
      <!--employesLeaves requests table -->
      <v-data-table
        :headers="headers"
        :items="leaves"
        :items-per-page="4"
        class="elevation-1"
        width="800px"
      >
        <!--approve and delete button-->
        <template v-slot:item.actions="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                class="mr-2"
                color="green"
                v-bind="attrs"
                v-on="on"
                @click="approveItem(item)"
              >
                mdi-check-circle
              </v-icon>
            </template>
            <span>Approve</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-icon
                small
                color="red"
                v-bind="attrs"
                v-on="on"
                @click="rejectItem(item)"
              >
                mdi-close-circle
              </v-icon>
            </template>
            <span>Reject</span>
          </v-tooltip>
        </template>
        <!--end approve and reject button-->

        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title> Leave Requests</v-toolbar-title>

            <v-spacer></v-spacer>

            <!-- approve dialogue-->
            <v-dialog v-model="dialogApprove" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to approve this ?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeApprove"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="approveItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- end approve dialogue-->

            <!-- reject dialogue-->
            <v-dialog v-model="dialogReject" max-width="500px">
              <v-card>
                <v-card-title>
                  <span class="text-h5">Add a reason</span>
                </v-card-title>

                <v-card-text>
                  <v-textarea solo v-model="data.rejectReason"> </v-textarea>
                </v-card-text>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeReject"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="rejectItemConfirm"
                    >Reject</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- end reject dialogue-->
          </v-toolbar>
        </template>
        <!-- format date -->
        <template v-slot:item.applyDate="{ item }">
          {{ formatDate(item.applyDate) }}
        </template>
      </v-data-table>
      <!-- end-employesLeaves requests table -->
    </template>
  </v-container>
</template>
      
       
        

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import RequestDataService from "../sevices/RequestDataService";
import moment from "moment";

@Component({
  components: {},
})
export default class LeavesAction extends Vue {
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
    { text: "Actions", value: "actions", sortable: false },
  ];

  private leaves: any = [];

  private dialogApprove = false;

  private dialogReject = false;

  private index;

  private data = {
    rejectReason: "",
  };

  //get all employes leave requests under the reporting officer
  employeesLeaveRequests() {
    RequestDataService.getLeaveRequests(this.empId)
      .then((response) => {
        this.leaves = response.data.empLeaveRequests;
        this.$store.dispatch("repOfficerLeaves", this.leaves.length);

        console.log(this.leaves.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  mounted() {
    this.employeesLeaveRequests();
  }

  //dateformat
  formatDate(date) {
    return moment(date).format("YYYY-MM-DD");
  }

  //select a request for approval
  approveItem(item) {
    this.index = this.leaves.indexOf(item);
    console.log(this.index, "hellooooooooooooo", this.leaves[this.index].id);
    this.dialogApprove = true;
  }
  //approve selected request
  approveItemConfirm() {
    let id = this.leaves[this.index].id;

    RequestDataService.approveLeave(id)

      .then((response) => {
        console.log(response.data);

        this.employeesLeaveRequests();
        this.closeApprove();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //close approve dialogue
  closeApprove() {
    this.dialogApprove = false;
    this.index = -1;
  }

  //select a leave for rejection and opens dialogue for write diague reason
  rejectItem(item) {
    this.index = this.leaves.indexOf(item);
    console.log(this.index, "hellooooooooooooo", this.leaves[this.index].id);
    this.dialogReject = true;
  }

  //reject selected Leave
  rejectItemConfirm() {
    let id = this.leaves[this.index].id;
    RequestDataService.rejectLeave(id, this.data)
      .then((response) => {
        console.log(response.data);
        this.employeesLeaveRequests();
        this.closeReject();
      })
      .catch((e) => {
        console.log(e);
      });
  }

  //close Reject
  closeReject() {
    this.dialogReject = false;
    this.index = -1;
    this.data.rejectReason = "";
  }
  
  //get empid from store
  get empId() {
    return this.$store.getters.getEmpId;
  }
}
</script>