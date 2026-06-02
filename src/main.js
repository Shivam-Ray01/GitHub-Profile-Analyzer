import express from "express";
import cors from "cors";  //cross origin resource sharing//
import profileRoutes from "./routes/profileRoutes.js";
import { testConnection } from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();

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

app.use("/api/profiles", profileRoutes);

app.use((req, res)=>{
   res.status(404).json({success: false, message: "Routes Not Found"})
});

app.use((err, req, res, next)=>{
   console.error("unhandled error:" , err.message);
   res.status(500).json({success: false, message:'Internal server error'})
});

const PORT = process.env.PORT || 3000;

testConnection().then(()=>{
    app.listen(PORT, () => {
       console.log(`Server running on http://localhost:${PORT}`);
    });
});
