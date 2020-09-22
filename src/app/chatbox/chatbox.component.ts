import { Component, OnInit } from '@angular/core';


interface Message {
  text: string;
  user: string;
}


@Component({
  selector: 'app-chatbox',
  templateUrl: './chatbox.component.html',
  styleUrls: ['./chatbox.component.css']
})
export class ChatboxComponent implements OnInit {

    messages: Array<Message>;

    constructor() {
        this.messages = []
    }

  ngOnInit(): void {
  }

}