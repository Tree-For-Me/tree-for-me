export class Message {
  constructor(messageContent: string, user: number) {
    this.messageContent = messageContent;
    this.user = user;
  }
  
  messageContent: string;
  user: number;

}