import { Message } from '../models/message';
import { Component, OnInit } from '@angular/core';
import { ChatMessage } from '../models/chat_message';
import { Plant } from '../models/plant';
import { WatsonMessagesService } from '../watson/watson-messages.service';
import { WatsonPlantInfoService } from '../watson/watson-plant-info.service';
import { WatsonPersonalityService } from '../watson/watson-personality.service';
import { PlantInfo } from '../models/plant_info';
import { Personality } from '../models/personality';

@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {
  messages: ChatMessage[] = [];
  newMessage = '';
  twitterHandle = '';
  userText = '';
  convoID: number = -1;
  plantInfo : PlantInfo;
  plantResults: Plant[] = [];
  userPersonality: Personality;
  plantPersonality: Personality;

  constructor(private messagesService: WatsonMessagesService, private plantInfoService: WatsonPlantInfoService, private personalityService: WatsonPersonalityService) { }

  ngOnInit(): void {
	this.plantInfo = new PlantInfo('', '', false, false);
	
	//welcome prompt
// 	this.messagesService.getAssistantResponse(new Message("", this.convoID)).subscribe((data) => {
//       this.convoID = data.user;
//       this.messages.push(new ChatMessage(data.messageContent, false));
//     })
	
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

  getTwitterPlant() {

    this.messages = [];
      if (this.twitterHandle.trim() === '') {
        return;
      }
      // Add message to window and clear the user input
      try {
        this.processTwitterRequest(this.twitterHandle);
      } catch (err) {
        console.log(err);
      }
    }

  processTwitterRequest(handle: string) {
    this.personalityService.twitterPersonalityRequest(new Message(handle, this.convoID)).subscribe((plant) => {
       console.log('PLANTS: ', plant);
       // When the plant is found print it to the user
       var test = [];
       test.push(plant);
       this.plantResults = test;
     }, (err) => {
        this.messages.push(new ChatMessage("Looks like they didn't have enough tweets... try a new user!", false));
        this.plantResults = [];
        })
  }

  getTextPlant() {
    this.messages = [];
      if (this.userText.trim() === '') {
        return;
      }
      // Add message to window and clear the user input
      try {
        this.processTextRequest(this.userText);
      } catch (err) {
        console.log(err);
      }
  }

  processTextRequest(text: string) {
    this.personalityService.textPersonalityRequest(new Message(text, this.convoID)).subscribe((plant) => {
        console.log('PLANTS: ', plant);
        // When the plant is found print it to the user
        var test = [];
        test.push(plant);
        this.plantResults = test;
        this.plantPersonality = plant.plantPersonality
        this.userPersonality = plant.userPersonality
        console.log('plant personality: ', this.plantPersonality)
      }, (err) => {
        this.messages.push(new ChatMessage("Looks like an error occurred... try typing more words!", false));
        this.plantResults = [];
        })
  }

  processUserMessage(textStr: string): void {
	  // display user message in chat box
    this.messages.push(new ChatMessage(textStr, true));

    this.messages.push(new ChatMessage('', false, 'https://thumbs.gfycat.com/FittingIndolentAmericansaddlebred-max-14mb.gif'));

	var responseMessage: Message;
	this.messagesService.getAssistantResponse(new Message(textStr, this.convoID)).subscribe((data) => {
	    responseMessage = data;
	    this.messages.pop();
	    var plantResultUser = 0;
        if (responseMessage.user == -2) {
            var button = <HTMLButtonElement> document.getElementById("submitButton");
            var field = <HTMLButtonElement> document.getElementById("inputField");
            button.disabled = true;
            field.disabled = true;
            this.messages.push(new ChatMessage("We found the plant for you! Please look to the right to find possible matches!\nIf you would like to find some new plants, please hit the reset button.", false));
            plantResultUser = this.convoID;
            this.convoID = -1;
        } else {
            this.convoID = responseMessage.user;
            plantResultUser = this.convoID;
            this.sendNextComputerMessage(responseMessage.messageContent);
        }

	    this.plantInfoService.plantInfoRequest(new Message("plantRetrieval", plantResultUser)).subscribe((plants) => {
                        console.log('PLANTS: ', plants);
                        // When the plant is found print it to the user
                        if (plants.length != 0) {
                            this.plantResults = plants;
                        } else {
                            this.resetConversation(this.plantResults);
                            this.messages.push(new ChatMessage("Hmmm, it looks like no plants fit all your criteria. Your most recent results are on the right.", false));
                        }
                    })


	});

  }

  resetConversation(plants: Plant[]) {
    this.plantInfo = new PlantInfo('', '', false, false);
    this.messages = [];
    this.plantResults = [];

    var button = <HTMLButtonElement> document.getElementById("submitButton");
    var field = <HTMLButtonElement> document.getElementById("inputField");
    button.disabled = false;
    field.disabled = false;

    this.twitterHandle = '';
    this.userText = '';

    //welcome prompt
//     this.messagesService.getAssistantResponse(new Message("", -1)).subscribe((data) => {
//       this.convoID = data.user;
//       this.messages.push(new ChatMessage(data.messageContent, false));
//     })
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
    this.messages.push(new ChatMessage("Please look to the right to find possible matches!", false));
    this.plantResults = plants;
  }

}
