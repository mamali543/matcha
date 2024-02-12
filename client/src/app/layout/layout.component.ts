import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../services/sidebar.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css'],
  providers: [SidebarService]
})
export class LayoutComponent implements OnInit {

  links!: {icon: string, aicon:string,  dest: string}[] ;
  segument: string = "Home";
  constructor(private sidebarService: SidebarService, private router: Router){

  }

  ngOnInit(): void {
    this.links = this.sidebarService.getLinks();
    // Subscribe to URL changes
    this.router.events.subscribe((event) => {
      // Check for the primary route
      let url = this.router.url;
      // this.segument = url.split('/')[1];  Splits the URL by '/' and takes the first segment after the initial '/'
      // console.log(this.segument);
    });
  }

}
