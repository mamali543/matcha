import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  private links: {icon: string, aicon: string, dest: string}[] =
  [
    {
      icon: "/assets/inactiveicons/Home.svg",
      aicon: "/assets/activeicons/Homei.svg",
      dest: "Home"
    },
    {
      icon: "/assets/inactiveicons/Matches.svg",
      aicon: "/assets/activeicons/Matchesi.svg",
      dest: "Matches"
    },    
    {
      icon: "/assets/inactiveicons/Chat.svg",
      aicon: "/assets/activeicons/Chati.svg",
      dest: "Chat"
    },
        {
      icon: "/assets/inactiveicons/Profile.svg",
      aicon: "/assets/activeicons/Profilei.svg",
      dest: "Profile"
    },
    {
      icon: "/assets/inactiveicons/Notification.svg",
      aicon: "/assets/activeicons/Notificationi.svg",
      dest: "Notifications"
    }
  ]

  constructor() { }

  getLinks()
  {
    return this.links;
  }

}
