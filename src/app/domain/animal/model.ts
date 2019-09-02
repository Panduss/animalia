class Model {
  private readonly commonName: string;
  private readonly scientificName: string;
  private readonly description?: string;
  private readonly image?: string;

  constructor(
    commonName: string,
    scientificName: string,
    description?: string,
    image?: string,
) {
    this.commonName = commonName;
    this.scientificName = scientificName;
    this.description = description;
    this.image = image;
  }

  public getCommonName(): string {
    return this.commonName;
  }

  public getScientificName(): string {
    return this.scientificName;
  }

  public getDescription(): string|undefined {
    return this.description;
  }

  public getImage(): string|undefined {
    return this.image;
  }
}
export { Model as Animal };
