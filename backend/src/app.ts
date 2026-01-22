import express, {Response} from "express";
import cors from "cors";
import helmet from "helmet";


const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.get('/health', (_, res: Response) => {
    res.json({ status: "ok" });
})

export default app;