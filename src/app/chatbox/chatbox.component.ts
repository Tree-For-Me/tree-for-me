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
  convoStep = 0;
  plantInfo : PlantInfo;
  
  constructor(private messagesService: WatsonMessagesService, private plantInfoService: WatsonPlantInfoService) { }

  ngOnInit(): void {
	this.convoStep = 0;
	this.plantInfo = new PlantInfo('', '', false, false);
	
	//welcome prompt
	this.messagesService.getAssistantResponse(new Message("hello", "user")).subscribe((data) => {
      this.messages.push(new ChatMessage(data.messageContent, false));
    })
	
	// plant type
	this.messagesService.getPlantTypeMessage().subscribe((data) => {
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
	
    // build plant info object with user responses
    if (this.convoStep == 0) {
        this.plantInfo.flowerType = textStr;
    }
    else if (this.convoStep == 1) {
      this.plantInfo.light = textStr;
    }
    else if (this.convoStep == 2) {
        this.plantInfo.humidity = textStr === 'humid';
    }
    else if (this.convoStep == 3) {
      this.plantInfo.flowers = textStr === 'flowers';
      this.makePlantInfoRequest(this.plantInfo);
    }
	
    this.sendNextComputerMessage()

  }

  private sendNextComputerMessage(): void {
    if (this.convoStep == 0) {
	  this.messagesService.getSunMessage().subscribe((data) => {
        this.messages.push(new ChatMessage(data.messageContent, false));
      })
    }
    else if (this.convoStep == 1) {
      this.messagesService.getHumidityMessage().subscribe((data) => {
          this.messages.push(new ChatMessage(data.messageContent, false));
        })
    }
    else if (this.convoStep == 2) {
      this.messagesService.getFlowersMessage().subscribe((data) => {
          this.messages.push(new ChatMessage(data.messageContent, false));
        })
      }

    this.convoStep++;

  }

  makePlantInfoRequest(plant: PlantInfo) {
    this.plantInfoService.plantInfoRequest(plant).subscribe((name) => {
      console.log('PLANT: ', name);
      // When the plant is found print it to the user
      this.showPlantToUser(name);
    })
  }

  showPlantToUser(plant: Plant) {
    this.messages.push(new ChatMessage("We found the plant for you!", false));
    this.messages.push(new ChatMessage(plant.plantName, false));
  }
}
