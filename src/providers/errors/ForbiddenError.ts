import { HttpStatus } from "types/ServerTypes";
import { ApplicationError } from "./ApplicationError";

export class ForbiddenError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatus.Forbidden);

    this.error = ForbiddenError.name;
  }
}
