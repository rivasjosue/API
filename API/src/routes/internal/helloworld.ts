import { Schemas } from "../../main";

export const Route: Schemas.Route = {
    path: "/helloworld",
    method: "GET",
    async handler(req, res) {
        res.status(200).send("Hello world!")
    }
}