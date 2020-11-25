import { Middleware } from "routing-controllers";
import { logger } from "../../utils/logger";

@Middleware({ type: "before" })
export class LoggerMiddleware {
  use(request: any, response: any, next: (err?: any) => any): void {
    const { method, url } = request;
    logger().info("HTTP_REQUEST", { url, method });
    next();
  }
}
