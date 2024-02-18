import { Injectable, OnInit } from '@angular/core';
import { Discussion } from '../domain/discussion.model';
import { User } from '../domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class ChatService implements OnInit{

  private discussions: Discussion[] = [new Discussion(new User(1, "yayba", "24", "1000m", [ '/assets/lkherr.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), ["sahbi hanyaaa", "hanyaaa", "HAHAHAHAHA", "HHHHHHHHH"]), new Discussion(new User(1, "yayba", "24", "1000m", [ '/assets/lkherr.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), ["sahbi hanyaaa", "hanyaaa", "HAHAHAHAHA", "HHHHHHHHH"]), new Discussion(new User(1, "yayba", "24", "1000m", [ '/assets/lkherr.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), ["sahbi hanyaaa", "hanyaaa", "HAHAHAHAHA", "HHHHHHHHH"]), new Discussion(new User(1, "yayba", "24", "1000m", [ '/assets/lkherr.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), ["sahbi hanyaaa", "hanyaaa", "HAHAHAHAHA", "HHHHHHHHH"]), new Discussion(new User(1, "yayba", "24", "1000m", [ '/assets/lkherr.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), ["sahbi hanyaaa", "hanyaaa", "HAHAHAHAHA", "HHHHHHHHH"])];
  constructor() { }
  ngOnInit(): void {
    
  }

  getDiscussions()
  {
    return this.discussions;
  }
}
