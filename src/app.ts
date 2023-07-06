import "reflect-metadata";
import "express-async-errors";
import express from "express";
import { categorieRouter, proprietyRouter, scheduleRouter, sessionRouter, userRouter } from "./routers";

const app = express();

app.use(express.json());

app.use("/login", sessionRouter);
app.use("/users", userRouter);
app.use("/categories", categorieRouter);
app.use("/realEstate", proprietyRouter);
app.use("/schedules", scheduleRouter);

export default app;
