export class ImageItem {
  private readonly link: string;

  constructor(link: string) {
    this.link = link;
  }

  getLink(): string {
    return this.link;
  }
}
