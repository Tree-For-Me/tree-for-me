export class Plant {
  constructor(plantName: string, imageLink: string, botName: string) {
    this.plantName = plantName;
    this.imageLink = imageLink;
    this.botName = botName
  }
  
  plantName: string;
  imageLink: string;
  botName: string;
  careLink: string;
}
