import { Message } from '../models/message';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat_message';
import { Plant } from '../models/plant';
import { WatsonMessagesService } from '../watson/watson-messages.service';
import { WatsonPlantInfoService } from '../watson/watson-plant-info.service';
import { PlantInfo } from '../models/plant_info';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';
  convoID: number = -1;
  plantInfo : PlantInfo;
  plantResults: Plant[] = [];
  
  constructor(private messagesService: WatsonMessagesService, private plantInfoService: WatsonPlantInfoService) { }

  ngOnInit(): void {
	this.plantInfo = new PlantInfo('', '', false, false);
	
	//welcome prompt
	this.messagesService.getAssistantResponse(new Message("", this.convoID)).subscribe((data) => {
      this.convoID = data.user;
      this.messages.push(new ChatMessage(data.messageContent, false));
    })
	
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
	  // display user message in chat box
    this.messages.push(new ChatMessage(textStr, true));

    this.messages.push(new ChatMessage('', false, 'https://thumbs.gfycat.com/FittingIndolentAmericansaddlebred-max-14mb.gif'));

	var responseMessage: Message;
	this.messagesService.getAssistantResponse(new Message(textStr, this.convoID)).subscribe((data) => {
	    responseMessage = data;
	    this.plantInfoService.plantInfoRequest(new Message("plantRetrieval", this.convoID)).subscribe((plants) => {
                        console.log('PLANTS: ', plants);
                        // When the plant is found print it to the user
                        if (plants.length != 0) {
                            this.plantResults = plants;
                        } else {
                            this.resetConversation();
                            this.messages.push(new ChatMessage("Hmmm, it looks like no plants fit all your criteria. Click the button on the right to start over.", false));
                        }
                    })

        this.messages.pop();
	    if (responseMessage.user == -2) {
            this.messages.push(new ChatMessage("We found the plant for you! Please look to the right to find possible matches!", false));
	        this.convoID = -1;
	    } else {
            this.convoID = responseMessage.user;
            this.sendNextComputerMessage(responseMessage.messageContent);
	    }


	});

  }

  resetConversation() {
    this.plantInfo = new PlantInfo('', '', false, false);
    this.messages = [];
    this.plantResults = [];

    //welcome prompt
    this.messagesService.getAssistantResponse(new Message("", -1)).subscribe((data) => {
      this.convoID = data.user;
      this.messages.push(new ChatMessage(data.messageContent, false));
    })
  }

  private sendNextComputerMessage(computerResponse: string): void {

    this.messages.push(new ChatMessage(computerResponse, false));

    var div = document.getElementById("messageBox");
    div.scrollTop = div.scrollHeight;
  }

  makePlantInfoRequest() {
    this.plantInfoService.plantInfoRequest(new Message("plantRetrieval", this.convoID)).subscribe((plants) => {
      console.log('PLANTS: ', plants);
      // When the plant is found print it to the user
      this.showPlantToUser(plants);
    })
  }

  showPlantToUser(plants: Plant[]) {
    this.messages.push(new ChatMessage("We found the plant for you! Please look below to find possible matches!", false));
    this.plantResults = plants;
  }
}
