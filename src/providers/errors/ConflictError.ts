import { HttpStatus } from "types/ServerTypes";
import { ApplicationError } from "./ApplicationError";

export class ConflictError extends ApplicationError {
  constructor(message) {
    super(message, HttpStatus.Conflict);

    this.error = ConflictError.name;
  }
}
