import { Request, Response } from "express";
import { Team } from "../entities/Team";
import { User } from "../entities/User";

export interface ResReq {
    req: Request;
    res: Response;
    payload: { _id?: string; team?: Team; member?: User; coach?: User };
}

export interface salthash {
    hash: string;
    salt: string;
}

export interface teamUserIdObject {
    team: string;
    user: string;
}

export interface postUserIdObject {
    post: string;
    user: string;
}
