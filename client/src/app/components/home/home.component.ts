import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user.model';
import { interval, Subscription } from 'rxjs';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users!: User[];

  currentImageIndex: number = 0;
  imageChangeSubscription!: Subscription;

  constructor(private usersServiec: UsersService){
  }

  ngOnInit(): void {
    this.users = this.usersServiec.getUsers();
    const imageChangeInterval = interval(6000);
    this.imageChangeSubscription = imageChangeInterval.subscribe(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.users[0].images.length;
    })
  }

}

// array d lusers kola user eendo: id name location 
