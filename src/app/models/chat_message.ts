export class ChatMessage {
  text: string;
  is_user: boolean;

  constructor(text: string, is_user: boolean = true) {
    this.text = text;
    this.is_user = is_user;
  }
}
