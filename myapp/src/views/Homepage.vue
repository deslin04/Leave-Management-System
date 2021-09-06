<template>
  <v-container>
    <!--Leave availability-->
    <v-row dense>
      <v-col cols="3">
        <v-card color="deep-purple darken-1" dark elevation="18" shaped>
          <v-card-title class="text-h6"> Casual Leave </v-card-title>

          <v-card-subtitle>
            <div>total:{{ leavesCount.totalCasual }}</div>
            <div>Balance:{{ leavesCount.casualBalance }}</div>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="green darken-1" dark elevation="18" shaped>
          <v-card-title class="text-h6"> Sick Leave </v-card-title>

          <v-card-subtitle>
            <div>total:{{ leavesCount.totalSick }}</div>
            <div>Balance:{{ leavesCount.sickBalance }}</div>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="#1F7087" dark elevation="18" shaped>
          <v-card-title class="text-h6"> Earned Leave </v-card-title>

          <v-card-subtitle>
            <div>total:{{ leavesCount.totalEarned }}</div>
            <div>Balance:{{ leavesCount.earnedBalance }}</div>
          </v-card-subtitle>
        </v-card>
      </v-col>

      <v-col cols="3">
        <v-card color="teal darken-1" dark elevation="18" shaped>
          <v-card-title class="text-h6"> Loss Of Pay </v-card-title>

          <v-card-subtitle>
            <div>total:{{ leavesCount.totalLop }}</div>
            <div>Balance:{{ leavesCount.lopBalance }}</div>
          </v-card-subtitle>
        </v-card>
      </v-col>
    </v-row>
    <!--Leave availability end-->

    <div>
      <div style="margin-top: 20px">
        <!--pending table-->
         <template>
          <v-data-table
            :headers="headers"
            :items="pendingLeaves"
            :items-per-page="4"
            class="elevation-1"
            width="800px"
          >
            <!--edit and delete button-->
            <template v-slot:item.actions="{ item }">
              <v-icon small class="mr-2" @click="editItem(item)">
                mdi-pencil
              </v-icon>
              <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
            </template>
            <!--end edit and delete button-->

            <template v-slot:top>
              <v-toolbar flat>
                <v-toolbar-title>Pending Leaves</v-toolbar-title>

                <v-spacer></v-spacer>

                <!--apply leave button-->
                <template>
                  <v-dialog v-model="dialog" scrollable max-width="600px">
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn
                        class="mx-2"
                        fab
                        dark
                        small
                        color="blue darken-3"
                        v-bind="attrs"
                        v-on="on"
                        ><v-tooltip bottom>
                          <template v-slot:activator="{ on, attrs }">
                            <v-icon dark v-bind="attrs" v-on="on">
                              mdi-plus
                            </v-icon>
                          </template>
                          <span>Apply Leave</span>
                        </v-tooltip>
                      </v-btn>
                    </template>
                    <v-card>
                      <v-card-title>
                        <span class="text-h5">Leave Application</span>
                      </v-card-title>
                      <v-card-text>
                        <v-container>
                          <v-row>
                            <v-col cols="9">
                              <v-select
                                :items="[
                                  'Casual Leave',
                                  'Sick Leave',
                                  'Earned Leave',
                                  'Loss Of Pay',
                                ]"
                                label="Leave Type*"
                                v-model="leaveApplication.leaveType"
                                required
                              ></v-select>
                            </v-col>

                            <v-col cols="3">
                              <v-text-field
                                v-model="balance"
                                label="Balance Leaves"
                                filled
                                readonly
                               
                              ></v-text-field>
                            </v-col>

                            <v-col cols="6">
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
                                    v-model="leaveApplication.fromDate"
                                    label="From Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="leaveApplication.fromDate"
                                  @input="menu1 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>

                            <v-col cols="6">
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
                                    v-model="leaveApplication.toDate"
                                    label="Till Date"
                                    prepend-icon="mdi-calendar"
                                    readonly
                                    v-bind="attrs"
                                    v-on="on"
                                  ></v-text-field>
                                </template>
                                <v-date-picker
                                  v-model="leaveApplication.toDate"
                                  @input="menu2 = false"
                                ></v-date-picker>
                              </v-menu>
                            </v-col>

                            <v-col cols="12">
                              <v-textarea
                                label="Reason"
                                v-model="leaveApplication.reason"
                              >
                                \
                              </v-textarea>
                            </v-col>

                            <v-col cols="12">
                              <v-file-input
                                accept="image/*"
                                label="File(optional)"
                              >
                              </v-file-input>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn color="blue darken-1" text @click="close">
                          Close
                        </v-btn>
                        <v-btn color="blue darken-1" text @click="applyLeave">
                          Submit
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-dialog>
                </template>
                <!--end apply leave button-->

                <!-- delete dialogue-->
                <v-dialog v-model="dialogDelete" max-width="500px">
                  <v-card>
                    <v-card-title class="text-h5"
                      >Are you sure you want to delete this item?</v-card-title
                    >
                    <v-card-actions>
                      <v-spacer></v-spacer>
                      <v-btn color="blue darken-1" text @click="closeDelete"
                        >Cancel</v-btn
                      >
                      <v-btn
                        color="blue darken-1"
                        text
                        @click="deleteItemConfirm"
                        >OK</v-btn
                      >
                      <v-spacer></v-spacer>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
                <!-- end delete dialogue-->
              </v-toolbar>
            </template>
            <!-- format date -->
          <template v-slot:item.applyDate="{ item }"> 
         
         {{formatDate(item.applyDate)}}
        
        </template>
          </v-data-table>
          <!--end pending table--> 
         </template>
      </div>
    </div></v-container
  >
