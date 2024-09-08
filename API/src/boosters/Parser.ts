import { Request, Response, NextFunction } from "express";
import { Essence } from "../main";

export function MiddlewareParserFunction(req: Request, res: Response, next: NextFunction) {
    try {
        const route = Essence.getRouteData(req.path);
        
        if (!route) {
            return res.status(404).json(Essence.Write(404, "Unavailable route."));
        }

        if (!route.params.length) {
            return next();
        }

        for(const param of route.params) {
            const source = (param.getFrom?.toLowerCase() || "query") as "query"
            const possibleValue = req[source]?.[param.name];

            if (!possibleValue && param.required) return res.status(400).json(Essence.Write(400, `Parámetro ${source.toUpperCase()} requerido faltante: ${param.name}`));
        }

        next();
    } catch (error) {
        console.error("Middleware error:", error);
        res.status(500).json(Essence.Write(500, "Internal error"));
    }
}