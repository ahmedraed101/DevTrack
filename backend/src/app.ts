import express, {Response} from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRouter from "./modules/auth/routes"
import dotenv from "dotenv"

dotenv.config();
console.log(process.env)
const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);

app.get('/health', (_, res: Response) => {
    res.json({ status: "ok" });
})

export default app;