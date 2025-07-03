import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js"
import companyRoute from "./routes/comapny.route.js"
import jobRoute from "./routes/job.route.js"
import applicationRoute from "./routes/application.route.js"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";

dotenv.config({})

const app = express();



//middleware

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

// const corsOptions = {
//     {} origin:{'http://localhost:5173',
//      'https://jobsy-delta.vercel.app/'}
//     credentials:true}
// }

const corsOptions = {
    origin: function (origin, callback) {
      const allowedOrigins = ['http://localhost:5174', 'https://jobsy-delta.vercel.app','http://localhost:5173',];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  };
  
app.use(cors(corsOptions));



const PORT = process.env.PORT || 3000;

// api's

app.use("/api/v1/user",userRoute)
app.use("/api/v1/company",companyRoute)
app.use("/api/v1/job",jobRoute)
app.use("/api/v1/application",applicationRoute)
app.get("/",(req,res)=>{
    res.send("testing deployed server...")
})

app.listen(PORT,()=>{
    connectDB();
    console.log('testing.........')
    console.log(`Server running at port ${PORT}`)
    
})

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const  logMessage = (message)=> {
    // Define log file path
    const logFilePath = path.join(__dirname, 'app.log');

    // Create a timestamp
    const timestamp = new Date().toISOString();

    // Format log message
    const logEntry = `${timestamp} - ${message}\n`;

    // Append message to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Log message saved.');
        }
    });
}
