import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello, World!");
});



app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  console.log(error);
  let errorMessage = "An unknown error occurred"; 
  if (error instanceof Error) errorMessage = error.message;
  res.status(500).json({ error: errorMessage })
});

export default app;