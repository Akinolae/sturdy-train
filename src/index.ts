import { config} from "dotenv"
import express from "express";
// import services from "./services/index.services"
// import {dbconfig } from "./db/index.db"

config()
const app = express()

// dbconfig("","localhost", "", "thegreatest22", 5432)
app.listen(4000, () => console.log("=== server started ==="))