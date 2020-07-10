import { Request, Response } from "express";

export interface ResReq {
    req: Request;
    res: Response;
    payload?: { _id?: string };
}

export interface salthash {
    hash: string;
    salt: string;
}
