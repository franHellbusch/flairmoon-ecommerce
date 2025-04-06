import { NextFunction, Request, Response } from "express";
import config from "../../../shared/config/config";

/**
 * Controller for health check endpoints.
 */
class HealthController {
  async getHealthMessage(_req: Request, res: Response, _next: NextFunction) {
    res.status(200).json({
      success: true,
      environment: config.globals.ENV,
      health: "up",
    });
  }
}

export default HealthController;
