import { customErrorMapping } from "./customErrorMapping";
import { ErrorType } from "./ErrorType";
export class HttpException extends Error {
  status: number;
  message: string;
  type: string;
  path: string | undefined;

  constructor({ status, message, type, path }: { status: number; message?: string; type?: ErrorType; path?: string }) {
    super();

    this.status = status;
    this.message = message || (type ? customErrorMapping[type] : "");
    this.type = type || "";
    this.path = path;
  }
}
