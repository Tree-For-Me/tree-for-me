import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat_message';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';

  computerMessages: string[];
  constructor() { }

  ngOnInit(): void {
    var initial_text = "Hello, this is Tree for Me.";
    var msg: ChatMessage = {text: initial_text, is_user: false};
    this.messages.push(msg);

    this.computerMessages = ["Have you owned a plant before?", "How much light is in your room?"];
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }

    try {
      this.addMessage(this.newMessage);
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }

  addMessage(textStr: string): void {
    var msg: ChatMessage = {text: textStr, is_user: true};
    this.messages.push(msg);

    // Add computer message back, take string from beginning of array
    if (this.computerMessages.length > 0) {
      var c_msg: ChatMessage = {text: this.computerMessages.shift(), is_user: false};
      this.messages.push(c_msg);
    }
  }

}
