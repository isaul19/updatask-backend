import { Request, Response, NextFunction, Router } from "express";
import { handleError } from "@errors/handle.error";

export type Controller = (req: Request, res: Response, next: NextFunction) => Promise<void>;

export const globalHandlerError = (controller: Controller) => {
  return (req: Request, res: Response, next: NextFunction) => {
    controller(req, res, next).catch((err) => handleError(res, err));
  };
};

export const wrapGlobalHandlerError = (router: Router) => {
  const methods = ["get", "post", "put", "delete", "patch"] as const;

  methods.forEach((method) => {
    const originalMethod = (router as any)[method];
    (router as any)[method] = (path: string, ...handlers: Controller[]) => {
      const wrappedHandlers = handlers.map((handler) => globalHandlerError(handler));
      return originalMethod.call(router, path, ...wrappedHandlers);
    };
  });
};
