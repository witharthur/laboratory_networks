import type { Request, Response } from "express";

let cachedApp: ((req: Request, res: Response) => void) | undefined;

export default async function handler(req: Request, res: Response) {
  if (!cachedApp) {
    const module = await import("../backend/src/app.js");
    cachedApp = module.app;
  }

  return cachedApp(req, res);
}
