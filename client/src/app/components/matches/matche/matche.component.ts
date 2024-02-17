import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user.model';

@Component({
  selector: 'app-matche',
  templateUrl: './matche.component.html',
  styleUrls: ['./matche.component.css']
})
export class MatcheComponent implements OnInit{
  
  @Input() user!: User;

  ngOnInit(): void {

  }

}
