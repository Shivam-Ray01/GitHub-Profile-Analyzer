import express from "express";
import cors from "cors";  //cross origin resource sharing//

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req , res)=>{
    res.json({
   message : "GitHub Profile Analyzer",
   version : "1.0.0",
   endpoints : {
      
   }
   });
});