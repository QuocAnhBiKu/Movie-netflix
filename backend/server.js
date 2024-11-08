import express from "express";
import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import { ENV_VARS } from "./config/envVars.js";
import { connectDB } from "./config/db.js";

const app = express();
const PORT = ENV_VARS.PORT

app.use(express.json());// will allow us to parse req.body

app.use("/api/v1/auth",authRoutes);
app.use("/api/v1/movie",movieRoutes);


app.listen(PORT,()=>{
    console.log("Sever started at http://localhost:5000");
    connectDB();
})


