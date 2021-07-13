type ServerDetailsInput = {
  vmState: string;
  instanceName: string;
};

export class ServerDetails {
  private readonly vmState: string;
  private readonly instanceName: string;

  constructor(params: ServerDetailsInput) {
    this.vmState = params.vmState;
    this.instanceName = params.instanceName;
  }

  public getVmState(): string {
    return this.vmState;
  }

  public getInstanceName(): string {
    return this.instanceName;
  }
}
