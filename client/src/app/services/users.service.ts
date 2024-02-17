import { Injectable } from '@angular/core';
import { User } from '../domain/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private users: User[] = [new User(1, "elias", "70m", "25", [ '/assets/lkher.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]),
                  new User(2, "maradona", "150m", "25", [ '/assets/image1.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]),
                  new User(3, "kiki", "42m", "25", [ '/assets/saad.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), new User(2, "maradona", "150m", "25", [ '/assets/image1.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]),
                  new User(3, "kiki", "42m", "25", [ '/assets/saad.jpeg', '/assets/image1.jpeg', '/assets/saad.jpeg' ]), ];

  constructor() { }

  getUsers()
  {
    return this.users;
  }
}
