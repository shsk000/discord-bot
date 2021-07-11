export class AccessToken {
  private readonly id: string;
  private readonly expires: string;

  constructor(id: string, expires: string) {
    this.id = id;
    this.expires = expires;
  }

  public getId(): string {
    return this.id;
  }

  public getExpires(): string {
    return this.expires;
  }
}
