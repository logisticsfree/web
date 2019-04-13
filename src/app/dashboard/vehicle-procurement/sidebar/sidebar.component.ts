import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vehicle-procurement-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  // url: string;
  constructor(
    public router: Router
  ) { }

  ngOnInit() {
    // this.url = this.router.url;
  }

}
