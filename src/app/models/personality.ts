export class Personality {

  constructor(name: string, openness: number, conscientiousness: number, 
    extraversion: number, agreeableness: number, neuroticism: number) {
    this.name = name;
    this.openness = openness;
    this.conscientiousness = conscientiousness;
    this.extraversion = extraversion;
    this.agreeableness = agreeableness;
    this.neuroticism = neuroticism;
  }

  name: string;
  openness: number;
  conscientiousness: number;
  extraversion: number;
  agreeableness: number;
  neuroticism: number;
}