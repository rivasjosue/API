import { Schemas, Essence } from "../../main";

export const Route: Schemas.Route = {
    path: "/info",
    method: "GET",
    async handler(req, res) {
        const pkg = require("../../../package.json")
        res.status(200).json(Essence.Write(200, {
            uptime: Date.now() - Essence.startedAt,
            version: pkg.version,
            typescriptVersion: pkg.devDependencies.typescript.version,
            expressVersion: pkg.dependencies.express.version,
            nodeVersion: process.version,
            routes: Essence.getRoutesNumber
        }))
    }
}