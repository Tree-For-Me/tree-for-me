export class Message {
  constructor(messageContent: string, user: string) {
    this.messageContent = messageContent;
    this.user = user;
  }
  
  messageContent: string;
  user: string;

}