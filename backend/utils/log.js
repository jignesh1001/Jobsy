
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url";
import Log from "../models/log.model.js"


const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export const  logMessage = async (message)=> {
    // Define log file path
    const logFilePath = path.join(__dirname, 'app.log');

    // Create a timestamp
    const timestamp = new Date().toISOString();

    // Format log message
    const logEntry = `${timestamp} - ${message}\n`;

    await  Log.create({
      processed_timestamp:new Date(),
      status:"success",
      message: logEntry
    })

    // Append message to the log file
    fs.appendFile(logFilePath, logEntry, (err) => {
        if (err) {
            console.error('Error writing to log file:', err);
        } else {
            console.log('Log message saved.');
        }
    });

}