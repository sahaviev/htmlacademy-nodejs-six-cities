export class CreateCityDto {
  public name: string;
  public location: {
    latitude: number;
    longitude: number;
  };
}
