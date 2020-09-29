import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat_message';
import { WatsonMessagesService } from '../watson/watson-messages.service';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';

  computerMessages: string[];
  
  constructor(private messagesService: WatsonMessagesService) { }

  ngOnInit(): void {
    var initial_text = "Hello, this is Tree for Me.";
    this.messages.push(new ChatMessage(initial_text, false));

    this.computerMessages = ["Have you owned a plant before?", "How much light is in your room?"];
  }

  sendMessage() {
    if (this.newMessage.trim() === '') {
      return;
    }
    // Add message to window and clear the user input
    try {
      this.processUserMessage(this.newMessage);
      this.newMessage = '';
    } catch (err) {
      console.log(err);
    }
  }

  processUserMessage(textStr: string): void {
    this.messages.push(new ChatMessage(textStr, true));
    this.sendNextComputerMessage()

  }

  private sendNextComputerMessage(): void {
    // Add computer message back, take string from beginning of array
    if (this.computerMessages.length > 0) {
      var nextComputerText = this.computerMessages.shift();
      this.messages.push(new ChatMessage(nextComputerText, false));
    }

    var msg;
    this.messagesService.getMessage().subscribe((data) => {
      console.log(data);
      msg = data;
    })

  }

}
