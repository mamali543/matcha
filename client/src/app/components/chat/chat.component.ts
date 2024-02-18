import { Component, OnInit } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Discussion } from 'src/app/domain/discussion.model';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  messages = ['Hello, how are you?', 'I\'m fine, thanks!', 'What are you doing?', 'Working on Matcha!'];

  discussions!: Discussion[];

  constructor(private chatService: ChatService) {

  }

  ngOnInit(): void {
      this.discussions = this.chatService.getDiscussions();
  }
}
