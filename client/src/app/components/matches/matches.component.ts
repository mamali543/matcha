import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit{

  users?: User[];
  constructor(private usersService: UsersService){

  }
  ngOnInit(): void {
      this.users = this.usersService.getUsers();
  }
}
