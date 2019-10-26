export class Session {
  public success: boolean;
  public token: string;

  constructor(args?: {}) {
    Object.assign(this, args);
  }
}
