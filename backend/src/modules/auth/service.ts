import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../lib/prisma";
import { User } from "@prisma/client";


const JWT_SECRET = process.env.JWT_SECRET || 'devsecret';


type RegisterData = {
    email: string;
    password: string;
    name: string;
}

export async function register(data: RegisterData): Promise<User> {
    const passwordHash = await bcrypt.hash(data.password, 10);
    return prisma.user.create({
        data: {
            email: data.email,
            password: passwordHash,
            name: data.name
        }
    })
}

type LoginData = {
    email: string;
    password: string;
}

export async function login(data: LoginData): Promise<string> {
    const { email, password } = data;

    const user = await prisma.user.findUnique({ where: { email }});
    if (!user) throw new Error("Invalid Credentials");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid Credentials");

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
        expiresIn: '7d',
    })

    return token;
}