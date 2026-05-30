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
      analyze:        "POST /api/profiles/analyze/:username",
      getAllProfiles:  "GET  /api/profiles",
      getProfile:     "GET  /api/profiles/:username",
      deleteProfile:  "DELETE /api/profiles/:username",
      compare:        "GET  /api/profiles/compare?users=user1,user2",  
   }
   });
});