import { Request } from "express";
import { AuthUser } from "./auth-user";

export class AuthRequest extends Request {
    user: AuthUser;
}