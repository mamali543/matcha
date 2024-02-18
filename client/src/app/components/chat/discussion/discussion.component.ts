import { Component, Input, OnInit } from '@angular/core';
import { Discussion } from 'src/app/domain/discussion.model';

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css']
})
export class DiscussionComponent implements OnInit{

  @Input() discussion?: Discussion;
  ngOnInit(): void {
    console.log("wesh wesh");
  }

}
