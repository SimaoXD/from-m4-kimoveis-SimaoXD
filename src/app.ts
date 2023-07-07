import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { categorieRouter, proprietyRouter, scheduleRouter, sessionRouter, userRouter } from "./routers";
import { handleErros } from "./errors/AppError";

const app = express();

app.use(express.json());

app.use("/login", sessionRouter);
app.use("/users", userRouter);
app.use("/categories", categorieRouter);
app.use("/realEstate", proprietyRouter);
app.use("/schedules", scheduleRouter);

app.use(handleErros);

export default app;
