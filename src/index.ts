import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { router } from 'shared/routes';
import { ZodError } from 'zod';

const app = express();

app.use(express.json());
app.use(cors());

const PORT = 3333;

app.get('/health', (_, res) => {

    return res.status(200).json({ ok: 'health check ok'});
})

app.use(router);

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT} 🚀`)
})