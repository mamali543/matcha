import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/domain/user.model';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  users: User[] = [new User(1, "Elias", "70m", [ '/assets/lkher.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ])];

  currentImageIndex: number = 0;
  imageChangeSubscription!: Subscription;

  ngOnInit(): void {
    const imageChangeInterval = interval(6000);
    this.imageChangeSubscription = imageChangeInterval.subscribe(() => {
        this.currentImageIndex = (this.currentImageIndex + 1) % this.users[0].images.length;
    })
  }

}

// array d lusers kola user eendo: id name location 