</template>




<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import RequestDataService from "../sevices/RequestDataService";
import EmployeDataService from "../sevices/EmployeDataService";
import moment from "moment";

@Component({
  components: {},
})
 export default class Homepage extends Vue {


  private leavesCount: any = [];

  private dialogDelete = false;

  private dialog = false;

  private menu1 = false;

  private menu2 = false;

  private editedIndex = -1;

  private headers = [
    {
      text: "LeaveType",
      align: "start",
      sortable: false,
      value: "leaveType",
    },

    { text: "Apply Date", value: "applyDate" },
    { text: "From Date", value: "fromDate", sortable: false },
    { text: "Till Date", value: "toDate", sortable: false },
    { text: "Days", value: "days", sortable: false },
    { text: "Reason", value: "reason", sortable: false },
    { text: "Actions", value: "actions", sortable: false },
  ];

  private pendingLeaves = [];

  private leaveApplication = {
    leaveType: "",
    toDate: "",
    fromDate: "",
    reason: "",
    File: "",
    empId: this.empId,
  };

  private defaultLeaveApplication = {
    leaveType: "",
    fromDate: "",
    toDate: "",
    reason: "",
    File: "",
    empId: this.empId,
  }; 

//Apply a new leave
  applyLeave() {
    if (this.editedIndex > -1) {
      let id = this.pendingLeaves[this.editedIndex].id;
      console.log(id, "update leave");
      RequestDataService.updateLeave(id, this.leaveApplication)
        .then((response) => {
          console.log(response.data);
          this.homepage();
          this.close();
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      console.log("new leave");

      RequestDataService.addLeave(this.leaveApplication)
        .then((response) => {
          console.log("new leave");
          console.log(response.data);

          this.homepage();
          this.close();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }

//edit applyed leave
  editItem(item) {
    this.editedIndex = this.pendingLeaves.indexOf(item);
    this.leaveApplication = Object.assign({}, item);
    console.log(this.leaveApplication);

    this.dialog = true;
  }

//close dialogue of leaveform
  close() {
    this.dialog = false;
    this.$nextTick(() => {
      this.leaveApplication = Object.assign({}, this.defaultLeaveApplication);
      this.editedIndex = -1;
    });
  }

//select a leave for delete
  deleteItem(item) {
    this.editedIndex = this.pendingLeaves.indexOf(item);
    console.log(
      this.editedIndex,
      "hellooooooooooooo",
      this.pendingLeaves[this.editedIndex].id
    );
    this.dialogDelete = true;
  }

//delete leave
  deleteItemConfirm() {
    let id = this.pendingLeaves[this.editedIndex].id;

    RequestDataService.deleteLeave(id)

      .then((response) => {
        console.log(response.data);

        this.homepage();
        this.closeDelete();
      })
      .catch((e) => {
        console.log(e);
      });
  }

//close delete dialogue
  closeDelete() {
    this.dialogDelete = false;
    this.editedIndex = -1;
  }

//leave requests count under a reporting officer
  leaveRequestsCount() {
    RequestDataService.getLeaveRequests(this.empId)
      .then((response) => {
        let leaves = response.data.empLeaveRequests;
        this.$store.dispatch("repOfficerLeaves", leaves.length);
      })
      .catch((e) => {
        console.log(e);
      });
  }  

//dateformat
 formatDate(date){
  return moment(date).format('YYYY-MM-DD')
 }

//function for get homepage
  homepage() {
    
    EmployeDataService.getHomepage(this.empId)
      .then((response) => {
        this.leavesCount = response.data.leaveCount;
        this.pendingLeaves = response.data.pendingLeaves;
        this.$store.dispatch("userLeaves", response.data.allLeaves);
        this.$store.dispatch("userProfile", response.data.profile);

        console.log("homepage response");
      })
      .catch((e) => {
        console.log(e);
      });
    

  }

//call homepage() function before page creation
  mounted() {
    this.homepage();
    this.leaveRequestsCount()
    
  }

//get balance Leave when select a leave in dropdown in leave apply form
  get balance() {
    if (this.leaveApplication.leaveType == "Casual Leave")
      return this.leavesCount.casualBalance;
    if (this.leaveApplication.leaveType == "Sick Leave")
      return this.leavesCount.sickBalance;
    if (this.leaveApplication.leaveType == "Loss Of Pay")
      return this.leavesCount.lopBalance;
    if (this.leaveApplication.leaveType == "Earned Leave")
      return this.leavesCount.earnedBalance;
    else return 0;
  }
  
  //get empId from store
  get empId() {
    return this.$store.getters.getEmpId;
  }
}
</script>

<style scoped>
.theme--light.v-input input, .theme--light.v-input textarea {
    padding-left: 34px;
}
</style>