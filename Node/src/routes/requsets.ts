import { Router } from "express";
import { RequestController } from '../controllers/requestController'
const requestRouter = Router();



requestRouter.post('/', RequestController.addLeave);

requestRouter.delete('/deleteLeaveRequest/:id',RequestController.deleteLeaveRequest); 

requestRouter.put( '/updataLeaveRequest/:id',RequestController.updateLeaveRequest)                     

requestRouter.get('/leaveRequests/:id', RequestController.pendingLeave);

requestRouter.get('/approveLeaveRequest/:id', RequestController.approval);

requestRouter.put('/rejectLeaveRequest/:id', RequestController.rejection); 

requestRouter.get('/allRequests', RequestController.allRequests);                                           

//requestRouter.post('/leaveDetails', RequestController.dateWiseAllRequests);

//requestRouter.get('/leaveDetails/:id', RequestController.departmentWiseRequests);

//requestRouter.post('/leaveDetails/:id', RequestController.datewiseDepartment);


export default requestRouter;