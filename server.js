import path from "path";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { fileURLToPath } from "url";
import indexRouter from "./routes/indexRouter.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const db = mongoose.connection;

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use("/", indexRouter);

dotenv.config();
mongoose.connect(process.env.DATABASE_URL);

db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to mongodb"));

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
