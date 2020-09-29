export class PlantInfo {
  constructor(flowerType: string, light: string, flowers: boolean, humidity: boolean) {
    this.flowerType = flowerType;
    this.light = light;
    this.flowers = flowers;
    this.humidity = humidity;
  }
  
  flowerType: string;
  light: string;
  flowers: boolean;
  humidity: boolean;

}
