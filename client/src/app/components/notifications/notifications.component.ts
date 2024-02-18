import { Component, OnInit } from '@angular/core';
import { Notification } from 'src/app/domain/notifictaion.model';

@Component({
  selector: 'App-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{
  
  notifications: Notification[] = [
    new Notification("reda", "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.vecteezy.com%2Fart-vectoriel%2F2002403-homme-avec-barbe-avatar-personnage-icone-isole&psig=AOvVaw1WjD6E5lO26MXGC9Y-wdBo&ust=1707865738223000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiE1uf1poQDFQAAAAAdAAAAABAJ", "wesh wesh a bayii", "13:37"),
    new Notification("reda", "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.vecteezy.com%2Fart-vectoriel%2F2002403-homme-avec-barbe-avatar-personnage-icone-isole&psig=AOvVaw1WjD6E5lO26MXGC9Y-wdBo&ust=1707865738223000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiE1uf1poQDFQAAAAAdAAAAABAJ", "wesh wesh a bayii", "13:37"),
    new Notification("reda", "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.vecteezy.com%2Fart-vectoriel%2F2002403-homme-avec-barbe-avatar-personnage-icone-isole&psig=AOvVaw1WjD6E5lO26MXGC9Y-wdBo&ust=1707865738223000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiE1uf1poQDFQAAAAAdAAAAABAJ", "wesh wesh a bayii", "13:37"),
    new Notification("reda", "https://www.google.com/url?sa=i&url=https%3A%2F%2Ffr.vecteezy.com%2Fart-vectoriel%2F2002403-homme-avec-barbe-avatar-personnage-icone-isole&psig=AOvVaw1WjD6E5lO26MXGC9Y-wdBo&ust=1707865738223000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCPiE1uf1poQDFQAAAAAdAAAAABAJ", "wesh wesh a bayii", "13:37"),
  ];
  
  ngOnInit(): void {

  }
  
}
