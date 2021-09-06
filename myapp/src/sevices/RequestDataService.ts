import http from "../http-common";

class RequestDataService {
  
  addLeave(data: any){
    return http.post("/requests",data) 
  }

  deleteLeave(id: number){
    return http.delete(`/requests/deleteLeaveRequest/${id}`);
     
  }

  updateLeave(id: number,data: any) {
    return http.put(`/requests/updataLeaveRequest/${id}`,data);
  }

 getLeaveRequests(id :any) { 
  return http.get(`/requests/leaveRequests/${id}`) 
 }

 approveLeave(id: number){
  return http.get(`/requests/approveLeaveRequest/${id}`);
   
}

rejectLeave(id:number,data: any){
  return http.put(`/requests/rejectLeaveRequest/${id}`,data);
   
}

getAllRequests() { 
  return http.get(`/requests/allRequests`) 
 }

  }

  


export default new RequestDataService();