export class ChatMessage {
  text: string;
  is_user: boolean;
  imageLink: string;

  constructor(text: string, is_user: boolean = true, imageLink: string = '') {
    this.text = text;
    this.is_user = is_user;
    this.imageLink = imageLink;
  }
}
