import { Request, Response, NextFunction } from "express";
import { getConnection, getRepository } from "typeorm";
import { Employes } from "../entity/employes";
import { Department } from "../entity/department";
import { LeaveRequest } from "../entity/leaverequest";
import * as moment from "moment";


export class RequestController {

  //add leaverequest

  static addLeave = async (req: Request, res: Response, next: NextFunction) => {
    const empId = req.body.empId;
    console.log('hello add l',req.body)
    if (empId) {

      const { leaveType, fromDate, toDate,reason,file} = req.body;
      let today =new Date();
      var date1 = new Date(fromDate), date2 = new Date(toDate);
     var Dif = date2.getTime() - date1.getTime(); //  calculate the time difference of two dates
     var Daysdiff = Dif / (1000 * 3600 * 24); //  calculate the no. of days between two dates
   
      console.log('output is', today, Daysdiff)


      await getConnection()
        .createQueryBuilder()
        .insert()
        .into(LeaveRequest)
        .values([
          { employe:empId, leaveType: leaveType, fromDate: fromDate, toDate: toDate, reason: reason, file: file, applyDate: today, days: Daysdiff },
        ])
        .execute();
    }

    res.send('sucessfuly added');                                 
  }


  //pending requests of employess under a reporting Officer   
  static pendingLeave = async (req: Request, res: Response, next: NextFunction) => {

    var empId = req.params.id;
  

    
      const pending = await getConnection()
        .createQueryBuilder('LeaveRequest', 'lr')
        .innerJoinAndSelect('lr.employe', 'e')
        .leftJoinAndSelect('e.department', 'd')
        .where("e.repOfficer = :id", { id: empId })
        .andWhere("lr.status = :status", { status: "Pending" })
        .orderBy('lr.applyDate', 'DESC')
        .getMany()
      console.log('')
      res.send({ empLeaveRequests: pending});                                                                     
    
  }

 //Leave Approved by reporting officer
  static approval = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;

    await getConnection()
      .createQueryBuilder()
      .update(LeaveRequest)
      .set({ status: "Approved" })
      .where("id = :id", { id: id })
      .execute();
                                         
  res.send("LeaveRequest Approved Sucessfully")



  }

//leave Rejected by Reporting officer
  static rejection = async (req: Request, res: Response, next: NextFunction) => {

    const id = req.params.id;
    const reason = req.body.rejectReason;  
    console.log(id,reason,"tiiiiiiiiiiiiiiiiiiiiiiii")                   

    await getConnection()
      .createQueryBuilder()
      .update(LeaveRequest)
      .set({ status: "Rejected", rejectReason: reason })                               
      .where("id = :id", { id: id })               
      .execute();
    res.send('Request Rejected Sucessfully')





  }


  
  


 //All  employes Leave Requests
  static allRequests = async (req: Request, res: Response, next: NextFunction) => {

   

      const allLeaves = await getConnection()
        .createQueryBuilder('LeaveRequest', 'lr')
        .innerJoinAndSelect('lr.employe', 'e')
        .leftJoinAndSelect('e.department', 'd')
        .orderBy('lr.applyDate', 'DESC')
        .getMany()
     
      
      res.send({ allLeaves: allLeaves });                         
  

  }

  
  //delete Leave Request
  static deleteLeaveRequest = async (req: Request, res: Response, next: NextFunction) => {
    console.log("delete function ")          
    const id = req.params.id;
    console.log(id)

    await getConnection()
    .createQueryBuilder()
    .delete()
    .from(LeaveRequest)
    .where("id = :id", { id: id })
    .execute();

    res.send('sucessfully deleted')         


  }
//update Leave
  static updateLeaveRequest = async (req: Request, res: Response, next: NextFunction) => {
    console.log('update function is calling')  
    console.log(req.body)  
    let id = req.params.id;
   
    const { leaveType, fromDate, toDate,reason,file }= req.body;
    
    let today =new Date();
    let date1 = new Date(fromDate), date2 = new Date(toDate);
    let Dif = date2.getTime() - date1.getTime(); //  calculate the time difference of two dates
    let Daysdiff = Dif / (1000 * 3600 * 24); //  calculate the no. of days between two dates
   
    await getConnection()
    .createQueryBuilder()
    .update(LeaveRequest)
    .set({ leaveType: leaveType, fromDate: fromDate, toDate: toDate,  reason: reason, days: Daysdiff,applyDate: today })         
    .where("id = :id", { id: id })
    .execute();    
    

    res.send('Sucessfully updated')         


  }


}






