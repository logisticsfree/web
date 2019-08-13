import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(private route: Router) { }

  ngOnInit() {
  }

  isUserManagement() {
    return this.route.url === '/settings/(settings:add-user)' ||
      this.route.url === '/settings/(settings:user-management)';
  }

}
