import express from "express";
import colors from "colors";
import dotenv from "dotenv";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cors from "cors";
import path from "path"; // ********* Adding *************
import { fileURLToPath } from 'url'; // ********* Adding *************

//configure env
dotenv.config();

//databse config
connectDB();

// esmodule fix
const __filename = fileURLToPath(import.meta.url); // ********* Adding *************
const __dirname = path.dirname(__filename); // ********* Adding *************
//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "./client/build"))); // ********* Adding *************

//routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

//rest api
// app.get("/", (req, res) => {
//   res.send("<h1>Welcome to ecommerce app</h1>");
// }); // ********* Comment Adding *************

app.use("*", function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
}) // ********* Adding *************

//PORT
const PORT = process.env.PORT || 8080;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgCyan
      .white
  );
});
