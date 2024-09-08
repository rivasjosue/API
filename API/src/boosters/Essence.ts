import { Express } from "express";
import { join } from "path";
import { lstatSync, readdirSync } from "node:fs";
import * as Sch from "./Schemas";

type AvailableMethods = "get" | "post"

interface RouteInCache {
    path: string
    params: Sch.ParamOptions[]
    method: Sch.AvailableMethods
}

export class Essence {
    public startedAt = 0
    private readonly _instance: Express;
    private readonly _cache = new Map<string, RouteInCache>()
    constructor(instance: Express) {
        this._instance = instance
    }

    capture() {
        this.startedAt = Date.now()
    }

    async load(dir: string) {
        for(const file of readdirSync(join(process.cwd(), dir))) {
            if(file.includes(".d.ts")) continue;
            if(!lstatSync(join(process.cwd(), dir, file)).isDirectory()) {
                const data: Sch.Route = require(join(process.cwd(), dir, file))?.Route
                if(!data) continue;
                if(Array.isArray(data)) for(const r of data) this.inject(r)
                else this.inject(data)
            } else await this.load(join(dir, file)) /* recursive **/
        }
    }

    inject(data: Sch.Route) {
        this._cache.set(data.path, { path: data.path, params: data.params || [], method: data.method })
        this._instance[data.method!.toLowerCase() as AvailableMethods](data.path, data.handler)
    }

    getRouteData(path: string) {
        return this._cache.get(path)
    }

    get getRoutesNumber() {
        return this._cache.size
    }

    Write(status: number, metadata: unknown): Sch.ResponseData {
        return {
            status: status,
            data: metadata,
            error: status > 200 ? true: false
        }
    }


}