import { MiddlewareParserFunction } from "./boosters/Parser";
import { Essence as E } from "./boosters/Essence";
import "dotenv/config";
import * as Schemas from "./boosters/Schemas";
import express from "express";
import cors from "cors";

const server = express()

server.use(cors())
server.use(MiddlewareParserFunction)

const Essence = new E(server)

Essence.load("./dist/routes").then(() => console.log("Routes loaded."))

// Listen
server.listen(process.env.PORT || 3000, () => {
    Essence.capture()
    console.log("API Connected.")
})

export { Schemas, Essence }