import { Router } from "express";
import { UserController } from '../controllers/userController'
const userRouter = Router();


userRouter.get('/', UserController.getLogin);

userRouter.post('/', UserController.loginAuthenticate);


userRouter.get('/HomePage/:id', UserController.getHomepage);


    


                                        



export default userRouter;


