export class ErrorResponse extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}
