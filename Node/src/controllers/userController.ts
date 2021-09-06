import { Request, Response, NextFunction } from "express";
import { getRepository, getConnection } from "typeorm";
import { Employes } from "../entity/employes";
import { LeaveRequest } from "../entity/leaverequest";
import { Department } from "../entity/department";

export class UserController {


    //get login page
    static getLogin = async (req: Request, res: Response, next: NextFunction) => {
        res.render('pages/login')
    }



    //login authentication
    static loginAuthenticate = async (req: Request, res: Response, next: NextFunction) => {

        const userRepository = getRepository(Employes)
        const { username, password } = req.body;
        const userValidate = await userRepository.findOne({
            email: username, password: password
        });
        // console.log('server function is woel',req.body)
       //  console.log(username,password,userValidate)

        if (userValidate) {
            
        let empId = userValidate.id;
        let userType = userValidate.usertype;
              req.session.empId=empId;


      //  console.log(empId)
        res.send({ empId:empId,userType:userType});

            

        }

        else {
            res.send('failed')                     
                          
        }

    }



    //get homepage
    static getHomepage = async (req: Request, res: Response, next: NextFunction) => {                   

        
       
        let empId = req.params.id ;
       // var userType = req.session.userType;
      
        var casualUsed = 0, sickUsed = 0, earnedUsed = 0, lopUsed = 0;
        var casualAvailed = 0, sickAvailed = 0, earnedAvailed = 0, lopAvailed = 0;
        var totalCasual = 20, totalSick = 10, totalEarned = 5, totalLop = 6;
        console.log("homepage is working")
       
      
        if (empId) {

            const employeDetails = await getRepository(Employes) //employes details
                .createQueryBuilder("employe")
                .where("employe.id = :id", { id: empId })
                .getOne();


            const allLeaves = await getRepository(LeaveRequest) //Leave history
                .createQueryBuilder("requests")
                .where("requests.employe = :id", { id: empId })
                .orderBy('requests.id', 'DESC')
                .getMany();


       /*     const pendingCounts = await getConnection() // for count badge of reporting officer page
                .createQueryBuilder('LeaveRequest', 'lr')
                .innerJoinAndSelect('lr.employe', 'e')
                .leftJoinAndSelect('e.department', 'd')
                .where("e.repOfficer = :id", { id: empId })
                .andWhere("lr.status = :status", { status: "Pending" })
                .orderBy('lr.applyDate', 'DESC')
                .getMany()*/
           
                const pendingLeaves = await getRepository(LeaveRequest) //Leave history
                .createQueryBuilder("requests")
                .where("requests.employe = :id", { id: empId })
                .andWhere("requests.status =:status",{ status: "Pending"})
                .orderBy('requests.id', 'DESC')
                .getMany();
               
              //  console.log(pendingLeaves,"new")
                let id=req.session.empId;
              //  console.log(id,"session id")            


            for (var j = 0; j < allLeaves.length; j++) {


                //counting no of Pending Leaves
                if (allLeaves[j].status != "Rejected" && allLeaves[j].leaveType == "Casual Leave") casualUsed += 1;

                if (allLeaves[j].status != "Rejected" && allLeaves[j].leaveType == "Sick Leave") sickUsed += 1;

                if (allLeaves[j].status != "Rejected" && allLeaves[j].leaveType == "Earned Leave") earnedUsed += 1;

                if (allLeaves[j].status != "Rejected" && allLeaves[j].leaveType == "Loss Of Pay") lopUsed += 1;


             /*   //counting availed leaves 
                if (allLeaves[j].status == "Approved" && allLeaves[j].leaveType == "Casual Leave") casualAvailed += 1;     //count of availed casualleave

                if (allLeaves[j].status == "Approved" && allLeaves[j].leaveType == "Sick Leave") sickAvailed += 1; //count of availed sickleave 

                if (allLeaves[j].status == "Approved" && allLeaves[j].leaveType == "Earned leave") earnedAvailed += 1;

                if (allLeaves[j].status == "Approved" && allLeaves[j].leaveType == "Loss Of Pay") lopAvailed += 1;*/

            }


            //calculating balance leave   
            var casualBalance = totalCasual - casualUsed;                                  
            var sickBalance = totalSick - sickUsed;
            var earnedBalance = totalEarned - earnedUsed;
            var lopBalance = totalLop - lopUsed;

        let leavesCount={

            totalCasual:totalCasual,
            totalSick:totalSick,
            totalEarned:totalEarned,
            totalLop:totalLop,

             casualBalance :casualBalance,
             sickBalance : sickBalance,
             earnedBalance:earnedBalance,
             lopBalance:lopBalance,      

         }


    res.send({leaveCount:leavesCount, pendingLeaves:pendingLeaves, allLeaves:allLeaves, profile:employeDetails})
        }                             
    
    }



    //logout
    static logOut = async (req: Request, res: Response, next: NextFunction) => {

        req.session.destroy();
        res.redirect('/')
    }


}








