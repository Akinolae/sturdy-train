import express from "express";
import services from "./services/index.services"

const newService = new services()

const app = express()



function greet (name: string):string {
  return name
}

app.listen(4000, () => console.log(newService.getUser("Akinola")))
// console.log(greet("Akinola"))