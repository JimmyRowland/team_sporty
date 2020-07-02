import { Request, Response } from "express";

export interface ResReq {
    req: Request;
    res: Response;
}

export interface salthash {
    hash: string;
    salt: string;
}
