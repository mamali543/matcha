import { Component } from '@angular/core';
import { User } from 'src/app/domain/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  users: User[] = [new User(1, "Elias", "70m", [ '/assets/lkher.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ])];

}

// array d lusers kola user eendo: id name location 
