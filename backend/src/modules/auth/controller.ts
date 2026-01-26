import { Request, Response } from 'express';
import * as service from "./service";

export async function register(req: Request, res: Response) {
    const user = await service.register(req.body);
    res.json(user);
}

export async function login(req: Request, res: Response) {
    const token = await service.login(req.body);

    res.cookie("token", token, {
        httpOnly: true,
    });

    res.json({ success: true });
}