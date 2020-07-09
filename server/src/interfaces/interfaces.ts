import { Request, Response } from "express";

export interface ResReq {
    req: Request;
    res: Response;
    payload?: { userId: string };
}

export interface salthash {
    hash: string;
    salt: string;
}
