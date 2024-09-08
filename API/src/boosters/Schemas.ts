import { Request, Response } from "express"

export type Executor<T extends any[], R> = (...args: T) => R;
export type AvailableMethods = "GET" | "POST" | "DELETE" | "HEAD"

export interface ParamOptions {
    name: string
    required: boolean
    getFrom?: "QUERY" | "BODY"
}

export interface Route {
    path: string
    method: AvailableMethods
    params?: ParamOptions[]
    handler: Executor<[Request, Response], Promise<unknown> | unknown>
}

export interface ResponseData<T = unknown> {
    status: number
    data: T
    error: boolean
}