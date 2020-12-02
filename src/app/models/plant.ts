import { Personality } from './personality';

export class Plant {
  constructor(plantName: string, imageLink: string, botName: string, plantPersonality: Personality, userPersonality: Personality) {
    this.plantName = plantName;
    this.imageLink = imageLink;
    this.botName = botName;
    this.plantPersonality = plantPersonality;
    this.userPersonality = userPersonality;
  }
  
  plantName: string;
  imageLink: string;
  botName: string;
  careLink: string;

  plantPersonality: Personality;
  userPersonality: Personality;
}
