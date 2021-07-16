type Addresses = {
  [key: string]: {
    version: number;
    addr: string;
  }[];
};

type ServerDetailsInput = {
  vmState: string;
  instanceName: string;
  addresses: Addresses;
};

export class ServerDetails {
  private readonly vmState: string;
  private readonly instanceName: string;
  private readonly addresses: Addresses;

  constructor(params: ServerDetailsInput) {
    this.vmState = params.vmState;
    this.instanceName = params.instanceName;
    this.addresses = params.addresses;
  }

  public getVmState(): string {
    return this.vmState;
  }

  public getInstanceName(): string {
    return this.instanceName;
  }

  public getAddresses(): Addresses {
    return this.addresses;
  }

  public getIPv4Address(): string {
    const firstIPv4Address = Object.keys(this.addresses).map((extKey) => {
      return this.addresses[extKey].find((address) => {
        return address.version === 4;
      });
    })[0];

    return firstIPv4Address?.addr ?? "";
  }
}
