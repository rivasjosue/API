import { translate } from "@vitalets/google-translate-api";
import { Schemas, Essence } from "../../main";

// text*, source*, target*

export const Route: Schemas.Route = {
    path: "/h/translator",
    method: "GET",
    async handler(req, res) {
        if(!req.query.text || !req.query.source || !req.query.target) return res.status(400).json(Essence.Write(400, "Bad request"))
        const data = await translate(req.query.text!.toString(), { from: req.query.source!.toString(), to: req.query.target!.toString()}).catch(()=>null)
        if(!data) return res.status(500).json(Essence.Write(500, "Unknown error"))
        res.json(Essence.Write(200, {
            translated: data.text,
            source: data.raw.src,
            target: req.query.target
        }))
    }
}