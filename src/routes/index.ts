import Router , { Request , Response } from 'express';
import taskSchema from '../models/task'
const router = Router();

router.get('/index', (req: Request, res: Response) =>{
    res.json({ message : "Hello world"});
});

router.post('/create', async (req: Request, res: Response)=>{
    let { title , description } = req.body;
    try{
        
        let task = new taskSchema({ title , description });
        await task.save();
        res.status(200).json({ task })
    }catch(e){
        console.log(e)
        res.status(400).json({ message : 'could not try again '});
    }
})

router.get('/list', async (req: Request, res: Response)=>{
    
      let allTask = await taskSchema.find();
      try{
          res.status(200).json(allTask)
      }catch(e){
          res.status(400).json({ message : 'there was an internal error'})
          console.log(e)
      }
})

router.delete('/delete/:id', async (req:Request, res:Response)=>{
   const { id } = req.params;
   try{
       await taskSchema.findByIdAndDelete(id);
       res.status(200).json({ message : "task deleted successfully "})
   }catch(e){
       console.log(e)
       res.status(400).json({ message:" try again "})
   }
})

export default router;