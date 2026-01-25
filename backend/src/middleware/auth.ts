import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';

/** Request after requireAuth; use in protected route handlers. */
export type AuthenticatedRequest = Request & { userId: string };

export function requireAuth(req: Request, res: Response, next: NextFunction) {
    const { token } = req.cookies;

    if (!token) return res.status(401).json({ error: "Unauthorized"});

    try {
        const payload = jwt.verify(token, JWT_SECRET) as { userId: string };
        (req as AuthenticatedRequest).userId = payload.userId;
        next();
    } catch {
        res.status(401).json({ error: "Unauthorized"});
    }
}