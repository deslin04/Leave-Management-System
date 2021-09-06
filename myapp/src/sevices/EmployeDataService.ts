import http from "../http-common";


class EmployeDataService {
 $store: any

  

  getHomepage(id: any) {
  
    return http.get(`/homepage/${id}`) 
    }
  

  loginAuth(data:any){
    return http.post(`/`,data) 
  }

  }

  


export default new EmployeDataService();